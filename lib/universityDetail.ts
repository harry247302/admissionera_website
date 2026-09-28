import {
  fetchDiscoveryUniversities,
  extractState,
  resolveMediaUrl,
  type DiscoveryUniversity,
} from "@/lib/universities";
import { fetchCourseById, type CourseFaq } from "@/lib/courseDiscovery";

const ACADEMIC_API_URL = "https://backend.admissionera.com/api/academic";

export type RichBlock =
  | { type: "heading"; text: string }
  | { type: "p"; text: string }
  | { type: "li"; text: string };

export type RichSection = {
  title: string;
  blocks: RichBlock[];
};

export type UniversityApproval = {
  id: string;
  name: string;
  logo: string;
  description: string;
};

export type UniversityCourseFee = {
  amount: number;
  currency: string;
  periodLabel: string;
  totalPeriods: number;
  structureType: string;
};

export type UniversityCourse = {
  uuid: string;
  name: string;
  code: string;
  level: string;
  levelGroup: "UG" | "PG" | "Diploma" | "Certificate" | "Other";
  mode: string;
  duration: string;
  eligibility: string;
  language: string;
  totalFee: number | null;
  currency: string;
  feeNote: string;
};

export type UniversityDetail = {
  uuid: string;
  name: string;
  shortName: string;
  type: string;
  location: string;
  state: string;
  website: string;
  logo: string;
  banner: string;
  ratings: number | null;
  worldRank: number | null;
  grade: string;
  established: string;
  about: RichSection;
  features: RichSection;
  admission: RichSection;
  career: RichSection;
  recruiters: string[];
  approvals: UniversityApproval[];
  faqs: CourseFaq[];
  courses: UniversityCourse[];
  similar: DiscoveryUniversity[];
};

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&ldquo;": "“",
  "&rdquo;": "”",
  "&ndash;": "–",
  "&mdash;": "—",
};

function decodeEntities(text: string) {
  return text
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity.toLowerCase()] ?? entity)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripTags(html: string) {
  return decodeEntities(html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function isMeaningful(text: string) {
  return text.replace(/[.\s\-–—]/g, "").length > 0;
}

/** Converts Quill-style HTML into ordered heading / paragraph / list-item blocks. */
export function parseRichHtml(input: unknown): RichSection {
  const html = (Array.isArray(input) ? input.join("") : String(input || "")).trim();
  const blocks: RichBlock[] = [];

  if (html && !/<[a-z][\s\S]*>/i.test(html)) {
    html
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(isMeaningful)
      .forEach((text) => blocks.push({ type: "p", text }));
  } else {
    const tagPattern = /<(h[1-6]|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
    let match: RegExpExecArray | null;
    while ((match = tagPattern.exec(html))) {
      const tag = match[1].toLowerCase();
      const inner = match[2];
      const text = stripTags(inner);
      if (!isMeaningful(text)) continue;

      if (tag.startsWith("h")) {
        blocks.push({ type: "heading", text });
      } else if (tag === "li") {
        blocks.push({ type: "li", text });
      } else {
        const onlyStrong = /^\s*<strong\b[^>]*>[\s\S]*<\/strong>\s*$/i.test(inner);
        const large = /ql-size-(large|huge)/i.test(inner);
        blocks.push(onlyStrong && (large || text.length < 90) ? { type: "heading", text } : { type: "p", text });
      }
    }
  }

  let title = "";
  if (blocks[0]?.type === "heading") {
    title = blocks[0].text;
    blocks.shift();
  }
  return { title, blocks };
}

function sectionText(section: RichSection) {
  return section.blocks
    .filter((block) => block.type !== "heading")
    .map((block) => block.text)
    .join(" ");
}

function extractRecruiters(section: RichSection) {
  const recruiters: string[] = [];
  let collecting = false;
  for (const block of section.blocks) {
    if (block.type === "heading") {
      collecting = /hiring|recruit|partner|compan/i.test(block.text);
      continue;
    }
    if (collecting && block.type === "li" && block.text.length < 60) {
      recruiters.push(block.text);
    }
  }
  return recruiters;
}

function extractEstablished(text: string) {
  const match =
    text.match(/(?:established|founded|since)\D{0,12}((?:18|19|20)\d{2})/i)
    || text.match(/\b((?:18|19|20)\d{2})\b/);
  return match?.[1] || "";
}

function levelGroup(level = ""): UniversityCourse["levelGroup"] {
  const key = level.toUpperCase();
  if (/POST|PG|MASTER/.test(key)) return "PG";
  if (/UNDER|UG|BACHELOR|GRADUAT/.test(key)) return "UG";
  if (/DIPLOMA/.test(key)) return "Diploma";
  if (/CERT/.test(key)) return "Certificate";
  return "Other";
}

function levelLabel(level = "") {
  const group = levelGroup(level);
  if (group === "UG") return "Undergraduate";
  if (group === "PG") return "Postgraduate";
  if (group === "Other") return level ? level.charAt(0) + level.slice(1).toLowerCase() : "—";
  return group;
}

function titleCase(text = "") {
  return text
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

type ApiFee = {
  amount?: number | string;
  currency?: string;
  period_label?: string;
  period_number?: number;
  total_periods?: number;
  fee_structure_type?: string;
};

type ApiUniversityCourse = {
  uuid?: string;
  name?: string;
  fees?: ApiFee[];
};

function summariseFees(fees: ApiFee[] = []) {
  if (!fees.length) return { total: null as number | null, currency: "INR", note: "" };
  const first = fees[0];
  const currency = first.currency || "INR";
  const amounts = fees.map((fee) => Number(fee.amount) || 0);
  const oneTime = fees.some((fee) => /one/i.test(fee.fee_structure_type || ""));
  const perPeriod = amounts[0];
  const periods = Number(first.total_periods) || 1;
  const total = oneTime
    ? amounts.reduce((sum, amount) => sum + amount, 0)
    : fees.length > 1
      ? amounts.reduce((sum, amount) => sum + amount, 0)
      : perPeriod * periods;
  const note = oneTime
    ? first.period_label || "One-time payment"
    : `${first.period_label || "Per period"} × ${periods}`;
  return { total: total || null, currency, note };
}

function tableSnapshot(
  tables: { rows?: { label?: string; content?: Record<string, string> }[] }[] = [],
  matcher: RegExp
) {
  for (const table of tables) {
    for (const row of table.rows || []) {
      const label = `${row.label || ""} ${row.content?.["Key Features"] || row.content?.key || ""}`;
      if (!matcher.test(label)) continue;
      const content = row.content || {};
      const value =
        content.Details || content.Values || content.Value
        || Object.values(content).filter(Boolean).pop();
      if (value) return String(value);
    }
  }
  return "";
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchUniversityDetail(uuid: string): Promise<UniversityDetail> {
  const id = encodeURIComponent(uuid);
  const [detailPayload, approvalsPayload, faqsPayload, allUniversities] = await Promise.all([
    fetchJson<{ data?: Record<string, unknown>; university?: Record<string, unknown> }>(
      `${ACADEMIC_API_URL}/universities/${id}`
    ),
    fetchJson<{ data?: Record<string, unknown>[] }>(`${ACADEMIC_API_URL}/university-approvals/${id}`),
    fetchJson<{ data?: Record<string, unknown>[] }>(`${ACADEMIC_API_URL}/university-faqs/${id}`),
    fetchDiscoveryUniversities().catch(() => [] as DiscoveryUniversity[]),
  ]);

  const row = (detailPayload?.data || detailPayload?.university) as Record<string, any> | undefined;
  if (!row || row.is_deleted === true) {
    throw new Error("University not found");
  }

  const about = parseRichHtml(row.description);
  const features = parseRichHtml(row.features);
  const admission = parseRichHtml(row.admission_process);
  const career = parseRichHtml(row.career);
  const listEntry = allUniversities.find((uni) => uni.uuid === row.uuid);

  const apiCourses = (Array.isArray(row.courses) ? row.courses : []) as ApiUniversityCourse[];
  const courseDetails = await Promise.allSettled(
    apiCourses.map((course) => (course.uuid ? fetchCourseById(course.uuid) : Promise.reject()))
  );

  const courses: UniversityCourse[] = apiCourses
    .filter((course) => course.uuid)
    .map((course, index) => {
      const settled = courseDetails[index];
      const detail = settled?.status === "fulfilled" ? settled.value : null;
      const fees = summariseFees(course.fees);
      const level = detail?.level || "";
      return {
        uuid: String(course.uuid),
        name: course.name || detail?.name || "Course",
        code: detail?.code || "",
        level: levelLabel(level),
        levelGroup: levelGroup(level),
        mode: titleCase(detail?.studyMode || detail?.attendanceMode || "") || "—",
        duration: tableSnapshot(detail?.tables, /duration/i) || "—",
        eligibility:
          tableSnapshot(detail?.tables, /eligib/i) || detail?.eligibility || "—",
        language: detail?.language || "",
        totalFee: fees.total,
        currency: fees.currency,
        feeNote: fees.note,
      };
    });

  const approvals: UniversityApproval[] = (approvalsPayload?.data || [])
    .filter((item) => item && item.is_active !== false)
    .sort((a, b) => Number(a.display_order || 0) - Number(b.display_order || 0))
    .map((item) => ({
      id: String(item.id),
      name: String(item.approval_name || ""),
      logo: resolveMediaUrl(item.approval_logo as string),
      description: String(item.approval_description || ""),
    }))
    .filter((item) => item.name);

  const faqs: CourseFaq[] = (faqsPayload?.data || [])
    .filter((item) => item && item.is_active !== false)
    .sort((a, b) => Number(a.display || 0) - Number(b.display || 0))
    .map((item) => ({
      id: String(item.id),
      question: String(item.question || "").replace(/^Q\.?\s*/i, ""),
      answer: String(item.answer || ""),
      is_active: true,
    }));

  const location = String(row.location || listEntry?.location || "");
  const ratingNum = Number(row.ratings);

  return {
    uuid: String(row.uuid),
    name: String(row.name || "University"),
    shortName: String(row.short_name || row.code || ""),
    type: String(listEntry?.type || row.type || ""),
    location,
    state: extractState(location),
    website: String(row.website || ""),
    logo: resolveMediaUrl(row.logo),
    banner: resolveMediaUrl(row.banner),
    ratings: Number.isFinite(ratingNum) && row.ratings != null ? ratingNum : null,
    worldRank: row.world_rank ?? null,
    grade: String(row.grade || ""),
    established: extractEstablished(sectionText(about)),
    about,
    features,
    admission,
    career,
    recruiters: extractRecruiters(career),
    approvals,
    faqs,
    courses,
    similar: allUniversities.filter((uni) => uni.uuid !== row.uuid).slice(0, 4),
  };
}

import {
  fetchDiscoveryUniversities,
  extractState,
  resolveMediaUrl,
  type DiscoveryUniversity,
} from "@/lib/universities";
import { type CourseContentParagraph, type CourseContentTable, type CourseFaq, type CourseSpecialization } from "@/lib/courseDiscovery";

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
  slug: string;
  level: string;
  levelGroup: "UG" | "PG" | "Diploma" | "Certificate" | "Other";
  mode: string;
  duration: string;
  eligibility: string;
  language: string;
  totalFee: number | null;
  currency: string;
  feeNote: string;
  paragraphs: CourseContentParagraph[];
  specializations: CourseSpecialization[];
};

export type UniversityCompany = {
  uuid: string;
  name: string;
  logo: string;
  website: string;
};

export type UniversityDetail = {
  uuid: string;
  name: string;
  shortName: string;
  code: string;
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
  description: string;
  about: RichSection;
  features: RichSection;
  admission: RichSection;
  career: RichSection;
  companies: UniversityCompany[];
  recruiters: string[];
  approvals: UniversityApproval[];
  faqs: CourseFaq[];
  courses: UniversityCourse[];
  paragraphs: CourseContentParagraph[];
  tables: CourseContentTable[];
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

function hostnameFromUrl(value = "") {
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    if (/logo\.dev$/i.test(url.hostname)) {
      return url.pathname.replace(/^\//, "").split("/")[0] || "";
    }
    return url.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function resolveCompanyLogo(logo = "", website = "") {
  const hasUsableLogo = Boolean(logo) && !/YOUR_LOGO_DEV_TOKEN|token=$/i.test(logo);
  if (hasUsableLogo) return resolveMediaUrl(logo);
  const host = hostnameFromUrl(website) || hostnameFromUrl(logo);
  if (!host) return "";
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128`;
}

function prettyApprovalName(name = "") {
  const withoutExt = name.replace(/\.(jpe?g|png|webp|svg|gif)$/i, "");
  const cleaned = withoutExt.replace(/logo/gi, " ").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  const plus = cleaned
    .replace(/\ba plus plus\b/i, "A++")
    .replace(/\ba plus\b/i, "A+")
    .replace(/\ba\+\+\b/i, "A++");
  const acronyms: Record<string, string> = {
    aiu: "AIU",
    aicte: "AICTE",
    ugc: "UGC",
    nirf: "NIRF",
    deb: "DEB",
    naac: "NAAC",
  };
  return plus
    .split(" ")
    .filter(Boolean)
    .map((word) => acronyms[word.toLowerCase()] || word)
    .join(" ");
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

function inferCourseLevel(name = "", code = "", level = ""): UniversityCourse["levelGroup"] {
  const fromApi = levelGroup(level);
  if (fromApi !== "Other") return fromApi;
  const hay = `${name} ${code}`.toUpperCase();
  if (/\b(MBA|MCA|M\.?COM|M\.?SC|M\.?A\.?|PGDM|MTECH|MASTER|POST\s*GRAD)/.test(hay)) return "PG";
  if (/\b(BBA|BCA|B\.?COM|B\.?SC|B\.?A\.?|BTECH|BACHELOR|UNDER\s*GRAD)/.test(hay)) return "UG";
  if (/DIPLOMA/.test(hay)) return "Diploma";
  if (/CERT/.test(hay)) return "Certificate";
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

  // Single API call returns everything: approvals (string[]), courses, faqs, companies, paragraphs, tables
  const [detailPayload, allUniversities] = await Promise.all([
    fetchJson<{ data?: Record<string, unknown> }>(
      `${ACADEMIC_API_URL}/universities/${id}`
    ),
    fetchDiscoveryUniversities().catch(() => [] as DiscoveryUniversity[]),
  ]);

  const row = detailPayload?.data as Record<string, any> | undefined;
  if (!row || row.is_deleted === true) {
    throw new Error("University not found");
  }

  const about = parseRichHtml(row.description);
  const features = parseRichHtml(row.features);
  const admission = parseRichHtml(row.admission_process);
  const career = parseRichHtml(row.career);
  const listEntry = allUniversities.find((uni) => uni.uuid === row.uuid);

  // approvals is string[] in the new API (e.g. ["UGC", "AICTE", "NAAC A++"])
  const rawApprovals = Array.isArray(row.approvals) ? (row.approvals as unknown[]) : [];
  const approvals: UniversityApproval[] = rawApprovals
    .map((item, idx) => {
      if (typeof item === "string") {
        return { id: String(idx), name: prettyApprovalName(item), logo: "", description: "" };
      }
      const obj = item as Record<string, unknown>;
      return {
        id: String(obj.id ?? idx),
        name: prettyApprovalName(String(obj.approval_name ?? obj.name ?? "")),
        logo: resolveMediaUrl(obj.approval_logo as string ?? ""),
        description: String(obj.approval_description ?? obj.description ?? ""),
      };
    })
    .filter((item) => item.name);

  // faqs embedded in the unified response
  const rawFaqs = Array.isArray(row.faqs) ? (row.faqs as Record<string, unknown>[]) : [];
  const faqs: CourseFaq[] = rawFaqs
    .filter((item) => item && item.is_active !== false)
    .sort((a, b) => Number(a.display ?? 0) - Number(b.display ?? 0))
    .map((item) => ({
      id: String(item.id ?? ""),
      question: String(item.question ?? "").replace(/^Q\.?\s*/i, ""),
      answer: String(item.answer ?? ""),
      is_active: true,
    }));

  const rawCompanies = Array.isArray(row.companies) ? (row.companies as Record<string, unknown>[]) : [];
  const companies: UniversityCompany[] = rawCompanies
    .map((company) => {
      const website = String(company.website ?? "");
      const logo = String(company.logo ?? "");
      return {
        uuid: String(company.uuid ?? company.id ?? ""),
        name: String(company.name ?? ""),
        logo: resolveCompanyLogo(logo, website),
        website,
      };
    })
    .filter((company) => company.name);
  const recruiters = companies.length ? companies.map((company) => company.name) : extractRecruiters(career);

  // courses embedded: {uuid, name, code, fees[]}
  const rawCourses = Array.isArray(row.courses) ? (row.courses as Record<string, unknown>[]) : [];
  const courses: UniversityCourse[] = rawCourses.map((c) => {
    const fees = Array.isArray(c.fees) ? (c.fees as ApiFee[]) : [];
    const { total, currency, note } = summariseFees(fees);
    const name = String(c.name ?? "");
    const code = String(c.code ?? "");
    const level = String(c.level ?? c.degree ?? "");
    const group = inferCourseLevel(name, code, level);
    return {
      uuid: String(c.uuid ?? ""),
      name,
      code,
      slug: String(c.slug ?? c.uuid ?? ""),
      level: levelLabel(level) === "—" ? (group === "Other" ? "" : group === "UG" ? "Undergraduate" : group === "PG" ? "Postgraduate" : group) : levelLabel(level),
      levelGroup: group,
      mode: "Online",
      duration: "",
      eligibility: "",
      language: "English",
      totalFee: total,
      currency,
      feeNote: note,
      paragraphs: [],
      specializations: [],
    };
  }).filter((course) => course.uuid || course.name);

  const rawParas = [
    ...(Array.isArray(row.specialization_content_paragraphs) ? row.specialization_content_paragraphs : []),
    ...(Array.isArray(row.paragraphs) ? row.paragraphs : []),
  ] as Record<string, unknown>[];
  const seenParagraphs = new Set<string>();
  const paragraphs = rawParas
    .map((p) => ({
      id: String(p.id ?? ""),
      title: String(p.title ?? "").trim(),
      content: String(p.content ?? ""),
      sort_order: Number(p.sort_order ?? 0),
    }))
    .filter((p) => {
      if (!p.title && !stripTags(p.content)) return false;
      const key = p.id || `${p.title}:${p.sort_order}`;
      if (seenParagraphs.has(key)) return false;
      seenParagraphs.add(key);
      return true;
    })
    .sort((a, b) => a.sort_order - b.sort_order);

  const rawTables = (
    Array.isArray(row.specialization_content_tables)
      ? row.specialization_content_tables
      : Array.isArray(row.tables)
        ? row.tables
        : []
  ) as Record<string, unknown>[];
  const tables: CourseContentTable[] = rawTables.map((table, tableIndex) => ({
    id: String(table.id ?? tableIndex),
    title: String(table.title ?? ""),
    sort_order: Number(table.sort_order ?? tableIndex),
    rows: (Array.isArray(table.rows) ? table.rows : []).map((rowItem: Record<string, unknown>, index: number) => {
      const contentRaw = rowItem.content;
      const content =
        typeof contentRaw === "string"
          ? (() => {
              try {
                return JSON.parse(contentRaw) as Record<string, string>;
              } catch {
                return { Details: contentRaw };
              }
            })()
          : ((contentRaw || {}) as Record<string, string>);
      return {
        id: String(rowItem.id ?? `${table.id ?? tableIndex}-${index}`),
        label: String(rowItem.label ?? content.Programme ?? content.Course ?? content.Name ?? ""),
        content,
        sort_order: Number(rowItem.sort_order ?? index),
      };
    }),
  })).sort((a, b) => a.sort_order - b.sort_order);

  const location = String(row.location ?? listEntry?.location ?? "");
  const ratingNum = Number(row.ratings);

  return {
    uuid: String(row.uuid),
    name: String(row.name ?? "University"),
    shortName: String(row.short_name ?? row.code ?? ""),
    code: String(row.code ?? row.short_name ?? ""),
    type: String(listEntry?.type ?? row.type ?? ""),
    location,
    state: extractState(location),
    website: String(row.website ?? ""),
    logo: resolveMediaUrl(row.logo),
    banner: resolveMediaUrl(row.banner),
    ratings: Number.isFinite(ratingNum) && row.ratings != null ? ratingNum : null,
    worldRank: row.world_rank != null ? Number(row.world_rank) : null,
    grade: String(row.grade ?? ""),
    established: extractEstablished(sectionText(about)),
    description: String(row.description ?? ""),
    about,
    features,
    admission,
    career,
    companies,
    recruiters,
    approvals,
    faqs,
    courses,
    paragraphs,
    tables,
    similar: allUniversities.filter((uni) => uni.uuid !== row.uuid).slice(0, 4),
  };
}

function mergeCourseParagraphs(courses: UniversityCourse[]) {
  const seen = new Set<string>();
  const paragraphs: CourseContentParagraph[] = [];
  for (const course of courses) {
    for (const paragraph of course.paragraphs || []) {
      const title = String(paragraph.title || "").trim();
      const content = String(paragraph.content || "").trim();
      if (!title && !content) continue;
      const key = paragraph.id || `${title}:${paragraph.sort_order}`;
      if (seen.has(key)) continue;
      seen.add(key);
      paragraphs.push({
        id: String(paragraph.id || key),
        title,
        content,
        sort_order: Number(paragraph.sort_order) || 0,
      });
    }
  }
  return paragraphs.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type SVGProps,
} from "react";
import type { FilteredCourseRow } from "@/lib/courseFilters";
import { resolveMediaUrl } from "@/lib/universities";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const B = {
  purple: "#59159A",
  pink: "#E91E75",
  lightPink: "#FCE8F2",
  lavender: "#F5EEFC",
  text: "#21152D",
  muted: "#6B6578",
  border: "#E8DCFC",
  white: "#FFFFFF",
  grad: "linear-gradient(90deg,#59159A 0%,#9B1FBB 48%,#E91E75 100%)",
  gradImg: "linear-gradient(0deg,rgba(74,16,89,0.92) 0%,rgba(89,21,154,0.45) 55%,transparent 100%)",
};

// ─── Persistence helpers (wishlist) ───────────────────────────────────────────
const SAVED_KEY = "admissionera:saved-courses";
const SAVED_EVENT = "admissionera:saved-courses-change";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function subscribeSaved(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(SAVED_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(SAVED_EVENT, cb);
  };
}

// ─── Formatters ───────────────────────────────────────────────────────────────
function prettyLevel(value?: string | null) {
  if (!value) return "";
  const map: Record<string, string> = {
    UNDERGRADUATE: "UG",
    POSTGRADUATE: "PG",
    DIPLOMA: "Diploma",
    CERTIFICATE: "Certificate",
    DOCTORATE: "PhD",
    AFTER_10TH: "10th+",
    AFTER_12TH: "12th+",
  };
  return map[value.toUpperCase()] || value;
}

function prettyMode(value?: string | null) {
  if (!value) return "";
  const map: Record<string, string> = {
    ONLINE: "Online",
    OFFLINE: "Offline",
    HYBRID: "Hybrid",
    DISTANCE: "Distance",
  };
  return map[value.toUpperCase()] || value;
}

function formatFee(amount?: string | number | null, currency?: string | null) {
  const num = Number(amount);
  if (!amount || !Number.isFinite(num) || num === 0) return null;
  const cur = (currency || "INR").toUpperCase();
  const formatted = new Intl.NumberFormat("en-IN").format(num);
  return `₹${formatted} ${cur}`;
}

function formatDuration(duration?: string | number | null, unit?: string | null) {
  if (!duration) return null;
  const val = String(duration).trim();
  if (!val || val === "0") return null;
  const u = unit ? ` ${unit}` : "";
  return `${val}${u}`;
}

// ─── Admission status helpers ─────────────────────────────────────────────────
type AdmissionBadge = { label: string; color: string; bg: string; border: string };

function getAdmissionBadge(status?: string | null): AdmissionBadge | null {
  if (!status) return null;
  const s = status.toLowerCase();
  if (s.includes("open")) return { label: "Admission Open", color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" };
  if (s.includes("clos") && s.includes("soon"))
    return { label: "Closing Soon", color: "#C2410C", bg: "#FFF7ED", border: "#FED7AA" };
  if (s.includes("clos") || s.includes("closed"))
    return { label: "Admission Closed", color: "#BE185D", bg: "#FDF2F8", border: "#FBCFE8" };
  return { label: status, color: B.purple, bg: B.lavender, border: B.border };
}

// ─── Tiny SVG icons (inline, no lucide dep) ───────────────────────────────────
function Svg({ d, ...p }: { d: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d={d} />
    </svg>
  );
}

function IconBookmark({ filled, ...p }: { filled?: boolean } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor"
      strokeWidth="1.8" {...p}>
      <path d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-3-7 3V5Z" />
    </svg>
  );
}

function IconGrid(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconList(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
    </svg>
  );
}

// ─── Wishlist / bookmark button ───────────────────────────────────────────────
function BookmarkBtn({ id }: { id: string }) {
  const saved = useSyncExternalStore(
    subscribeSaved,
    () => readSaved().includes(id),
    () => false,
  );
  const [toast, setToast] = useState("");

  function toggle() {
    try {
      const list = readSaved();
      const next = saved ? list.filter((x) => x !== id) : [...new Set([...list, id])];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(SAVED_EVENT));
      setToast(saved ? "Removed" : "Saved!");
      window.setTimeout(() => setToast(""), 1800);
    } catch {
      /* noop */
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={saved}
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition"
        style={{
          borderColor: saved ? B.purple : B.border,
          color: saved ? B.purple : B.muted,
          background: B.white,
        }}
      >
        <IconBookmark className="h-4 w-4" filled={saved} />
      </button>
      {toast && (
        <span
          className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold text-white"
          style={{ background: B.purple }}
        >
          {toast}
        </span>
      )}
    </div>
  );
}

// ─── Highlight tile ───────────────────────────────────────────────────────────
function HighlightTile({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div
      className="flex flex-1 min-w-0 items-center gap-2 rounded-xl px-3 py-2.5"
      style={{ background: B.lavender, border: `1px solid ${B.border}` }}
    >
      <span
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ background: `${B.purple}18`, color: B.purple }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-extrabold leading-tight" style={{ color: B.text }}>
          {value}
        </p>
        <p className="truncate text-[11px] leading-tight" style={{ color: B.muted }}>
          {label}
        </p>
      </div>
    </div>
  );
}

// ─── Info strip item ──────────────────────────────────────────────────────────
function InfoItem({
  icon,
  label,
  value,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-0.5 px-3 first:pl-0 last:pr-0">
      <div className="flex items-center gap-1.5" style={{ color: B.muted }}>
        <span className="inline-flex h-3.5 w-3.5 shrink-0">{icon}</span>
        <span className="text-[11px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <span
        className="text-[13px] font-bold"
        style={{ color: accent ? B.pink : B.text }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────
function UniversityCard({ row }: { row: FilteredCourseRow }) {
  const uniHref = row.university_uuid ? `/universities/${row.university_uuid}` : "/universities";
  const courseHref = row.course_uuid ? `/courses/${row.course_uuid}` : uniHref;
  const id = row.course_uuid || row.fee_uuid || "course";

  // Images — prefer banner for bg photo, logo as fallback
  const bannerSrc = resolveMediaUrl(row.university_banner || row.university_logo) || "/hero/slide-2.png";
  const logoSrc = resolveMediaUrl(row.university_logo);

  // Labels
  const levelBadge = prettyLevel(row.level);
  const modeBadge = prettyMode(row.study_mode);
  const feeLabel = formatFee(row.fee_amount, row.fee_currency);
  const durationLabel = formatDuration(row.duration, row.duration_unit) || "—";
  const worldRank = row.university_world_rank != null ? String(row.university_world_rank) : "—";
  const grade = row.university_grade || "—";
  const uniType = row.university_type || "University";
  const location = row.university_location
    ? row.university_location.split(",").slice(-2).join(",").trim()
    : null;
  const approvals = row.university_approvals?.filter(Boolean) || [];
  const approvalLabel = approvals.length > 0 ? approvals.join(", ") : "—";
  const intake = row.session_name || null;
  const admissionBadge = getAdmissionBadge(row.admission_status);
  const brochureHref = resolveMediaUrl(row.university_brochure) || null;
  const shortCode = row.course_code || levelBadge || null;

  return (
    <article
      className="group overflow-hidden rounded-[22px] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(89,21,154,0.14)]"
      style={{ border: `1.5px solid ${B.border}`, boxShadow: `0 6px 20px rgba(89,21,154,0.07)` }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* ═══ LEFT — Image panel ═══ */}
        <div className="relative shrink-0 overflow-hidden rounded-t-[22px] sm:w-[240px] sm:rounded-l-[22px] sm:rounded-tr-none lg:w-[260px]">
          <div className="relative h-[200px] w-full sm:h-full sm:min-h-[240px]">
            <Image
              src={bannerSrc}
              alt={row.university_name || "University"}
              fill
              sizes="(max-width:640px) 100vw, 260px"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              unoptimized={bannerSrc.startsWith("http")}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: B.gradImg }}
              aria-hidden
            />

            {/* Public/Private badge */}
            <span
              className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
              style={{ background: "rgba(89,21,154,0.75)", backdropFilter: "blur(6px)" }}
            >
              {uniType}
            </span>

            {/* Admission Era logo */}
            <div
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold text-white"
              style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)" }}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-white" aria-hidden>
                <path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm0 3 1.5 4.5H14l-2.5 1.8.9 2.7L10 12.1l-2.4 1.9.9-2.7L6 9.5h2.5L10 5Z" />
              </svg>
              <span>ERA</span>
            </div>

            {/* University name + location at bottom */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              {logoSrc && (
                <div className="mb-2 h-9 w-9 overflow-hidden rounded-lg border-2 border-white/40 bg-white/10">
                  <Image
                    src={logoSrc}
                    alt=""
                    width={36}
                    height={36}
                    className="h-full w-full object-contain"
                    unoptimized={logoSrc.startsWith("http")}
                  />
                </div>
              )}
              <p className="text-[15px] font-extrabold leading-snug text-white drop-shadow">
                {row.university_name || "University"}
              </p>
              {location && (
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/80">
                  <Svg d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" className="h-3 w-3" />
                  {location}
                </p>
              )}
            </div>

            {/* Graduation cap circle */}
            <div
              className="absolute -bottom-5 right-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white shadow-lg"
              style={{ background: B.grad }}
            >
              <Svg d="m12 3 10 5-10 5L2 8l10-5Z M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* ═══ RIGHT — Info panel ═══ */}
        <div className="flex min-w-0 flex-1 flex-col p-4 pt-6 sm:p-5">

          {/* Admission banner */}
          {admissionBadge && (
            <div
              className="mb-3 flex items-center justify-between gap-2 rounded-xl px-3 py-2"
              style={{ background: B.lightPink, border: `1px solid ${B.border}` }}
            >
              <div className="flex items-center gap-2">
                <Svg
                  d="M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                  className="h-4 w-4 shrink-0"
                  style={{ color: B.pink }}
                />
                <span className="text-[12px] font-semibold" style={{ color: B.pink }}>
                  Admission{intake ? ` Closing for ${intake} Intake` : " Status"}
                </span>
              </div>
              <span
                className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                style={{
                  background: admissionBadge.bg,
                  color: admissionBadge.color,
                  border: `1px solid ${admissionBadge.border}`,
                }}
              >
                {admissionBadge.label}
              </span>
            </div>
          )}

          {/* University name + badges */}
          <div className="flex flex-wrap items-start gap-2">
            <Link href={courseHref} className="min-w-0 flex-1">
              <h2
                className="text-[17px] font-extrabold leading-snug transition group-hover:underline"
                style={{ color: B.text }}
              >
                {row.course_name || row.university_name || "Course"}
              </h2>
            </Link>
            <div className="flex shrink-0 flex-wrap items-center gap-1.5">
              {shortCode && (
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-bold text-white"
                  style={{ background: B.grad }}
                >
                  {shortCode}
                </span>
              )}
              {levelBadge && (
                <span
                  className="rounded-full border px-2.5 py-0.5 text-[11px] font-bold"
                  style={{ color: B.purple, borderColor: B.border, background: B.lavender }}
                >
                  {levelBadge}
                </span>
              )}
              {modeBadge && (
                <span
                  className="rounded-full border px-2.5 py-0.5 text-[11px] font-semibold"
                  style={{ color: B.muted, borderColor: B.border }}
                >
                  {modeBadge}
                </span>
              )}
            </div>
          </div>

          {/* ── Highlight tiles ── */}
          <div className="mt-3 flex flex-wrap gap-2">
            <HighlightTile
              icon={<Svg d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M16.9 16.9l2.1 2.1M4.9 19.1l2.1-2.1M16.9 7.1l2.1-2.1" className="h-4 w-4" />}
              value={grade}
              label="University Grade"
            />
            <HighlightTile
              icon={<Svg d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" className="h-4 w-4" />}
              value={worldRank}
              label="World Rank"
            />
            <HighlightTile
              icon={<Svg d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" className="h-4 w-4" />}
              value={durationLabel}
              label="Duration"
            />
            <HighlightTile
              icon={<Svg d="m9 12 2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016Z" className="h-4 w-4" />}
              value={approvalLabel}
              label="Approval"
            />
          </div>

          {/* ── Info strip ── */}
          <div
            className="mt-3 flex flex-wrap items-stretch divide-x rounded-xl px-3 py-2.5"
            style={{ background: B.lavender, border: `1px solid ${B.border}` }}
          >
            <InfoItem
              icon={<Svg d="M4 20h16M6 20V9l6-4 6 4v11" className="h-3.5 w-3.5" />}
              label="Type"
              value={uniType}
            />
            <InfoItem
              icon={<Svg d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" className="h-3.5 w-3.5" />}
              label="Duration"
              value={durationLabel}
            />
            {feeLabel && (
              <InfoItem
                icon={<Svg d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" className="h-3.5 w-3.5" />}
                label="Complete Fees"
                value={feeLabel}
                accent
              />
            )}
            {intake && (
              <InfoItem
                icon={<Svg d="M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" className="h-3.5 w-3.5" />}
                label="Intake"
                value={intake}
              />
            )}
          </div>

          {/* ── Action buttons ── */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <Link
              href={uniHref}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-[13px] font-bold text-white transition hover:brightness-105"
              style={{ background: B.grad, minWidth: 120 }}
            >
              View Details
              <Svg d="M5 12h14M13 6l6 6-6 6" className="h-4 w-4" />
            </Link>

            {brochureHref ? (
              <a
                href={brochureHref}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border-2 text-[13px] font-bold transition hover:bg-[#F5EEFC]"
                style={{ borderColor: B.purple, color: B.purple, minWidth: 120 }}
              >
                <Svg d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" className="h-4 w-4" />
                Download Brochure
              </a>
            ) : (
              <Link
                href={courseHref}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border-2 text-[13px] font-bold transition hover:bg-[#F5EEFC]"
                style={{ borderColor: B.purple, color: B.purple, minWidth: 120 }}
              >
                <Svg d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" className="h-4 w-4" />
                View Course
              </Link>
            )}

            <BookmarkBtn id={id} />
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Grid card (compact, for grid view) ──────────────────────────────────────
function GridCard({ row }: { row: FilteredCourseRow }) {
  const uniHref = row.university_uuid ? `/universities/${row.university_uuid}` : "/universities";
  const courseHref = row.course_uuid ? `/courses/${row.course_uuid}` : uniHref;
  const id = row.course_uuid || row.fee_uuid || "course";
  const bannerSrc = resolveMediaUrl(row.university_banner || row.university_logo) || "/hero/slide-2.png";
  const levelBadge = prettyLevel(row.level);
  const modeBadge = prettyMode(row.study_mode);
  const feeLabel = formatFee(row.fee_amount, row.fee_currency);
  const worldRank = row.university_world_rank != null ? String(row.university_world_rank) : null;
  const location = row.university_location
    ? row.university_location.split(",").slice(-2).join(",").trim()
    : null;

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(89,21,154,0.13)]"
      style={{ border: `1.5px solid ${B.border}`, boxShadow: `0 4px 16px rgba(89,21,154,0.06)` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={bannerSrc}
          alt={row.university_name || "University"}
          fill
          sizes="(max-width:640px) 100vw, 400px"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          unoptimized={bannerSrc.startsWith("http")}
        />
        <div className="absolute inset-0" style={{ background: B.gradImg }} aria-hidden />
        {/* Type badge */}
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase text-white"
          style={{ background: "rgba(89,21,154,0.75)", backdropFilter: "blur(6px)" }}
        >
          {row.university_type || "University"}
        </span>
        {/* Name overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="text-[13px] font-bold text-white drop-shadow line-clamp-2">
            {row.university_name || "University"}
          </p>
          {location && (
            <p className="mt-0.5 text-[10.5px] text-white/80">{location}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-start gap-1.5">
          <Link href={courseHref} className="min-w-0 flex-1">
            <h2 className="text-[14px] font-extrabold leading-snug transition group-hover:text-[#59159A]" style={{ color: B.text }}>
              {row.course_name || "Course"}
            </h2>
          </Link>
          <div className="flex shrink-0 flex-wrap gap-1">
            {levelBadge && (
              <span className="rounded-full border px-2 py-0.5 text-[10.5px] font-bold" style={{ color: B.purple, borderColor: B.border, background: B.lavender }}>
                {levelBadge}
              </span>
            )}
            {modeBadge && (
              <span className="rounded-full border px-2 py-0.5 text-[10.5px] font-semibold" style={{ color: B.muted, borderColor: B.border }}>
                {modeBadge}
              </span>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {worldRank && (
            <div className="rounded-lg px-2 py-1.5 text-center" style={{ background: B.lavender }}>
              <p className="text-[13px] font-extrabold" style={{ color: B.purple }}>#{worldRank}</p>
              <p className="text-[10px]" style={{ color: B.muted }}>World Rank</p>
            </div>
          )}
          {feeLabel && (
            <div className="rounded-lg px-2 py-1.5 text-center" style={{ background: B.lavender }}>
              <p className="text-[11px] font-extrabold" style={{ color: B.pink }}>{feeLabel}</p>
              <p className="text-[10px]" style={{ color: B.muted }}>Total Fee</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto flex gap-2 pt-4">
          <Link
            href={uniHref}
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl text-[12.5px] font-bold text-white transition hover:brightness-105"
            style={{ background: B.grad }}
          >
            View Details
          </Link>
          <BookmarkBtn id={id} />
        </div>
      </div>
    </article>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────
type SortOption = "relevance" | "name" | "rank" | "fee";
type ViewMode = "list" | "grid";

function Toolbar({
  sort,
  view,
  onSort,
  onView,
}: {
  sort: SortOption;
  view: ViewMode;
  onSort: (v: SortOption) => void;
  onView: (v: ViewMode) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="inline-flex items-center gap-2 text-[12.5px]" style={{ color: B.muted }}>
        <span className="font-medium">Sort by</span>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortOption)}
          className="h-9 rounded-xl border px-3 text-[12.5px] font-semibold outline-none focus:ring-2"
          style={{
            borderColor: B.border,
            color: B.text,
            background: B.white,
          }}
        >
          <option value="relevance">Relevance</option>
          <option value="name">Course name</option>
          <option value="rank">World rank</option>
          <option value="fee">Fees: Low → High</option>
        </select>
      </label>
      <div
        className="inline-flex overflow-hidden rounded-xl border p-0.5"
        style={{ borderColor: B.border, background: B.white }}
      >
        {(["list", "grid"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            aria-label={`${v} view`}
            onClick={() => onView(v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] transition"
            style={{
              background: view === v ? B.purple : "transparent",
              color: view === v ? B.white : B.muted,
            }}
          >
            {v === "list" ? <IconList className="h-4 w-4" /> : <IconGrid className="h-4 w-4" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Recommendations banner ───────────────────────────────────────────────────
function RecommendationsBanner() {
  return (
    <section
      className="relative mt-6 overflow-hidden rounded-[20px] px-5 py-5 sm:px-6"
      style={{ background: `linear-gradient(100deg,#F7F0FF 0%,#FFF2F8 100%)`, border: `1.5px solid ${B.border}` }}
    >
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:items-center">
          <span
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{ background: B.white, color: B.pink, boxShadow: `0 6px 18px rgba(89,21,154,0.08)` }}
          >
            <Svg d="m12 3 10 5-10 5L2 8l10-5Z M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 className="text-[16px] font-bold" style={{ color: B.text }}>
              Still looking for the right course?
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed" style={{ color: B.muted }}>
              Get personalized course recommendations based on your interests and career goals.
            </p>
          </div>
        </div>
        <Link
          href="/tools/course-finder"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 text-[13px] font-semibold transition hover:bg-[#FFF0F7]"
          style={{ borderColor: B.pink, color: B.pink, background: B.white }}
        >
          Get Recommendations
          <Svg d="M5 12h14M13 6l6 6-6 6" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

// ─── Exported main component ──────────────────────────────────────────────────
export function FilteredCourseResults({
  rows,
  error,
  emptyMessage,
  summary,
}: {
  rows: FilteredCourseRow[];
  error?: string;
  emptyMessage?: string;
  summary?: string;
}) {
  const [sort, setSort] = useState<SortOption>("relevance");
  const [view, setView] = useState<ViewMode>("list");

  const sorted = useMemo(() => {
    const next = [...rows];
    if (sort === "name") {
      next.sort((a, b) => String(a.course_name ?? "").localeCompare(String(b.course_name ?? "")));
    } else if (sort === "rank") {
      next.sort((a, b) => {
        const l = Number.isFinite(Number(a.university_world_rank)) ? Number(a.university_world_rank) : Infinity;
        const r = Number.isFinite(Number(b.university_world_rank)) ? Number(b.university_world_rank) : Infinity;
        return l - r;
      });
    } else if (sort === "fee") {
      next.sort((a, b) => {
        const l = Number(a.fee_amount) || Infinity;
        const r = Number(b.fee_amount) || Infinity;
        return l - r;
      });
    }
    return next;
  }, [rows, sort]);

  return (
    <div className="min-w-0">
      {/* Toolbar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {summary ? (
          <p className="text-sm" style={{ color: B.muted }}>{summary}</p>
        ) : (
          <span />
        )}
        <Toolbar sort={sort} view={view} onSort={setSort} onView={setView} />
      </div>

      {/* Error */}
      {error ? (
        <div
          className="rounded-[20px] border border-dashed px-6 py-16 text-center"
          style={{ borderColor: "#FCA5A5", background: B.white }}
        >
          <p className="text-lg font-bold" style={{ color: B.text }}>
            Couldn't load courses
          </p>
          <p className="mt-2 text-sm" style={{ color: B.muted }}>
            {error}
          </p>
        </div>
      ) : sorted.length === 0 ? (
        <div
          className="rounded-[20px] border border-dashed px-6 py-16 text-center"
          style={{ borderColor: B.border, background: B.white }}
        >
          <p className="text-lg font-bold" style={{ color: B.text }}>
            No courses match these filters
          </p>
          <p className="mt-2 text-sm" style={{ color: B.muted }}>
            {emptyMessage || "Try adjusting your filters."}
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((row, i) => (
            <GridCard key={`${row.fee_uuid ?? row.course_uuid}-${i}`} row={row} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {sorted.map((row, i) => (
            <UniversityCard key={`${row.fee_uuid ?? row.course_uuid}-${i}`} row={row} />
          ))}
        </div>
      )}

      <RecommendationsBanner />
    </div>
  );
}

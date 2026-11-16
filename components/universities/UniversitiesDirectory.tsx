"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, MapPin, Search, Star } from "lucide-react";
import type { DiscoveryUniversity } from "@/lib/universities";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word) && word.toLowerCase() !== "of")
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function UniversityCard({ university }: { university: DiscoveryUniversity }) {
  const href = `/universities/${university.uuid}`;
  const photo = university.banner || university.logo;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#EDE4F5] bg-white shadow-[0_8px_24px_rgba(53,6,111,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(53,6,111,0.1)]">
      <div className="relative h-[140px] bg-[#FAF7FF] sm:h-[160px]">
        {photo ? (
          <Image
            src={photo}
            alt={`${university.name} campus`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#35066F] via-[#6B21A8] to-[#F20D70] text-2xl font-extrabold text-white">
            {university.shortName || initials(university.name)}
          </div>
        )}

        {university.logo ? (
          <span className="absolute left-3 top-3 inline-flex h-11 w-11 overflow-hidden rounded-xl bg-white p-1 shadow-md">
            <Image src={university.logo} alt="" width={44} height={44} className="h-full w-full object-contain" unoptimized />
          </span>
        ) : null}

        {university.ratings != null && university.ratings > 0 ? (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[12px] font-bold text-[#17134A] shadow-sm">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {university.ratings.toFixed(1)}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {university.shortName ? (
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B21A8]">{university.shortName}</p>
        ) : null}
        <h2 className="mt-1 line-clamp-2 text-[15px] font-extrabold leading-snug text-[#17134A] sm:text-base">
          {university.name}
        </h2>

        {university.location ? (
          <p className="mt-2 flex items-start gap-1.5 text-[12px] leading-5 text-[#6B6578]">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6B21A8]" />
            <span className="line-clamp-2">{university.location}</span>
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {university.grade ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF7FF] px-2 py-1 text-[11px] font-semibold text-[#17134A]">
              <Award className="h-3 w-3 text-[#F20D70]" />
              Grade {university.grade}
            </span>
          ) : null}
          {university.worldRank != null ? (
            <span className="rounded-full bg-[#FAF7FF] px-2 py-1 text-[11px] font-semibold text-[#17134A]">
              Rank #{university.worldRank}
            </span>
          ) : null}
        </div>

        <Link
          href={href}
          className="mt-auto inline-flex min-h-10 items-center justify-center rounded-xl bg-[#6B21A8] px-4 text-[13px] font-bold text-white transition hover:bg-[#35066F]"
        >
          View University
        </Link>
      </div>
    </article>
  );
}

export function UniversitiesDirectory({ universities }: { universities: DiscoveryUniversity[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return universities;
    return universities.filter((uni) =>
      [uni.name, uni.shortName, uni.location, uni.state, uni.grade]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [universities, query]);

  return (
    <main id="main" className="bg-[#FAF7FF] text-[#17134A]">
      <section className="bg-gradient-to-br from-[#35066F] via-[#6B21A8] to-[#F20D70] text-white">
        <div className="era-shell py-10 sm:py-12">
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-[13px] text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span aria-hidden>›</span>
            <span className="font-semibold text-white">Universities</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Top Universities</h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-7 text-white/85">
            Explore universities from Admission Era and open a campus page for admissions, approvals and career details.
          </p>
        </div>
      </section>

      <div className="era-shell py-8 sm:py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-[#6B6578]">
            {filtered.length} {filtered.length === 1 ? "university" : "universities"}
          </p>
          <label className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6578]" />
            <span className="sr-only">Search universities</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, location or grade"
              className="h-11 w-full rounded-xl border border-[#EDE4F5] bg-white pl-10 pr-3 text-sm text-[#17134A] outline-none ring-[#6B21A8] placeholder:text-[#9B94A8] focus:ring-2"
            />
          </label>
        </div>

        {filtered.length ? (
          <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((university) => (
              <UniversityCard key={university.uuid} university={university} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-[#EDE4F5] bg-white px-5 py-10 text-center text-sm text-[#6B6578]">
            No universities match that search.
          </p>
        )}
      </div>
    </main>
  );
}

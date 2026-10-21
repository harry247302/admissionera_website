import Image from "next/image";
import type { ComponentType, ReactNode } from "react";
import {
  counsellorExperience,
  counsellorImage,
  counsellorName,
  counsellorRating,
  isCounsellorOnline,
  type Counsellor,
  type CounsellorContentTable,
} from "@/lib/admissionExperts";
import {
  BriefcaseIcon,
  CapIcon,
  ChatIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  StarIcon,
  VerifiedBadge,
} from "./icons";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function tableColumns(table: CounsellorContentTable) {
  const columns: string[] = [];
  for (const row of table.rows ?? []) {
    for (const key of Object.keys(row.content ?? {})) {
      if (!columns.includes(key)) columns.push(key);
    }
  }
  return columns;
}

function Fact({ icon: Icon, label, value }: { icon: ComponentType<{ className?: string }>; label: string; value: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-[#EFE8FA] bg-[#FBF9FF] px-3 py-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3ECFF] text-[#440F76]">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-[#716786]">{label}</p>
        <p className="truncate text-[13px] font-bold text-[#211344]">{value}</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#E7DDF7] bg-white p-5 shadow-[0_4px_16px_rgba(68,15,118,0.05)]">
      <h3 className="text-[16px] font-extrabold text-[#211344]">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function CounsellorProfile({ counsellor }: { counsellor: Counsellor }) {
  const name = counsellorName(counsellor);
  const image = counsellorImage(counsellor);
  const online = isCounsellorOnline(counsellor);
  const experience = counsellorExperience(counsellor);
  const rating = counsellorRating(counsellor);
  const designation = counsellor.designation?.trim();
  const qualification = counsellor.qualification?.trim();
  const responseRate = counsellor.response_rate?.trim();
  const notes = counsellor.notes?.trim();
  const careerDevelopment = counsellor.career_development?.trim();
  const tables = (counsellor.specialization_content_tables ?? []).filter((table) => table.title?.trim() || table.rows?.length);

  return (
    <div className="mt-8 space-y-5">
      <section className="grid gap-5 rounded-2xl border border-[#E7DDF7] bg-white p-4 shadow-[0_6px_20px_rgba(68,15,118,0.06)] sm:grid-cols-[200px_minmax(0,1fr)] sm:p-5">
        <div className="relative mx-auto h-[230px] w-full max-w-[240px] overflow-hidden rounded-xl bg-[linear-gradient(160deg,#F3ECFF_0%,#FFEAF3_100%)] sm:mx-0">
          {image ? (
            <Image src={image} alt={name} fill sizes="240px" className="object-cover object-top" priority />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-[44px] font-extrabold text-[#440F76]/70">
              {initialsOf(name)}
            </span>
          )}
          {online ? (
            <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-[#10B981] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              Online
            </span>
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[22px] font-extrabold capitalize text-[#211344] sm:text-[26px]">{name}</h2>
            <VerifiedBadge className="h-5 w-5 shrink-0" />
            {rating !== undefined && rating >= 4.8 ? (
              <span className="rounded-full bg-[#FFE7F1] px-2.5 py-0.5 text-[11px] font-bold text-[#F20D70]">Top Rated</span>
            ) : null}
          </div>

          {rating !== undefined ? (
            <p className="mt-1 flex items-center gap-1.5 text-[13px] font-bold text-[#211344]">
              <span className="flex text-[#F5B400]" aria-hidden>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className={`h-4 w-4 ${star <= Math.round(rating) ? "" : "text-[#E7DDF7]"}`} />
                ))}
              </span>
              {rating.toFixed(1)}
              <span className="sr-only"> out of 5 rating</span>
            </p>
          ) : null}

          <p className="mt-1.5 text-[15px] font-semibold text-[#440F76]">
            {designation || qualification || "Admission Counsellor"}
          </p>
          {designation && qualification ? (
            <span className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-md bg-[#FFF0F6] px-2.5 py-1 text-[12px] font-semibold text-[#C90083]">
              <CapIcon className="h-3.5 w-3.5 shrink-0" />
              {qualification}
            </span>
          ) : null}

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {experience ? <Fact icon={BriefcaseIcon} label="Experience" value={`${experience}+ Years`} /> : null}
            {responseRate ? <Fact icon={ChatIcon} label="Response Rate" value={responseRate} /> : null}
            {counsellor.state?.trim() ? <Fact icon={PinIcon} label="State" value={counsellor.state} /> : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {counsellor.phone ? (
              <a
                href={`tel:+91${counsellor.phone}`}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#F20D70_0%,#C90083_100%)] px-5 text-[13.5px] font-semibold text-white shadow-[0_8px_18px_rgba(242,13,112,0.25)] transition hover:brightness-105"
              >
                <PhoneIcon className="h-4 w-4" />
                Call +91 {counsellor.phone}
              </a>
            ) : null}
            {counsellor.alternate_phone ? (
              <a
                href={`tel:+91${counsellor.alternate_phone}`}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#E7DDF7] bg-white px-4 text-[13.5px] font-semibold text-[#440F76] transition hover:border-[#440F76]"
              >
                <PhoneIcon className="h-4 w-4" />
                +91 {counsellor.alternate_phone}
              </a>
            ) : null}
            {counsellor.email ? (
              <a
                href={`mailto:${counsellor.email}`}
                className="inline-flex h-11 min-w-0 items-center gap-2 rounded-xl border border-[#E7DDF7] bg-white px-4 text-[13.5px] font-semibold text-[#440F76] transition hover:border-[#440F76]"
              >
                <MailIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{counsellor.email}</span>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {notes || careerDevelopment ? (
        <div className={`grid gap-5 ${notes && careerDevelopment ? "lg:grid-cols-2" : ""}`}>
          {notes ? (
            <Section title="About">
              <p className="whitespace-pre-line break-words text-[13.5px] leading-6 text-[#716786]">{notes}</p>
            </Section>
          ) : null}
          {careerDevelopment ? (
            <Section title="Career Development">
              <p className="whitespace-pre-line break-words text-[13.5px] leading-6 text-[#716786]">{careerDevelopment}</p>
            </Section>
          ) : null}
        </div>
      ) : null}

      {tables.length ? (
        <Section title="Specializations">
          <div className="space-y-5">
            {tables.map((table) => {
              const columns = tableColumns(table);
              return (
                <div key={table.id}>
                  <h4 className="flex items-center gap-1.5 text-[14px] font-bold text-[#440F76]">
                    <CapIcon className="h-4 w-4" />
                    {table.title?.trim() || "Details"}
                  </h4>
                  {table.rows?.length && columns.length ? (
                    <div className="mt-2 overflow-x-auto rounded-xl border border-[#EFE8FA]">
                      <table className="w-full min-w-[420px] text-left text-[13px]">
                        <thead className="bg-[#F7F3FF] text-[#440F76]">
                          <tr>
                            {columns.map((column) => (
                              <th key={column} scope="col" className="px-3.5 py-2.5 font-semibold">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EFE8FA] text-[#211344]">
                          {[...table.rows]
                            .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                            .map((row) => (
                              <tr key={row.id}>
                                {columns.map((column) => (
                                  <td key={column} className="px-3.5 py-2.5">
                                    {row.content?.[column] || "—"}
                                  </td>
                                ))}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="mt-1 text-[12.5px] text-[#9A90AD]">No details added yet.</p>
                  )}
                </div>
              );
            })}
          </div>
        </Section>
      ) : null}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ComponentType, type ReactNode } from "react";
import {
  counsellorContactHref,
  counsellorExperience,
  counsellorImage,
  counsellorName,
  counsellorRating,
  counsellorSpecializations,
  isCounsellorOnline,
  type Counsellor,
} from "@/lib/admissionExperts";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CapIcon,
  ChatIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ShieldCheckIcon,
  SparkIcon,
  StarIcon,
  VerifiedBadge,
} from "./icons";

const BIO_PREVIEW_LENGTH = 160;

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function joinedOn(value: string | null) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-IN", { month: "short", year: "numeric", timeZone: "UTC" });
}

type Highlight = { label: string; icon: ComponentType<{ className?: string }> };

function MentorHighlights({ experience }: { experience?: number }) {
  const highlights: Highlight[] = [
    ...(experience ? [{ label: `${experience}+ Years Experience`, icon: BriefcaseIcon }] : []),
    { label: "Personalized Guidance", icon: SparkIcon },
    { label: "Verified Counsellor", icon: ShieldCheckIcon },
  ];

  return (
    <ul className="space-y-2.5">
      {highlights.map(({ label, icon: Icon }) => (
        <li key={label} className="flex items-center gap-2.5 text-[12.5px] font-medium text-[#211344]">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F3ECFF] text-[#440F76]">
            <Icon className="h-3.5 w-3.5" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}

function Meta({ icon: Icon, children }: { icon: ComponentType<{ className?: string }>; children: ReactNode }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 shrink-0 text-[#440F76]" />
      <span className="min-w-0 truncate">{children}</span>
    </span>
  );
}

export function MentorCard({ counsellor }: { counsellor: Counsellor }) {
  const [expanded, setExpanded] = useState(false);
  const name = counsellorName(counsellor);
  const image = counsellorImage(counsellor);
  const online = isCounsellorOnline(counsellor);
  const experience = counsellorExperience(counsellor);
  const specializations = counsellorSpecializations(counsellor);
  const joined = joinedOn(counsellor.created_at);
  const rating = counsellorRating(counsellor);
  const designation = counsellor.designation?.trim();
  const qualification = counsellor.qualification?.trim();
  const responseRate = counsellor.response_rate?.trim();
  const bio = counsellor.notes?.trim() ?? "";
  const longBio = bio.length > BIO_PREVIEW_LENGTH;

  return (
    <article className="relative grid gap-4 rounded-2xl border border-[#E7DDF7] bg-white p-3.5 shadow-[0_4px_16px_rgba(68,15,118,0.05)] sm:grid-cols-[132px_minmax(0,1fr)] sm:p-4 lg:grid-cols-[150px_minmax(0,1fr)_220px]">
      <div className="relative mx-auto h-[176px] w-full max-w-[220px] overflow-hidden rounded-xl bg-[linear-gradient(160deg,#F3ECFF_0%,#FFEAF3_100%)] sm:mx-0 sm:h-[160px] lg:h-[172px]">
        {image ? (
          <Image src={image} alt={name} fill sizes="(min-width: 640px) 150px, 220px" className="object-cover object-top" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[34px] font-extrabold text-[#440F76]/70">
            {initialsOf(name)}
          </span>
        )}
        {online ? (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-bold text-[#10B981] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            Online
          </span>
        ) : null}
        {experience ? (
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#440F76]/90 px-2.5 py-0.5 text-[10.5px] font-semibold text-white">
            {experience}+ Yrs Exp
          </span>
        ) : null}
      </div>

      {/* {rating !== undefined && rating >= 4.8 ? (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[#FFE7F1] px-2.5 py-0.5 text-[11px] font-bold text-[#F20D70]">
          Top Rated
        </span>
      ) : null} */}

      <div className="min-w-0">
        <div className="flex items-center gap-1.5 pr-20">
          <h2 className="truncate text-[16.5px] font-extrabold capitalize text-[#211344]">{name}</h2>
          <VerifiedBadge className="h-[17px] w-[17px] shrink-0" />
          <p className="mt-0.5 flex items-center gap-1 text-[12.5px] font-bold text-[#211344]">
            <span className="flex text-[#F5B400]" aria-hidden>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} className={`h-3.5 w-3.5 ${star <= Math.round(rating ?? 0) ? "" : "text-[#E7DDF7]"}`} />
              ))}
            </span>
            <span>
              {(rating ?? 0).toFixed(1)}
              <span className="sr-only"> out of 5 rating</span>
            </span>
          </p>
        </div>
        <p className="mt-1 truncate text-[13px] font-semibold text-[#440F76]">
          {designation || qualification || "Admission Counsellor"}
        </p>
        {designation && qualification ? (
          <span className="mt-1.5 inline-flex max-w-full items-center gap-1 truncate rounded-md bg-[#FFF0F6] px-2 py-0.5 text-[11px] font-semibold text-[#C90083]">
            <CapIcon className="h-3 w-3 shrink-0" />
            {qualification}
          </span>
        ) : null}

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-[#716786]">
          {counsellor.state?.trim() ? <Meta icon={PinIcon}>{counsellor.state}</Meta> : null}
          {responseRate ? (
            <Meta icon={ChatIcon}>
              Response Rate: <span className="font-semibold text-[#211344]">{responseRate}</span>
            </Meta>
          ) : null}
          {counsellor.phone ? (
            <Meta icon={PhoneIcon}>
              <a href={`tel:+91${counsellor.phone}`} className="hover:text-[#F20D70]">
                +91 {counsellor.phone}
              </a>
              {counsellor.alternate_phone ? (
                <>
                  {" / "}
                  <a href={`tel:+91${counsellor.alternate_phone}`} className="hover:text-[#F20D70]">
                    {counsellor.alternate_phone}
                  </a>
                </>
              ) : null}
            </Meta>
          ) : null}
          {counsellor.email ? (
            <Meta icon={MailIcon}>
              <a href={`mailto:${counsellor.email}`} className="hover:text-[#F20D70]">
                {counsellor.email}
              </a>
            </Meta>
          ) : null}
          {/* {joined ? <Meta icon={ClockIcon}>Joined {joined}</Meta> : null} */}
        </div>     

        {bio ? (
          <p className="mt-2 break-words text-[12.5px] leading-5 text-[#716786]">
            {expanded || !longBio ? bio : `${bio.slice(0, BIO_PREVIEW_LENGTH).trimEnd()}…`}
            {longBio ? (
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                className="ml-1 font-semibold text-[#F20D70] hover:underline"
              >
                {expanded ? "Show Less" : "Read More"}
              </button>
            ) : null}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col justify-between gap-4 border-t border-[#EFE8FA] pt-4 sm:col-span-2 sm:flex-row sm:items-end lg:col-span-1 lg:flex-col lg:items-stretch lg:border-l lg:border-t-0 lg:pl-5 lg:pt-1">
        <MentorHighlights experience={experience} />
        <Link
          href={counsellorContactHref(counsellor)}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#F20D70_0%,#C90083_100%)] px-5 text-[13.5px] font-semibold text-white shadow-[0_8px_18px_rgba(242,13,112,0.25)] transition hover:brightness-105 sm:w-auto lg:w-full"
        >
          <CalendarIcon className="h-4 w-4" />
          Book a Session
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CapIcon, ScaleIcon, UsersIcon } from "./icons";

const FEATURES = [
  { label: "Compare Universities", icon: ScaleIcon },
  { label: "Find the Best Courses", icon: CapIcon },
  { label: "Get Admission Guidance", icon: UsersIcon },
];

export function UniversityGuidanceBanner() {
  return (
    <section
      aria-labelledby="guidance-banner-heading"
      className="relative overflow-hidden rounded-2xl border border-[#E7DDF7] bg-[linear-gradient(100deg,#F1E9FF_0%,#F8F1FF_45%,#FFEAF3_100%)] p-4 sm:p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex shrink-0 items-center" aria-hidden>
          <span className="relative h-[72px] w-[72px] overflow-hidden rounded-full ring-4 ring-white sm:h-[84px] sm:w-[84px]">
            <Image src="/assets/admissionera/colleges/campus-1.jpg" alt="" fill sizes="84px" className="object-cover" />
          </span>
          <span className="relative -ml-4 h-[72px] w-[72px] overflow-hidden rounded-full bg-[#FFE0EE] ring-4 ring-white sm:h-[84px] sm:w-[84px]">
            <Image
              src="/assets/admissionera/final-cta-graduate.webp"
              alt=""
              fill
              sizes="84px"
              className="object-cover object-top"
            />
          </span>
        </div>

        {/* <div className="min-w-0 flex-1">
          <h2 id="guidance-banner-heading" className="text-[18px] font-extrabold leading-snug text-[#211344] sm:text-[20px]">
            Which <span className="text-[#440F76]">Academic Partner</span> /{" "}
            <span className="text-[#F20D70]">University</span> Should I Select?
          </h2>
          <p className="mt-1 text-[13px] text-[#716786]">Get expert advice to choose the right university for your goals.</p>
        </div> */}

        <Link
          href="/compare"
          aria-label="Compare universities"
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#440F76] text-white shadow-[0_8px_18px_rgba(68,15,118,0.25)] transition hover:bg-[#35105F] md:flex"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </Link>

        <ul className="hidden shrink-0 gap-2 sm:grid rounded-xl bg-white px-4 py-3 shadow-[0_6px_16px_rgba(68,15,118,0.06)] sm:grid-cols-3 md:grid-cols-1">
          {FEATURES.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-2 text-[12.5px] font-semibold text-[#211344]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3ECFF] text-[#440F76]">
                <Icon className="h-3.5 w-3.5" />
              </span>
              {label}
            </li>
          ))}
        </ul>

        <Link
          href="/compare"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#440F76] px-5 text-[13px] font-semibold text-white md:hidden"
        >
          Compare Universities
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

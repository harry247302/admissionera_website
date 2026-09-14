import { SectionHeading, SectionLead } from "./SectionHeading";

const INSTITUTIONS = [
  "Delhi University",
  "JNU",
  "IITs",
  "NITs",
  "Amity",
  "Manipal",
  "LPU",
  "Symbiosis",
];

export function InstitutionsSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="era-shell text-center">
        <SectionHeading>Trusted by Leading Institutions</SectionHeading>
        <SectionLead className="mx-auto">
          We collaborate with leading colleges and universities across India.
        </SectionLead>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {INSTITUTIONS.map((name) => (
            <div
              key={name}
              className="inline-flex min-h-14 min-w-[140px] items-center justify-center rounded-2xl border border-violet-100 bg-era-lavender/70 px-5 text-sm font-semibold tracking-wide text-era-dark/70 grayscale transition hover:grayscale-0 hover:border-fuchsia-200 hover:text-era-primary"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

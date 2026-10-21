import Image from "next/image";
import Link from "next/link";

export function FinalCtaBanner() {
  return (
    <section className="bg-white pb-10" aria-labelledby="final-cta-heading">
      <div className="era-shell mt-10">
        <div className="relative isolate flex min-h-[112px] flex-col items-center gap-4 rounded-2xl bg-[linear-gradient(100deg,#22094C_0%,#280A57_45%,#2A0B5C_100%)] px-5 py-6 text-center text-white md:flex-row md:gap-5 md:py-0 md:pl-[330px] md:pr-[88px] md:text-left lg:pl-[345px]">
          <Image
            src="/assets/admissionera/footer-img.png"
            alt=""
            width={764}
            height={260}
            sizes="340px"
            aria-hidden
            className="pointer-events-none mx-4 absolute bottom-0 left-0 hidden h-[128px] w-auto select-none md:block [mask-image:linear-gradient(to_right,#000_92%,transparent)]"
          />

          <div className="min-w-0 flex-1">
            <h2
              id="final-cta-heading"
              className="text-[20px] font-extrabold leading-tight tracking-tight sm:text-[21px] xl:text-[23px]"
            >
              Your Future Starts With One Search.
            </h2>
            <p className="mt-1 text-[12px] text-white/85 xl:text-[12.5px]">
              Tell us what you want to study. We&apos;ll help you find where to study it.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap justify-center gap-3 md:justify-start">
            <Link
              href="/search"
              className="inline-flex h-10 items-center rounded-full bg-white px-5 text-[13px] font-semibold text-[#1B1446] shadow-[0_6px_16px_rgba(0,0,0,0.18)] transition hover:bg-[#F4EEFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Find My College
            </Link>
            <Link
              href="/tools/course-finder"
              className="inline-flex h-10 items-center rounded-full bg-[#F20D70] px-6 text-[13px] font-semibold text-white shadow-[0_6px_18px_rgba(242,13,112,0.45)] transition hover:bg-[#D40B62] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Talk to an Expert
            </Link>
          </div>

          <svg
            viewBox="0 0 80 90"
            fill="none"
            className="pointer-events-none absolute bottom-2 right-5 hidden h-[86px] w-[76px] text-white md:block"
            aria-hidden
          >
            <path
              d="M6 86c10-6 18-14 24-24s14-20 26-28"
              stroke="currentColor"
              strokeOpacity="0.8"
              strokeWidth="1.4"
              strokeDasharray="3 4"
              strokeLinecap="round"
            />
            <path
              d="M76 4 44 18l10 5 4 11 18-30Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M76 4 54 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

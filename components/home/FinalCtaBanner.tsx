import Image from "next/image";
import Link from "next/link";

export function FinalCtaBanner() {
  return (
    <section className="bg-white pb-10" aria-labelledby="final-cta-heading">
      <div className="era-shell mt-10">
        <div className="grid items-center gap-6 overflow-hidden rounded-[28px] bg-[linear-gradient(100deg,#35066F_0%,#6D28D9_55%,#F20D70_100%)] px-5 py-6 text-white sm:px-8 lg:grid-cols-[180px_minmax(0,1fr)]">
          <div className="relative mx-auto h-36 w-36">
            <Image
              src="/hero/boy.png"
              alt=""
              fill
              sizes="144px"
              className="object-contain object-bottom"
            />
          </div>
          <div>
            <h2 id="final-cta-heading" className="text-[26px] font-extrabold leading-tight sm:text-[32px]">
              Your Future Starts With One Search.
            </h2>
            <p className="mt-2 max-w-[520px] text-sm text-white/85">
              Compare colleges, check a course and talk to an admission expert when you are ready.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/search"
                className="inline-flex h-10 items-center rounded-full bg-white px-4 text-[13px] font-semibold text-[#35066F] transition hover:bg-[#FFF0F6]"
              >
                Find My College
              </Link>
              <Link
                href="/tools/course-finder"
                className="inline-flex h-10 items-center rounded-full border border-white/70 px-4 text-[13px] font-semibold text-white transition hover:bg-white/10"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

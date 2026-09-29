import Image from "next/image";
import Link from "next/link";

const AI_FINDER_HREF = "/tools/course-finder";
const ROBOT_SRC = "/assets/admissionera/admissionera_ai_robot.webp";
const AVATAR_SRC = "/assets/admissionera/student_avatar.webp";

const aiFeatures = [
  "Personalized Suggestions",
  "Based on Real Data",
  "Colleges, Courses & Fees",
  "Available 24×7",
];

const recommendations = ["B.Com", "BBA", "Economics", "BMS"];

const userPrompt =
  "I scored 78% in 12th commerce. I want to study in Delhi with a budget around ₹1.5 lakh.";

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function SparklesIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0Z" />
      <path d="M20 3v4M22 5h-4" />
    </svg>
  );
}

function AIIntro() {
  return (
    <div className="era-reveal relative z-10 max-w-[460px] text-center min-[601px]:text-left">
      <span
        aria-hidden
        className="era-blob pointer-events-none absolute -left-6 -top-6 h-16 w-16 bg-[#EBD9FF]/60 blur-xl"
      />
      <p className="relative text-[17px] font-semibold text-[#3B1273] lg:text-[20px]">
        Not sure what to choose?
      </p>
      <h2
        id="ai-section-heading"
        className="relative mt-1.5 inline-block text-[27px] font-extrabold leading-[1.1] tracking-tight text-[#4A1A8C] lg:text-[29px] xl:text-[33px]"
      >
        Ask AdmissionEra AI
        <SparklesIcon className="absolute -right-6 -top-2 h-5 w-5 text-[#E0337A]" />
      </h2>
      <p className="relative mx-auto mt-3 max-w-[430px] text-[13.5px] leading-[1.55] text-[#667085] min-[601px]:mx-0 lg:text-[14.5px]">
        Get personalized college and course recommendations based on your
        interest, marks, location and budget.
      </p>
      <Link
        href={AI_FINDER_HREF}
        className="relative mt-6 inline-flex h-[46px] items-center gap-2.5 rounded-[9px] bg-[linear-gradient(90deg,#5B21B6_0%,#C026D3_60%,#EC4899_100%)] px-5 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(91,33,182,0.28)] transition duration-200 hover:-translate-y-px hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6]"
      >
        Find My Options with AI
        <ArrowRightIcon />
      </Link>
    </div>
  );
}

function AIConversation() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[320px] flex-col gap-3.5 lg:max-w-[300px] xl:max-w-[310px]">
      <div
        className="era-reveal relative pl-9"
        style={{ animationDelay: "120ms" }}
      >
        <span className="absolute left-0 top-1 h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.12)]">
          <Image
            src={AVATAR_SRC}
            alt="Student"
            fill
            sizes="32px"
            className="object-cover"
          />
        </span>
        <p className="rounded-xl bg-white/95 px-[15px] py-3 text-[11.5px] leading-[1.55] text-[#344054] shadow-[0_6px_18px_rgba(74,26,140,0.08)]">
          {userPrompt}
        </p>
      </div>

      <div
        className="era-reveal relative pl-9"
        style={{ animationDelay: "260ms" }}
      >
        <span className="absolute left-0 top-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#F3E8FF] shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
          <Image
            src={ROBOT_SRC}
            alt=""
            width={28}
            height={28}
            className="translate-y-1 scale-[1.6] object-contain object-top"
          />
        </span>
        <div className="rounded-xl bg-white px-[15px] py-3.5 shadow-[0_8px_22px_rgba(74,26,140,0.1)]">
          <p className="text-[11.5px] leading-[1.55] text-[#344054]">
            Here are some courses and colleges matching your preferences...
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {recommendations.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[11.5px] text-[#344054]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#E0337A] ring-[3px] ring-[#F3E8FF]" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-end">
            <Link
              href={AI_FINDER_HREF}
              className="inline-flex h-8 items-center gap-1.5 rounded-[7px] bg-[linear-gradient(90deg,#5B21B6_0%,#C026D3_60%,#EC4899_100%)] px-3.5 text-[11px] font-semibold text-white transition duration-200 hover:-translate-y-px hover:brightness-110"
            >
              Explore Matches
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIRobotVisual() {
  return (
    <div className="relative mx-auto h-[210px] w-[170px] shrink-0 min-[601px]:mx-0 min-[601px]:h-[235px] min-[601px]:w-[180px] xl:h-[250px] xl:w-[195px]">
      <span
        aria-hidden
        className="absolute inset-x-3 bottom-2 top-5 rounded-[20px] bg-[linear-gradient(160deg,#E9D5FF_0%,#F5B8E0_55%,#FBCFE8_100%)] shadow-[0_18px_40px_rgba(192,38,211,0.28)]"
      />
      <span
        aria-hidden
        className="absolute -left-4 top-6 h-24 w-24 rounded-full bg-white/50 blur-2xl"
      />
      <div className="era-ai-float absolute inset-0">
        <Image
          src={ROBOT_SRC}
          alt="AdmissionEra AI assistant"
          fill
          sizes="(max-width: 600px) 170px, 195px"
          className="object-contain drop-shadow-[0_14px_18px_rgba(74,26,140,0.18)]"
        />
      </div>
    </div>
  );
}

function AIFeatures() {
  return (
    <ul
      className="era-reveal relative z-10 w-full max-w-[320px] space-y-2.5 rounded-[14px] border border-[#E9DDF7]/60 bg-white p-4 shadow-[0_8px_25px_rgba(0,0,0,0.08)] min-[601px]:w-[196px] min-[601px]:p-3.5 xl:w-[218px] xl:p-4"
      style={{ animationDelay: "360ms" }}
    >
      {aiFeatures.map((feature) => (
        <li
          key={feature}
          className="flex items-center gap-2.5 whitespace-nowrap text-[11px] font-medium text-[#344054] xl:text-[11.5px]"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F3E8FF] text-[#5B21B6]">
            <CheckIcon />
          </span>
          {feature}
        </li>
      ))}
    </ul>
  );
}

export function AdmissionEraAISection() {
  return (
    <section
      className="bg-white pb-12 sm:pb-14"
      aria-labelledby="ai-section-heading"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
        <div className="relative overflow-hidden rounded-[18px] border border-[#E9DDF7]/70 bg-[linear-gradient(110deg,#FBF7FF_0%,#F7F0FF_55%,#FDEEF7_100%)] px-5 py-8 min-[601px]:px-8 lg:min-h-[280px] lg:px-10 lg:py-7 xl:px-12">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-[#EFE2FF]/70 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-72 rounded-full bg-white/60 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 top-1/4 h-64 w-64 rounded-full bg-[#FBD8EC]/60 blur-3xl"
          />
          <svg
            aria-hidden
            viewBox="0 0 600 200"
            className="pointer-events-none absolute bottom-0 left-0 h-32 w-[60%] text-[#D8C2F5] opacity-50"
            fill="none"
          >
            <path
              d="M0 170C120 120 220 190 340 140S520 60 600 90"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <SparklesIcon className="pointer-events-none absolute right-[34%] top-6 hidden h-4 w-4 text-[#D98BD0] lg:block" />
          <div className="relative grid items-center gap-8 min-[601px]:grid-cols-2 min-[601px]:gap-x-6 lg:grid-cols-[37fr_27fr_36fr] lg:gap-x-5">
            <div className="min-[601px]:col-span-2 lg:col-span-1">
              <AIIntro />
            </div>

            <AIConversation />

            <div className="relative flex flex-col items-center gap-4 min-[601px]:block min-[601px]:h-[250px] xl:h-[260px]">
              <div className="min-[601px]:absolute min-[601px]:left-0 min-[601px]:top-1/2 min-[601px]:-translate-y-1/2">
                <AIRobotVisual />
              </div>
              <div className="flex w-full justify-center min-[601px]:absolute min-[601px]:right-0 min-[601px]:top-1/2 min-[601px]:w-auto min-[601px]:-translate-y-1/2">
                <AIFeatures />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { FAQAccordion } from "@/components/courses/CourseContentBlocks";
import { Icon } from "@/components/courses/specialization/icons";
import {
  SectionTabs,
  ShareSaveActions,
  type SectionTab,
} from "@/components/courses/specialization/SpecializationClient";
import {
  BenefitCard,
  Breadcrumbs,
  buttonStyles,
  CtaBanner,
  Eyebrow,
  HighlightsCard,
  InfoCard,
  StatsStrip,
  TechIllustration,
  type Fact,
  type Tone,
} from "@/components/courses/specialization/SpecializationSections";
import type { CourseFaq } from "@/lib/courseDiscovery";
import type { IconName } from "@/components/courses/specialization/icons";
import {
  excerpt,
  formatSpecializationDuration,
  htmlToText,
  type SpecializationDetail,
} from "@/lib/specializations";

export type SpecializationCourseContext = {
  id: string;
  slug: string;
  name: string;
  code: string;
  studyMode: string;
  overview?: string;
  eligibility?: string;
  careerOpportunities?: string;
  curriculum?: string;
  faqs?: CourseFaq[];
};

const TABS: SectionTab[] = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "eligibility", label: "Eligibility" },
  { id: "admission", label: "Admission Process" },
  { id: "careers", label: "Career Opportunities" },
  { id: "faqs", label: "FAQs" },
];

const BENEFITS: { icon: IconName; title: string; text: string; tone: Tone }[] = [
  { icon: "laptop", title: "Industry-Relevant Skills", text: "Build in-demand technical and practical skills alongside your degree.", tone: "blue" },
  { icon: "user", title: "Flexible Learning", text: "Study from anywhere at your own pace while managing other commitments.", tone: "violet" },
  { icon: "trendingUp", title: "Career Growth", text: "Open doors to a wide range of roles across the technology sector.", tone: "green" },
  { icon: "wallet", title: "Affordable Education", text: "Online delivery helps keep overall learning costs manageable.", tone: "amber" },
];

function programLabel(course: SpecializationCourseContext) {
  return course.code || course.name || "Courses";
}

function CounsellorNote({ topic, href }: { topic: string; href: string }) {
  return (
    <p>
      Official {topic} details for this specialization haven’t been published yet.{" "}
      <Link href={href} className="font-semibold text-[#4F20C9] underline-offset-4 hover:underline">
        Talk to a counsellor
      </Link>{" "}
      for up-to-date, university-verified information.
    </p>
  );
}

export function SpecializationDetailPage({
  specialization: spec,
  course,
}: {
  specialization: SpecializationDetail;
  course: SpecializationCourseContext;
}) {
  const parent = programLabel(course);
  const courseKey = course.slug || course.id;
  const courseHref = `/courses/${encodeURIComponent(courseKey)}`;
  const enquireHref = `/tools/course-finder?course=${encodeURIComponent(course.id)}&specialization=${encodeURIComponent(
    spec.slug || spec.uuid
  )}`;

  const duration = formatSpecializationDuration(spec);
  const durationAdjective = duration ? duration.toLowerCase().replace(/^(\S+) (\S+?)s?$/, "$1-$2") : "";
  const isOnline = /online/i.test(course.studyMode || "");
  const modeValue = isOnline ? "Online" : course.studyMode;

  const description =
    spec.description ||
    `Build a strong foundation with the ${spec.name} programme. Learn industry-relevant skills, gain practical knowledge and prepare for a successful career.`;
  const overview = spec.overview || spec.description || htmlToText(course.overview);
  const eligibility = spec.eligibility || htmlToText(course.eligibility);
  const careers = spec.careerOpportunities || htmlToText(course.careerOpportunities);
  const curriculum = htmlToText(course.curriculum);
  const faqs = course.faqs ?? [];

  const candidateFacts: Array<Fact | null> = [
    duration ? { icon: "calendar", label: "Program Duration", value: duration } : null,
    spec.code ? { icon: "fileText", label: "Program Code", value: spec.code } : null,
    spec.shortName ? { icon: "graduationCap", label: "Short Name", value: spec.shortName } : null,
    modeValue ? { icon: "monitor", label: "Learning Mode", value: modeValue } : null,
  ];
  const facts = candidateFacts.filter((fact): fact is Fact => fact !== null);

  const highlights: Fact[] = [
    ...facts.map((fact) => ({ ...fact, label: fact.label.replace("Program ", "").replace("Learning ", "") })),
    ...(isOnline ? [{ icon: "clock" as const, label: "Learning", value: "Flexible" }] : []),
  ];

  const infoCards = [
    {
      id: "curriculum",
      icon: "bookOpen" as const,
      title: "Curriculum",
      tone: "blue" as const,
      content: curriculum,
      summary: curriculum ? excerpt(curriculum) : `Explore the syllabus structure of ${spec.name}.`,
      fallback: <CounsellorNote topic="curriculum" href={enquireHref} />,
    },
    {
      id: "eligibility",
      icon: "user" as const,
      title: "Eligibility",
      tone: "violet" as const,
      content: eligibility,
      summary: eligibility ? excerpt(eligibility) : `Check the eligibility criteria to apply for ${spec.name}.`,
      fallback: <CounsellorNote topic="eligibility" href={enquireHref} />,
    },
    {
      id: "admission",
      icon: "clipboard" as const,
      title: "Admission Process",
      tone: "green" as const,
      content: spec.admissionRequirements,
      summary: spec.admissionRequirements
        ? excerpt(spec.admissionRequirements)
        : "Understand the documents and steps required to begin your learning journey.",
      fallback: <CounsellorNote topic="admission" href={enquireHref} />,
    },
    {
      id: "careers",
      icon: "briefcase" as const,
      title: "Career Opportunities",
      tone: "amber" as const,
      content: careers,
      summary: careers ? excerpt(careers) : `Discover career paths after completing ${parent}.`,
      fallback: <CounsellorNote topic="career" href={enquireHref} />,
    },
  ];

  return (
    <main id="main" className="bg-white text-[#14123A]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F7F5FF] via-white to-[#EFEAFF]">
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#E4DBFF]/60 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#D9CCFF]/40 blur-3xl" aria-hidden />

        <div className="era-shell relative pb-20 pt-5 sm:pb-24">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: parent, href: courseHref },
                { label: "Specializations", href: `${courseHref}#specializations` },
                { label: spec.name },
              ]}
            />
            <div className="hidden sm:block">
              <ShareSaveActions id={spec.uuid || spec.id} title={spec.name} />
            </div>
          </div>

          <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              {spec.code ? (
                <span className="inline-flex rounded-full bg-[#E9E2FF] px-3 py-1 text-xs font-bold tracking-wide text-[#4F20C9]">
                  {spec.code}
                </span>
              ) : null}
              <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#14123A] sm:text-5xl lg:text-[3.25rem]">
                {spec.name}
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#5D5A80] sm:text-base">{description}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={enquireHref} className={buttonStyles.primary}>
                  Apply Now
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
                <Link href={enquireHref} className={buttonStyles.secondary}>
                  <Icon name="headset" className="h-4 w-4" />
                  Talk to Counsellor
                </Link>
              </div>
              <div className="mt-5 sm:hidden">
                <ShareSaveActions id={spec.uuid || spec.id} title={spec.name} />
              </div>
            </div>
            <TechIllustration />
          </div>
        </div>
      </section>

      {facts.length ? (
        <div className="era-shell relative z-10 -mt-12">
          <StatsStrip facts={facts} />
        </div>
      ) : null}

      <div className="h-8" aria-hidden />
      <SectionTabs tabs={TABS} />

      <div className="era-shell space-y-16 py-12 lg:space-y-20 lg:py-16">
        <section id="overview" className="scroll-mt-40 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">About {spec.name}</h2>
            <div className="mt-4 text-[15px] leading-7 text-[#5D5A80] sm:text-base">
              {overview ? (
                <p className="whitespace-pre-line">{overview}</p>
              ) : (
                <p>
                  {spec.name} is a{durationAdjective ? ` ${durationAdjective}` : "n"} programme
                  {isOnline ? " delivered online" : ""}, designed for students who want to build a strong base in the
                  subject while developing practical, career-ready skills. Detailed programme information will be
                  updated soon — our counsellors can share the latest university-verified details.
                </p>
              )}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={enquireHref} className={buttonStyles.primary}>
                Apply Now
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link href={enquireHref} className={buttonStyles.secondary}>
                <Icon name="headset" className="h-4 w-4" />
                Talk to Counsellor
              </Link>
            </div>
          </div>
          {highlights.length ? <HighlightsCard title="Program Highlights" facts={highlights} /> : null}
        </section>

        <section aria-labelledby="benefits-heading">
          <Eyebrow>Benefits</Eyebrow>
          <h2 id="benefits-heading" className="mt-3 text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
            Why Choose This Specialization?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </section>

        <section aria-labelledby="details-heading">
          <Eyebrow>Program Details</Eyebrow>
          <h2 id="details-heading" className="mt-3 text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
            Everything You Need to Know
          </h2>
          <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
            {infoCards.map((card) => (
              <InfoCard key={card.id} {...card} />
            ))}
          </div>
        </section>

        <section id="faqs" className="scroll-mt-40" aria-labelledby="faqs-heading">
          <Eyebrow>FAQs</Eyebrow>
          <h2 id="faqs-heading" className="mt-3 text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 max-w-4xl">
            {faqs.length ? (
              <FAQAccordion faqs={faqs} />
            ) : (
              <div className="flex items-start gap-3 rounded-2xl border border-dashed border-[#CFC2F7] bg-[#F7F5FF] p-5 text-[15px] leading-7 text-[#5D5A80]">
                <Icon name="helpCircle" className="mt-1 h-5 w-5 shrink-0 text-[#4F20C9]" />
                <p>
                  Have a question about {spec.name}?{" "}
                  <Link href={enquireHref} className="font-semibold text-[#4F20C9] underline-offset-4 hover:underline">
                    Ask our counsellors
                  </Link>{" "}
                  for personalised guidance.
                </p>
              </div>
            )}
          </div>
        </section>

        <CtaBanner
          title={`Start Your ${isOnline && course.code ? `Online ${course.code}` : parent} Journey Today`}
          text="Get expert guidance, personalised counselling and complete support throughout your admission process."
          primary={{ label: "Apply Now", href: enquireHref }}
          secondary={{ label: "Talk to Counsellor", href: enquireHref }}
        />
      </div>
    </main>
  );
}

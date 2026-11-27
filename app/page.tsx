import Image from "next/image";
import { HeroCarousel } from "@/components/Hero/HeroCarousel";
import { CourseDiscoverySection } from "@/components/home/CourseDiscoverySection";
import { CourseFilterSection } from "@/components/home/CourseFilterSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { BlogSection } from "@/components/home/BlogSection";
import { TopUniversitiesSection } from "@/components/home/TopUniversitiesSection";
import { FeaturedVideosSection } from "@/components/home/FeaturedVideosSection";
import { CompareEligibilitySection } from "@/components/home/CompareEligibilitySection";
import { FinalCtaBanner } from "@/components/home/FinalCtaBanner";
import { AdmissionEraAISection } from "@/components/home/AdmissionEraAISection";

const SIDE_WAVE_CLASS =
  "pointer-events-none absolute -z-10 hidden select-none mix-blend-multiply min-[1025px]:block";

function SideWaves({ src }: { src: string }) {
  return (
    <>
      <Image
        src={src}
        alt=""
        width={70}
        height={540}
        aria-hidden
        className={`${SIDE_WAVE_CLASS} left-0 top-0`}
      />
      <Image
        src={src}
        alt=""
        width={70}
        height={540}
        aria-hidden
        className={`${SIDE_WAVE_CLASS} right-0 top-0 -scale-x-100`}
      />
    </>
  );
}
function SideWaves2({ src }: { src: string }) {
  return (
    <>
      <Image
        src={src}
        alt=""
        width={150}
        height={540}
        aria-hidden
        className={`${SIDE_WAVE_CLASS} top-55 left-0`}
      />
      <Image
        src={src}
        alt=""
        width={150}
        height={540}
        aria-hidden
        className={`${SIDE_WAVE_CLASS} right-0 top-55 -scale-x-100`}
      />
    </>
  );
}
export default function Home() {
  return (
    <main id="main" className="flex-1 bg-white">
      <HeroCarousel />
      <CourseDiscoverySection />
      <CourseFilterSection />
      <TopUniversitiesSection />
      <FeaturedVideosSection />


      <div className="relative isolate overflow-hidden bg-white">
        <SideWaves src="/assets/admissionera/decor/pastel-wave.jpg" />
        <CoursesSection />
        <CompareEligibilitySection />
      </div>

      <div className="relative isolate overflow-hidden bg-white">
        <SideWaves2 src="/assets/admissionera/decor/wave2.png" />
        <BenefitsSection />
        <AdmissionEraAISection/>
      </div>

      <CTASection />
      <TestimonialsSection />
      {/* <BlogSection /> */}
      <FinalCtaBanner />
    </main>
  );
}

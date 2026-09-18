import { HeroCarousel } from "@/components/Hero/HeroCarousel";
import { CourseDiscoverySection } from "@/components/home/CourseDiscoverySection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { BlogSection } from "@/components/home/BlogSection";
import { TopUniversitiesSection } from "@/components/home/TopUniversitiesSection";

export default function Home() {
  return (
    <main id="main" className="flex-1 bg-white">
      <HeroCarousel />

      <CourseDiscoverySection />

      <BenefitsSection />
      <AboutSection />
      <CoursesSection />
      <TopUniversitiesSection />
      <ImpactSection />
      <TestimonialsSection />
      <CTASection />
      <BlogSection />
    </main>
  );
}

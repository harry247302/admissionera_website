import Link from "next/link";
import { HeroCarousel } from "@/components/Hero/HeroCarousel";
import { CourseDiscovery } from "@/components/CourseDiscovery/CourseDiscovery";

export default function Home() {
  return (
    <main id="main" className="flex-1 bg-white">
      <HeroCarousel />
      <CourseDiscovery showHero />
      <p className="sr-only">
        <Link href="/programs">Browse all programs</Link>
      </p>
    </main>
  );
}

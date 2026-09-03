import { CourseDiscovery } from "@/components/CourseDiscovery/CourseDiscovery";

export const metadata = {
  title: "Explore Programs",
};

export default function ProgramsPage() {
  return (
    <main id="main" className="flex-1">
      <CourseDiscovery />
    </main>
  );
}

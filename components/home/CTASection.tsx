import fs from "node:fs";
import path from "node:path";
import {
  ADMISSION_EXPERTS,
  EXPERT_PORTRAIT_DIR,
  type AdmissionExpert,
} from "@/lib/admissionExperts";
import { AdmissionExpertsSection } from "./AdmissionExpertsSection";

const PORTRAIT_EXTENSIONS = ["webp", "jpg", "jpeg", "png"];

function withPortrait(expert: AdmissionExpert): AdmissionExpert {
  if (expert.image) return expert;
  const publicDir = path.join(process.cwd(), "public");
  for (const ext of PORTRAIT_EXTENSIONS) {
    const src = `${EXPERT_PORTRAIT_DIR}/${expert.slug}.${ext}`;
    if (fs.existsSync(path.join(publicDir, src))) return { ...expert, image: src };
  }
  return expert;
}

export function CTASection() {
  return <AdmissionExpertsSection experts={ADMISSION_EXPERTS.map(withPortrait)} />;
}

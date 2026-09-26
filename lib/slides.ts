export type HeroSlideData = {
  id: string;
  title: string;
  image: string;
  imagePosition: string;
  alt: string;
};

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: "guidance-mentors",
    title: "Online university guidance from trained mentors",
    image: "/hero/banner-guidance.jpg",
    imagePosition: "center center",
    alt: "AdmissionEra: Online University Guidance from trained mentors",
  },
  {
    id: "top-universities",
    title: "Get admission to top universities",
    image: "/hero/banner-admission.jpg",
    imagePosition: "center center",
    alt: "AdmissionEra: We help you get admission to top universities",
  },
  {
    id: "dream-university",
    title: "Your dream university is just a step away",
    image: "/hero/banner-dream.jpg",
    imagePosition: "center center",
    alt: "AdmissionEra: Your dream university is just a step away",
  },
];

export const HERO_AUTOPLAY_MS = 4500;
export const HERO_TRANSITION_MS = 550;

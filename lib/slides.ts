export type HeroSlideData = {
  id: string;
  title: string;
  image: string;
  imagePosition: string;
  alt: string;
};

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: "website-banner",
    title: "Online university guidance from trained mentors",
    image: "https://cdn.collegevidya.com/home/website-banner.webp",
    imagePosition: "center center",
    alt: "Online university guidance from trained mentors",
  },
  {
    id: "brands-of-tomorrow",
    title: "The story behind simplifying learners' decisions",
    image:
      "https://cdn.collegevidya.com/home/Brands_of_tomorrow_banner_web_copy.webp",
    imagePosition: "center center",
    alt: "Brands of Tomorrow collaboration banner",
  },
];

export const HERO_AUTOPLAY_MS = 4500;
export const HERO_TRANSITION_MS = 550;

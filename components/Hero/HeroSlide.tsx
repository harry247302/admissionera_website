import Image from "next/image";
import type { HeroSlideData } from "@/lib/slides";

type HeroSlideProps = {
  slide: HeroSlideData;
  preload?: boolean;
  active?: boolean;
};

export function HeroSlide({ slide, preload = false, active = false }: HeroSlideProps) {
  return (
    <article className="relative h-full w-full" aria-hidden={!active}>
      <Image
        src={slide.image}
        alt={slide.alt}
        width={1024}
        height={341}
        preload={preload}
        sizes="100vw"
        className="block h-full w-full object-cover object-center"
        style={{ objectPosition: slide.imagePosition }}
      />
    </article>
  );
}

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

type CarouselControlsProps = {
  total: number;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (index: number) => void;
};

export function CarouselControls({
  total,
  activeIndex,
  onPrev,
  onNext,
  onDot,
}: CarouselControlsProps) {
  return (
    <>
      <button
        type="button"
        className="carousel-arrow left-3 sm:left-4 lg:left-5"
        aria-label="Previous slide"
        onClick={onPrev}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        className="carousel-arrow right-3 sm:right-4 lg:right-5"
        aria-label="Next slide"
        onClick={onNext}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
      <div
        className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-navy/25 px-2.5 py-1.5 backdrop-blur-[2px]"
        aria-label="Choose slide"
      >
        {Array.from({ length: total }, (_, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={selected ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${selected ? "w-6 bg-brand shadow-[0_0_0_2px_white]" : "w-2 bg-white/70 hover:bg-white"}`}
              onClick={() => onDot(index)}
            />
          );
        })}
      </div>
    </>
  );
}

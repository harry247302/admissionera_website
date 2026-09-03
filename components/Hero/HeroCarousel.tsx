"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_AUTOPLAY_MS, HERO_SLIDES } from "@/lib/slides";
import { CarouselControls } from "@/components/Hero/CarouselControls";
import { HeroSlide } from "@/components/Hero/HeroSlide";

export function HeroCarousel() {
  const count = HERO_SLIDES.length;
  const [position, setPosition] = useState(1);
  const [animating, setAnimating] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const hoverRef = useRef(false);
  const startX = useRef(0);
  const deltaX = useRef(0);

  const extended = [HERO_SLIDES[count - 1], ...HERO_SLIDES, HERO_SLIDES[0]];
  const realIndex = (position - 1 + count) % count;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const go = useCallback(
    (direction: 1 | -1) => {
      setAnimating(true);
      setPosition((current) => current + direction);
    },
    [],
  );

  const jumpTo = useCallback((index: number) => {
    setAnimating(true);
    setPosition(index + 1);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setAnimating(true);
      setPosition((current) => current + 1);
    }, HERO_AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  const handleTransitionEnd = () => {
    if (position === 0) {
      setAnimating(false);
      setPosition(count);
    } else if (position === count + 1) {
      setAnimating(false);
      setPosition(1);
    }
  };

  useEffect(() => {
    if (animating) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimating(true));
    });
    return () => cancelAnimationFrame(id);
  }, [animating, position]);

  const pauseForInteraction = () => {
    setPaused(true);
  };

  const resumeIfIdle = () => {
    if (!hoverRef.current) setPaused(false);
  };

  return (
    <section
      className="bg-white"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      onMouseEnter={() => {
        hoverRef.current = true;
        setPaused(true);
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
        setPaused(false);
      }}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          resumeIfIdle();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          pauseForInteraction();
          go(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          pauseForInteraction();
          go(1);
        }
      }}
    >
      <div className="relative w-full">
        <div
          className="hero-frame"
          tabIndex={0}
          onTouchStart={(event) => {
            startX.current = event.touches[0].clientX;
            deltaX.current = 0;
            pauseForInteraction();
          }}
          onTouchMove={(event) => {
            deltaX.current = event.touches[0].clientX - startX.current;
          }}
          onTouchEnd={() => {
            if (deltaX.current > 50) go(-1);
            else if (deltaX.current < -50) go(1);
            resumeIfIdle();
          }}
        >
          <div className="hero-clip">
            <div
              className={`hero-track ${animating && !reduceMotion ? "is-animating" : ""}`}
              style={{
                width: `${extended.length * 100}%`,
                transform: `translate3d(-${(position / extended.length) * 100}%, 0, 0)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extended.map((slide, index) => {
                const isClone = index === 0 || index === extended.length - 1;
                const isActive = !isClone && index === position;
                return (
                  <div key={`${slide.id}-${index}`} className="hero-slide">
                    <HeroSlide
                      slide={slide}
                      preload={index === 1}
                      active={isActive}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <CarouselControls
            total={count}
            activeIndex={realIndex}
            onPrev={() => {
              pauseForInteraction();
              go(-1);
            }}
            onNext={() => {
              pauseForInteraction();
              go(1);
            }}
            onDot={(index) => {
              pauseForInteraction();
              jumpTo(index);
            }}
          />
          <p className="sr-only" aria-live="polite">
            Slide {realIndex + 1} of {count}: {HERO_SLIDES[realIndex].title}
          </p>
        </div>
      </div>
    </section>
  );
}

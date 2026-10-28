"use client";

import { useState } from "react";
import Link from "next/link";

type FeaturedVideo = {
  id: string;
  title: string;
};

const VIDEOS: FeaturedVideo[] = [
  { id: "6CQJJ8SSz0k", title: "One Step to Success" },
  { id: "iF34p4rL2DM", title: "Uttaranchal University" },
  { id: "fVR7z0BaBP0", title: "Uttaranchal University" },
  { id: "kDUc1A3rKM0", title: "Manipal University" },
  { id: "MAC8wlM7eT8", title: "Manipal University" },
  { id: "l-lrNcb36Ls", title: "Amity University Online" },
];

function watchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

function embedUrl(id: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    loop: "1",
    playlist: id,
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

function thumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
}

export function FeaturedVideosSection() {
  const [activeId, setActiveId] = useState(VIDEOS[0].id);
  const active = VIDEOS.find((video) => video.id === activeId) ?? VIDEOS[0];
  const marqueeVideos = [...VIDEOS, ...VIDEOS, ...VIDEOS, ...VIDEOS];

  return (
    <section aria-labelledby="featured-videos-heading" className="w-full bg-[#0e1628]">
      <h2 id="featured-videos-heading" className="sr-only">
        Featured videos
      </h2>

      <div className="relative isolate h-[460px] w-full overflow-hidden sm:h-[540px] lg:h-[640px]">
        <iframe
          key={active.id}
          src={embedUrl(active.id)}
          title={active.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          tabIndex={-1}
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,22,40,0.3)_0%,transparent_32%,rgba(14,22,40,0.78)_68%,rgba(14,22,40,0.98)_100%)]" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4 sm:p-6 lg:px-8">
          <div className="max-w-xl text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              Now Playing
            </p>
            <h3 className="mt-1 text-xl font-bold sm:text-2xl lg:text-3xl">{active.title}</h3>
            <a
              href={watchUrl(active.id)}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto mt-3 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-[#121826] transition hover:bg-[#F3F5FF]"
            >
              Play Full Video
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#121826] text-white">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7Z" />
                </svg>
              </span>
            </a>
          </div>
          <Link
            href="/universities"
            className="pointer-events-auto hidden h-10 shrink-0 items-center gap-2 rounded-full bg-[#2F6BFF] px-4 text-[12.5px] font-semibold text-white shadow-[0_8px_20px_rgba(47,107,255,0.35)] transition hover:bg-[#1E57E8] sm:inline-flex"
          >
            Discover Universities
          </Link>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden p-3 sm:p-4 lg:p-5">
          <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
            Up Next
          </p>
          <div className="overflow-hidden">
            <ul className="featured-video-marquee">
              {marqueeVideos.map((video, index) => {
                const isActive = video.id === active.id;
                return (
                  <li key={`${video.id}-${index}`} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveId(video.id)}
                      aria-pressed={isActive}
                      className={`group flex h-[196px] w-[138px] flex-col justify-between rounded-2xl border p-2 text-left text-white shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 sm:h-[212px] sm:w-[152px] ${
                        isActive
                          ? "border-blue-400/80 bg-[#141c2e]/95 ring-2 ring-blue-500/30 shadow-[0_14px_32px_rgba(47,107,255,0.25)]"
                          : "border-white/10 bg-[#141c2e]/80 hover:border-white/25 hover:bg-[#1c263c]/90"
                      }`}
                    >
                      <span className="relative block h-[92px] w-full shrink-0 overflow-hidden rounded-xl bg-black/40 sm:h-[102px]">
                        <img
                          src={thumbnail(video.id)}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/10">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-transform duration-200 group-hover:scale-110 ${
                              isActive
                                ? "bg-blue-500 text-white"
                                : "bg-white/90 text-[#121826]"
                            }`}
                          >
                            <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden>
                              <path d="M8 5v14l11-7Z" />
                            </svg>
                          </span>
                        </span>
                        {isActive ? (
                          <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-blue-600/90 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white shadow-sm backdrop-blur-xs">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                            PLAYING
                          </span>
                        ) : null}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col justify-between pt-2">
                        <span className="line-clamp-2 text-[12px] font-semibold leading-snug text-white/90 transition-colors group-hover:text-white">
                          {video.title}
                        </span>
                        <span className="mt-1 flex items-center gap-1 text-[10.5px]">
                          {isActive ? (
                            <span className="inline-flex items-center gap-1.5 font-semibold text-blue-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                              Now Playing
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-medium text-white/50 transition-colors group-hover:text-white/80">
                              Watch Video
                              <svg
                                viewBox="0 0 24 24"
                                className="h-2.5 w-2.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden
                              >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </span>
                          )}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
// ''[[[[[[[=============[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]

export default FeaturedVideosSection;

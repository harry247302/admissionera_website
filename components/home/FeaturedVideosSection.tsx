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
  const marqueeVideos = [...VIDEOS, ...VIDEOS];

  return (
    <section aria-labelledby="featured-videos-heading" className="w-full bg-[#0e1628]">
      <h2 id="featured-videos-heading" className="sr-only">
        Featured videos
      </h2>

      <div className="relative isolate h-[420px] w-full overflow-hidden sm:h-[520px] lg:h-[620px]">
        <iframe
          key={active.id}
          src={embedUrl(active.id)}
          title={active.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          tabIndex={-1}
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,22,40,0.18)_0%,transparent_38%,rgba(14,22,40,0.88)_100%)]" />

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
                      className={`flex w-[240px] items-center gap-2.5 rounded-2xl border p-1.5 text-left text-white shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur-md transition sm:w-[260px] ${
                        isActive
                          ? "border-blue-400/70 bg-[#141c2e]/95"
                          : "border-white/10 bg-[#141c2e]/80 hover:border-white/25 hover:bg-[#1c263c]/90"
                      }`}
                    >
                      <span className="relative shrink-0">
                        <img
                          src={thumbnail(video.id)}
                          alt=""
                          className="h-12 w-[72px] rounded-lg object-cover sm:h-[52px] sm:w-[80px]"
                        />
                        <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20">
                          <svg viewBox="0 0 24 24" className="ml-0.5 h-3 w-3 text-white" fill="currentColor" aria-hidden>
                            <path d="M8 5v14l11-7Z" />
                          </svg>
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 text-[12px] font-semibold leading-snug">{video.title}</span>
                        <span className={`mt-0.5 block text-[10px] font-medium ${isActive ? "text-blue-300" : "text-white/50"}`}>
                          {isActive ? "Now Playing" : "Watch Video"}
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

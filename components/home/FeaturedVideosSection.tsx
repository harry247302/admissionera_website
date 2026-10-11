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
  const upNext = VIDEOS.filter((video) => video.id !== active.id);

  return (
    <section aria-labelledby="featured-videos-heading" className="w-full">
      <h2 id="featured-videos-heading" className="sr-only">
        Featured videos
      </h2>
      <div className="relative isolate w-full overflow-hidden bg-[#0e1628] sm:min-h-[560px]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <iframe
              key={active.id}
              src={embedUrl(active.id)}
              title={active.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
              tabIndex={-1}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,14,28,0.55)_0%,rgba(8,14,28,0.12)_46%,rgba(8,14,28,0.28)_100%)]" />

          <div className="relative z-10 flex min-h-[640px] flex-col justify-between gap-4 p-3 sm:min-h-[560px] sm:p-5 lg:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="w-full max-w-[360px] rounded-[22px] border border-white/10 bg-[#141c2e]/80 p-3 text-white shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-md">
                <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                  Now Playing
                </p>
                <div className="mt-2 flex items-center gap-3 rounded-2xl bg-white/5 p-2">
                  <img
                    src={thumbnail(active.id)}
                    alt=""
                    className="h-12 w-[72px] shrink-0 rounded-lg object-cover"
                  />
                  <p className="min-w-0 flex-1 text-[13px] font-bold leading-snug">{active.title}</p>
                </div>
                <a
                  href={watchUrl(active.id)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-[#121826] transition hover:bg-[#F3F5FF]"
                >
                  Play Full Video
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#121826] text-white">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7Z" />
                    </svg>
                  </span>
                </a>

                <p className="mb-2 mt-4 px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                  Up Next
                </p>
                <ul className="max-h-[250px] space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
                  {upNext.map((video) => (
                    <li key={video.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(video.id)}
                        className="flex w-full items-center gap-2.5 rounded-xl bg-[#1c263c] p-1.5 text-left transition hover:bg-[#24324d]"
                      >
                        <img
                          src={thumbnail(video.id)}
                          alt=""
                          className="h-11 w-[68px] shrink-0 rounded-lg object-cover"
                        />
                        <span className="min-w-0 flex-1 text-[12px] font-semibold leading-snug text-white/95">
                          {video.title}
                        </span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                          <svg viewBox="0 0 24 24" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden>
                            <path d="M8 5v14l11-7Z" />
                          </svg>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center pb-1">
              <Link
                href="/universities"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#2F6BFF] px-4 text-[12.5px] font-semibold text-white shadow-[0_8px_20px_rgba(47,107,255,0.35)] transition hover:bg-[#1E57E8]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <circle cx="12" cy="12" r="8" />
                  <path d="M4 12h16M12 4c2.2 2.4 2.2 13.6 0 16M12 4c-2.2 2.4-2.2 13.6 0 16" strokeLinecap="round" />
                </svg>
                Discover the universities we have for you.
              </Link>
            </div>
          </div>
      </div>
    </section>
  );
}

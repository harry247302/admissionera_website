"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  fetchDiscoveryUniversities,
  fetchUniversityCardDetails,
} from "@/lib/universities";

export type CollegeCardData = {
  id: string;
  name: string;
  location: string;
  rating: number | null;
  image: string;
  courses: string[];
  fees: string;
  href: string;
};

const MAX_CARDS = 5;

const colleges: CollegeCardData[] = [
  {
    id: "delhi-university",
    name: "Delhi University",
    location: "Delhi",
    rating: 4.5,
    image: "/assets/admissionera/colleges/campus-1.jpg",
    courses: ["B.A.", "B.Com", "B.Sc"],
    fees: "₹72,000 - ₹5,00,000",
    href: "/search?q=Delhi%20University",
  },
  {
    id: "amity-university",
    name: "Amity University",
    location: "Noida",
    rating: 4.3,
    image: "/assets/admissionera/colleges/campus-2.jpg",
    courses: ["BBA", "BCA", "MBA"],
    fees: "₹2.5L - ₹8L",
    href: "/search?q=Amity%20University",
  },
  {
    id: "lovely-professional-university",
    name: "Lovely Professional University",
    location: "Punjab",
    rating: 4.4,
    image: "/assets/admissionera/colleges/campus-3.jpg",
    courses: ["B.Tech", "BBA", "BCA"],
    fees: "₹2L - ₹6L",
    href: "/search?q=Lovely%20Professional%20University",
  },
  {
    id: "christ-university",
    name: "Christ University",
    location: "Bangalore",
    rating: 4.5,
    image: "/assets/admissionera/colleges/campus-4.jpg",
    courses: ["BBA", "BCA", "MBA"],
    fees: "₹2L - ₹5L",
    href: "/search?q=Christ%20University",
  },
  {
    id: "manipal-university",
    name: "Manipal University",
    location: "Bangalore",
    rating: 4.6,
    image: "/assets/admissionera/colleges/campus-5.jpg",
    courses: ["B.Tech", "BBA", "BCA"],
    fees: "₹3L - ₹8L",
    href: "/search?q=Manipal%20University",
  },
];

function isSameCollege(apiName: string, fallbackName: string) {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z]/g, "");
  return normalize(apiName).includes(normalize(fallbackName));
}

function mergeColleges(apiColleges: CollegeCardData[]) {
  const fallback = colleges.filter(
    (college) => !apiColleges.some((api) => isSameCollege(api.name, college.name))
  );
  return [...apiColleges, ...fallback].slice(0, MAX_CARDS);
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-colors duration-200 ${
        filled ? "fill-current" : "fill-transparent group-hover/fav:fill-current"
      }`}
      aria-hidden
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3 shrink-0 text-[#98A2B3] sm:h-3.5 sm:w-3.5"
      aria-hidden
    >
      <path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CollegeCard({
  college,
  favorite,
  onToggleFavorite,
}: {
  college: CollegeCardData;
  favorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-[14px] border border-[#EAECF0] bg-white p-[5px] shadow-[0_1px_3px_rgba(16,24,40,0.05)] transition duration-200 ease-out hover:-translate-y-[3px] hover:border-[#D0D5DD] hover:shadow-[0_10px_24px_rgba(16,24,40,0.08)] sm:p-1.5">
      <div className="relative">
        <div className="relative h-[112px] overflow-hidden rounded-[11px] bg-[#F2F4F7] sm:h-[135px]">
          <Image
            src={college.image}
            alt={`${college.name} campus`}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 240px"
            className="object-cover transition duration-300 ease-out group-hover:scale-[1.02]"
          />
        </div>

        <button
          type="button"
          onClick={onToggleFavorite}
          aria-pressed={favorite}
          aria-label={
            favorite
              ? `Remove ${college.name} from favorites`
              : `Add ${college.name} to favorites`
          }
          className="group/fav absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-white text-[#DB2777] shadow-[0_2px_8px_rgba(16,24,40,0.12)] transition duration-200 hover:scale-[1.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6] sm:right-2.5 sm:top-2.5 sm:h-[34px] sm:w-[34px]"
        >
          <HeartIcon filled={favorite} />
        </button>

        {college.rating != null ? (
          <span className="absolute -bottom-3 right-2.5 inline-flex items-center gap-1 rounded-full bg-white px-2 py-[3px] text-[11px] font-semibold text-[#16A34A] shadow-[0_2px_8px_rgba(16,24,40,0.12)] sm:text-[12px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" aria-hidden />
            <span className="sr-only">Rating </span>
            {college.rating.toFixed(1)}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3 sm:px-2 sm:pb-2">
        <h3 className="line-clamp-2 text-[13px] font-bold leading-[1.3] text-[#172033] sm:text-[14.5px]">
          {college.name}
        </h3>

        <p className="mt-1.5 flex min-w-0 items-center gap-1 text-[10px] text-[#667085] sm:text-[11.5px]">
          <MapPinIcon />
          <span className="truncate">{college.location}</span>
        </p>

        {college.courses.length > 0 ? (
          <ul className="mt-2.5 flex flex-wrap gap-1 sm:gap-1.5" aria-label="Popular courses">
            {college.courses.slice(0, 3).map((course) => (
              <li
                key={course}
                className="max-w-full truncate rounded-md bg-[#F7F8FA] px-1.5 py-1 text-[9.5px] font-medium leading-none text-[#475467] sm:px-2 sm:py-[5px] sm:text-[10.5px]"
              >
                {course}
              </li>
            ))}
          </ul>
        ) : null}

        {college.fees ? (
          <p className="mt-2.5 text-[10px] leading-snug text-[#667085] sm:text-[11.5px]">
            <span className="font-semibold text-[#344054]">Fees:</span> {college.fees}
          </p>
        ) : null}

        <div className="mt-auto flex gap-1.5 pt-3 sm:gap-2">
          <Link
            href={college.href}
            className="inline-flex h-9 flex-1 items-center justify-center whitespace-nowrap rounded-[7px] bg-[#5B21B6] px-1 text-[10px] font-semibold text-white transition duration-150 hover:bg-[#4C1D95] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6] sm:h-[38px] sm:text-[11px]"
          >
            View College
          </Link>
          <Link
            href={`/compare?university=${encodeURIComponent(college.name)}`}
            aria-label={`Compare ${college.name}`}
            className="inline-flex h-9 flex-1 items-center justify-center whitespace-nowrap rounded-[7px] border border-[#E4E7EC] bg-white px-1 text-[10px] font-semibold text-[#344054] transition duration-150 hover:border-[#5B21B6] hover:bg-[#F9FAFB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6] sm:h-[38px] sm:text-[11px]"
          >
            Compare
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TopUniversitiesSection() {
  const [cards, setCards] = useState<CollegeCardData[]>(colleges);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const universities = await fetchDiscoveryUniversities();
        const top = universities.slice(0, MAX_CARDS);
        const details = await Promise.all(
          top.map((uni) => fetchUniversityCardDetails(uni.uuid).catch(() => null))
        );

        const apiColleges: CollegeCardData[] = top.map((uni, index) => {
          const fallback = colleges.find((college) => isSameCollege(uni.name, college.name));
          const detail = details[index];
          return {
            id: uni.uuid,
            name: uni.name,
            location: uni.state || fallback?.location || "India",
            rating: uni.ratings ?? fallback?.rating ?? null,
            image: uni.banner || fallback?.image || colleges[index % colleges.length].image,
            courses: detail?.courses.length ? detail.courses : fallback?.courses ?? [],
            fees: detail?.fees || fallback?.fees || "",
            href: `/universities/${uni.uuid}`,
          };
        });

        if (!cancelled) setCards(mergeColleges(apiColleges));
      } catch {
        // Keep the curated list when the API is unavailable.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14" aria-labelledby="top-colleges-heading">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#5B21B6]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DB2777]" aria-hidden />
              Top Colleges
            </p>
            <h2
              id="top-colleges-heading"
              className="mt-1.5 text-[22px] font-extrabold leading-[1.15] tracking-tight text-[#172033] sm:text-[25px] lg:text-[28px]"
            >
              Colleges That Match Your Goals
            </h2>
            <p className="mt-1.5 text-[13px] text-[#667085] sm:text-sm">
              Explore top colleges based on your preferred course, location and budget.
            </p>
          </div>

          <Link
            href="/universities"
            className="inline-flex shrink-0 items-center gap-1 self-start text-[12.5px] font-semibold text-[#5B21B6] transition hover:gap-1.5 hover:text-[#DB2777] sm:self-auto sm:pb-1"
          >
            View All Colleges
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5 min-[480px]:gap-3.5 min-[601px]:grid-cols-3 lg:grid-cols-4 lg:gap-4 min-[75rem]:grid-cols-5 min-[75rem]:gap-[18px]">
          {cards.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              favorite={favorites.includes(college.id)}
              onToggleFavorite={() => toggleFavorite(college.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

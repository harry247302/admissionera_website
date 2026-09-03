import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.2 16.2L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MicIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="9" y="4" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 11a5 5 0 0 0 10 0M12 16v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function BookmarkIcon({ filled, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true" {...props}>
      <path
        d="M7 5.5A1.5 1.5 0 0 1 8.5 4h7A1.5 1.5 0 0 1 17 5.5V20l-5-3.2L7 20V5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M10 2.4 12.4 7l5.1.7-3.7 3.6.9 5.1L10 14l-4.7 2.4.9-5.1L2.5 7.7 7.6 7 10 2.4Z" />
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ListIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M8 7h12M8 12h12M8 17h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="5" cy="7" r="1" fill="currentColor" />
      <circle cx="5" cy="12" r="1" fill="currentColor" />
      <circle cx="5" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

export function SlidersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9" cy="8" r="2.2" fill="white" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="15" cy="16" r="2.2" fill="white" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 12.5 9.5 17 19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseSmallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7 7l10 10M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function VerifiedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="8" fill="#4F46E5" />
      <path d="M6.5 10.2 8.8 12.5 13.5 7.8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CategoryGlyph({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
    className: "h-4 w-4",
  };
  if (name === "UG Courses") {
    return (
      <svg {...common}>
        <path d="M4 10 12 6l8 4-8 4-8-4Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7 12v4.2c0 .9 2.2 2.3 5 2.3s5-1.4 5-2.3V12" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (name === "PG Courses") {
    return (
      <svg {...common}>
        <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 9h6M9 13h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "MBA") {
    return (
      <svg {...common}>
        <path d="M4 16V8l4 3 4-5 4 5 4-3v8H4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "MCA") {
    return (
      <svg {...common}>
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 15h.01M12 10l2 2 3-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "Engineering") {
    return (
      <svg {...common}>
        <path d="M14 7a3 3 0 1 0-4 2.8V14l2 3 2-3V9.8A3 3 0 0 0 14 7Z" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (name === "Doctorate") {
    return (
      <svg {...common}>
        <path d="M5 10 12 7l7 3-7 3-7-3Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 12v3.5c0 .8 1.8 2 4 2s4-1.2 4-2V12" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (name === "Executive Education") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M5 19c1.2-3 3.4-4.5 7-4.5S17.8 16 19 19" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (name === "Study Abroad") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4 12h16M12 4c2.5 3 2.5 13 0 16M12 4c-2.5 3-2.5 13 0 16" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (name === "AI / Data Science") {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="16" cy="8" r="2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="16" r="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10 8h4M9.2 9.8 11 14M14.8 9.8 13 14" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (name === "Certifications") {
    return (
      <svg {...common}>
        <circle cx="12" cy="10" r="5" stroke="currentColor" strokeWidth="1.7" />
        <path d="m10.5 10 1.2 1.2 2.3-2.4M10 15l-1.5 4 3.5-1.4L15.5 19 14 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

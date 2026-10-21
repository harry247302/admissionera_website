import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { children?: ReactNode };

function Svg({ children, className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
);

export const ResetIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
  </Svg>
);

export const FilterIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </Svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const CalendarIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3.5 10h17" />
  </Svg>
);

export const PinIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);

export const BriefcaseIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
  </Svg>
);

export const CapIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M2 9.5 12 5l10 4.5L12 14 2 9.5Z" />
    <path d="M6 11.5v4c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-4" />
  </Svg>
);

export const UsersIcon = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8" />
  </Svg>
);

export const ShieldCheckIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </Svg>
);

export const SparkIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
  </Svg>
);

export const WifiIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
    <circle cx="12" cy="19.5" r="0.8" fill="currentColor" />
  </Svg>
);

export const ScaleIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3v18M7 21h10M4 7h16M7 7l-3 7a3 3 0 0 0 6 0L7 7ZM17 7l-3 7a3 3 0 0 0 6 0l-3-7Z" />
  </Svg>
);

export const MailIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </Svg>
);

export const PhoneIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 3h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 5.1 5.1l1.4-2.3L19 13.5V17a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />
  </Svg>
);

export const ChatIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </Svg>
);

export const ClockIcon = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export function StarIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9Z" />
    </svg>
  );
}

export function VerifiedBadge({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="m12 1.8 2.5 1.9 3.1-.2 1 3 2.6 1.7-.9 3 .9 3-2.6 1.7-1 3-3.1-.2L12 22.2l-2.5-1.9-3.1.2-1-3-2.6-1.7.9-3-.9-3 2.6-1.7 1-3 3.1.2L12 1.8Z"
        fill="#440F76"
      />
      <path d="m8.3 12.2 2.4 2.4 5-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

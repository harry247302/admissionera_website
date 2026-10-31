"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { Logo } from "@/components/Logo";

type FooterLink = { label: string; href: string };

const QUICK_LINKS: FooterLink[] = [
  { label: "Colleges", href: "/universities" },
  { label: "Courses", href: "/programs" },
  { label: "Exams", href: "/search?q=Exams" },
  { label: "Scholarships", href: "/search?q=Scholarships" },
  { label: "Blogs", href: "/blogs" },
];

const STUDENT_LINKS: FooterLink[] = [
  { label: "College Compare", href: "/compare" },
  { label: "Eligibility Checker", href: "/#eligibility-checker" },
  { label: "Admission Guidance", href: "/tools" },
  { label: "Application Process", href: "/search?q=Application%20Process" },
];

const ABOUT_LINKS: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const SOCIAL_LINKS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/admissionera",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/admissionera",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21h-4V9.5Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@AdmissionEra",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.4 3.1-5.4 3.1Z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/admissionera",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
        <path d="M23 5.1a9 9 0 0 1-2.6.7 4.5 4.5 0 0 0 2-2.5 9 9 0 0 1-2.9 1.1 4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 2.5 3.8a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4 4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 18.8a12.8 12.8 0 0 0 6.9 2c8.3 0 12.8-6.9 12.8-12.8v-.6A9.2 9.2 0 0 0 23 5.1Z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) {
      setNote("Enter a valid email address.");
      return;
    }
    setNote("Thanks. This preview only confirms the address in your browser.");
    setEmail("");
  };

  return (
    <footer className="mt-auto bg-white">
      <div className="era-shell grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,0.95fr)_minmax(0,1.55fr)] lg:gap-6">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-2 max-w-[280px] text-[12.5px] leading-5 text-[#667085]">
            Your trusted platform for college discovery, comparison and admission guidance.
          </p>
          <ul className="mt-4 flex items-center gap-6" aria-label="Social media">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex text-[#1B1446] transition hover:text-[#F20D70]"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Quick Links" links={QUICK_LINKS} />
        <FooterColumn title="For Students" links={STUDENT_LINKS} />
        <FooterColumn title="About" links={ABOUT_LINKS} />

        <form onSubmit={onSubmit} noValidate className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="footer-email" className="block text-[13.5px] font-bold text-[#1B1446]">
            Newsletter
          </label>
          <p className="mt-1 text-[12px] text-[#667085]">Get the latest updates and admission alerts.</p>
          <div className="mt-3 flex items-center gap-2">
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="h-11 min-w-0 flex-1 rounded-lg border border-[#ECEEF3] bg-white px-3.5 text-[12.5px] text-[#1B1446] outline-none transition placeholder:text-[#667085] focus:border-[#F20D70]"
            />
            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F20D70] text-white shadow-[0_6px_14px_rgba(242,13,112,0.3)] transition hover:bg-[#D40B62] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F20D70]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden>
                <path d="M22 2 11 13" strokeLinecap="round" />
                <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
              </svg>
            </button>
          </div>
          {note ? (
            <p className="mt-2 text-[12px] text-[#667085]" role="status">
              {note}
            </p>
          ) : null}
        </form>
      </div>
      <div className="border-t border-[#F1ECFF]">
        <p className="era-shell py-4 text-xs text-[#667085]">
          &copy; {new Date().getFullYear()} AdmissionEra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="text-[13.5px] font-bold text-[#1B1446]">{title}</p>
      <ul className="mt-2.5 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-[12.5px] text-[#667085] transition hover:text-[#F20D70]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

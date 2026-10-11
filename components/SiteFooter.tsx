"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/Logo";

const QUICK_LINKS = [
  { label: "Colleges", href: "/universities" },
  { label: "Courses", href: "/programs" },
  { label: "Compare", href: "/compare" },
  { label: "Tools", href: "/tools" },
];

const STUDENT_LINKS = [
  { label: "Course Finder", href: "/tools/course-finder" },
  { label: "Scholarships", href: "/search?q=Scholarships" },
  { label: "Exams", href: "/search?q=Exams" },
  { label: "Study Abroad", href: "/programs/study-abroad" },
];

const ABOUT_LINKS = [
  { label: "About", href: "/about" },
  { label: "Admission Guidance", href: "/tools" },
  { label: "Resources", href: "/about" },
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
    <footer className="mt-auto border-t border-[#F1ECFF] bg-white">
      <div className="era-shell grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-[13px] leading-6 text-[#6B6280]">
            Helping students compare colleges, courses and careers with clearer guidance.
          </p>
          <a
            href="https://www.youtube.com/@AdmissionEra"
            className="mt-3 inline-flex text-[13px] font-semibold text-[#35066F] hover:text-[#F20D70]"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
        </div>
        <FooterColumn title="Quick Links" links={QUICK_LINKS} />
        <FooterColumn title="For Students" links={STUDENT_LINKS} />
        <div>
          <FooterColumn title="About" links={ABOUT_LINKS} />
          <form onSubmit={onSubmit} className="mt-4">
            <label htmlFor="footer-email" className="text-[13px] font-semibold text-[#35066F]">
              Newsletter
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="h-10 min-w-0 flex-1 rounded-lg border border-[#EFE6F5] px-3 text-[13px] outline-none focus:border-[#35066F]"
              />
              <button type="submit" className="h-10 rounded-lg bg-[#35066F] px-3 text-[12px] font-semibold text-white">
                Join
              </button>
            </div>
            {note ? <p className="mt-2 text-[12px] text-[#6B6280]">{note}</p> : null}
          </form>
        </div>
      </div>
      <div className="border-t border-[#F1ECFF]">
        <p className="era-shell py-4 text-xs text-[#6B6280]">
          © {new Date().getFullYear()} AdmissionEra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[13px] font-bold text-[#35066F]">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-[13px] text-[#6B6280] transition hover:text-[#F20D70]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

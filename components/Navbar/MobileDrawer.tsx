"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ChevronDownIcon, CloseIcon, SparkleIcon, UserIcon } from "@/components/icons";
import { DRAWER_SECTIONS } from "@/lib/navigation";
import { NAV_ICONS, PRIMARY_NAV } from "@/components/Navbar/navConfig";
import { SearchOverlay } from "@/components/Search/SearchOverlay";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const titleId = useId();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const visibleSection = open ? openSection : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu"
        className={`absolute inset-0 bg-[#17172A]/35 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute left-3 right-3 top-[84px] mx-auto flex max-h-[min(78vh,720px)] w-auto max-w-[1400px] flex-col overflow-hidden rounded-2xl border border-[#EEE7F5] bg-white shadow-[0_18px_50px_rgba(106,27,154,0.14)] transition-all duration-200 ease-out sm:left-4 sm:right-4 lg:left-6 lg:right-6 ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
        aria-hidden={!open}
        aria-labelledby={titleId}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-14 items-center justify-between border-b border-[#EEE7F5] px-4">
          <p id={titleId} className="text-sm font-semibold text-[#17172A]">
            Browse Admission Era
          </p>
          <button
            type="button"
            className="nav-icon-btn"
            aria-label="Close menu"
            onClick={onClose}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="mb-4 lg:hidden">
            <SearchOverlay variant="mobile" onNavigate={onClose} />
          </div>

          <nav aria-label="Site sections">
            <ul className="space-y-1">
              {PRIMARY_NAV.map((item) => {
                const Icon = NAV_ICONS[item.label];
                const active = isActive(item.href);

                return item.children ? (
                  <li key={item.label}>
                    <button
                      type="button"
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-medium ${active ? "bg-[#FFF0F7] text-[#FF2D8E]" : "text-[#17172A] hover:bg-[#F4EEFF]"}`}
                      aria-expanded={visibleSection === item.label}
                      onClick={() =>
                        setOpenSection((current) =>
                          current === item.label ? null : item.label,
                        )
                      }
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      <span className="flex-1">{item.label}</span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${visibleSection === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ${visibleSection === item.label ? "grid-rows-[1fr] pb-2" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <Link
                          href={item.href}
                          className="block rounded-xl px-3 py-2 pl-11 text-sm font-medium text-[#FF2D8E]"
                          onClick={onClose}
                        >
                          View all
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-xl px-3 py-2 pl-11 text-sm text-[#17172A] hover:bg-[#F4EEFF]"
                            onClick={onClose}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium ${active ? "bg-[#FFF0F7] text-[#FF2D8E]" : "text-[#17172A] hover:bg-[#F4EEFF]"}`}
                      aria-current={active ? "page" : undefined}
                      onClick={onClose}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 hidden lg:block">
              {DRAWER_SECTIONS.map((section) => (
                <div key={section.title} className="mt-5">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#55556A]">
                    {section.title}
                  </p>
                  <ul className="space-y-1">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="block rounded-xl px-3 py-2 text-sm text-[#17172A] hover:bg-[#F4EEFF]"
                          onClick={onClose}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#EEE7F5] p-4 sm:flex-row sm:items-center">
          <Link
            href="/compare"
            className="ai-cta justify-center sm:flex-1"
            onClick={onClose}
          >
            <span className="ai-cta-icon">
              <SparkleIcon className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[12px] font-semibold text-[#FF2D8E]">
                AI-Powered
              </span>
              <span className="block text-[11px] font-medium text-[#55556A]">
                Compare in 2 mins
              </span>
            </span>
          </Link>
          <Link href="/signin" className="nav-signin sm:flex-1" onClick={onClose}>
            <UserIcon className="h-4 w-4" />
            Sign In
          </Link>
        </div>
      </aside>
    </div>
  );
}

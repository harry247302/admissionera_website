"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import type { NavLink } from "@/lib/navigation";
import { ChevronDownIcon } from "@/components/icons";

type DropdownMenuProps = {
  id: string;
  label: string;
  href: string;
  items: NavLink[];
  open: boolean;
  active?: boolean;
  icon?: ReactNode;
  onOpen: () => void;
  onClose: () => void;
};

export function DropdownMenu({
  id,
  label,
  href,
  items,
  open,
  active = false,
  icon,
  onOpen,
  onClose,
}: DropdownMenuProps) {
  const wrapRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | null>(null);

  const clearTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleEnter = () => {
    clearTimer();
    onOpen();
  };

  const handleLeave = () => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => onClose(), 160);
  };

  useEffect(() => () => clearTimer(), []);

  return (
    <li
      ref={wrapRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className={`nav-link ${active ? "is-active" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={id}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {icon}
        {label}
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={id}
        className={`nav-dropdown ${open ? "nav-dropdown-open" : ""}`}
        role="menu"
        aria-label={label}
        aria-hidden={!open}
        inert={!open}
      >
        <Link
          href={href}
          className="mb-1 block rounded-xl px-3 py-2 text-[13px] font-semibold text-[#FF2D8E] hover:bg-[#FFF0F7]"
          role="none"
          onClick={onClose}
        >
          View all {label.toLowerCase()}
        </Link>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            className="block rounded-xl px-3 py-2.5 hover:bg-[#F4EEFF]"
            onClick={onClose}
          >
            <span className="block text-[14px] font-medium text-[#17172A]">
              {item.label}
            </span>
            {item.description ? (
              <span className="mt-0.5 block text-[12px] leading-4 text-[#55556A]">
                {item.description}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </li>
  );
}

"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";

type FilterDropdownProps = {
  label: string;
  count?: number;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
};

export function FilterDropdown({
  label,
  count = 0,
  open,
  onOpen,
  onClose,
  children,
}: FilterDropdownProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) onClose();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        className={`cd-chip ${open || count > 0 ? "is-active" : ""}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {label}
        {count > 0 ? <span className="cd-count">{count}</span> : null}
        <ChevronDownIcon className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div id={id} className="cd-popover" role="dialog" aria-label={label}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

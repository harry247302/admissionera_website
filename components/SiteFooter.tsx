import Link from "next/link";
import { Logo } from "@/components/Logo";
import { NAV_ITEMS } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            Helping students choose courses, universities and careers with
            clearer data and calmer decisions.
          </p>
        </div>
        {NAV_ITEMS.filter((item) => item.children).map((item) => (
          <div key={item.label}>
            <p className="text-sm font-semibold text-navy">{item.label}</p>
            <ul className="mt-3 space-y-2">
              {item.children?.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="text-sm text-muted hover:text-navy"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-4 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <p>© {new Date().getFullYear()} AdmissionEra. All rights reserved.</p>
          <p>Guidance for students, families and counsellors.</p>
        </div>
      </div>
    </footer>
  );
}

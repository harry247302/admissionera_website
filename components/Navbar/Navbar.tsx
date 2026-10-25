"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { MenuIcon } from "@/components/icons";
import { PRIMARY_NAV, NAV_ICONS } from "@/components/Navbar/navConfig";
import { DropdownMenu } from "@/components/Navbar/DropdownMenu";
import { MobileDrawer } from "@/components/Navbar/MobileDrawer";
import {
  MobileSearchButton,
  MobileSearchPanel,
  SearchOverlay,
} from "@/components/Search/SearchOverlay";
import { useAuth } from "@/components/auth/AuthProvider";

export function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("[data-nav-root]")) {
        setOpenMenu(null);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    const onScroll = () => setScrolled(window.scrollY > 8);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header sticky top-0 z-50">
      <div
        data-nav-root
        className={`site-header-bar mx-auto flex h-[64px] max-w-[1400px] items-center gap-2 px-3 sm:h-[72px] sm:gap-3 sm:px-4 lg:h-[78px] lg:gap-4 lg:px-6 ${scrolled ? "is-scrolled" : ""}`}
      >
        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <Logo className="shrink-0" preload />
          <button
            type="button"
            className="nav-icon-btn hidden lg:inline-flex"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="site-menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="hidden min-w-0 flex-1 justify-center lg:flex" aria-label="Primary">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {PRIMARY_NAV.map((item) => {
              const Icon = NAV_ICONS[item.label];
              const icon = Icon ? <Icon className="h-4 w-4" /> : null;
              const active = isActive(item.href);

              return item.children ? (
                <DropdownMenu
                  key={item.label}
                  id={`menu-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                  label={item.label}
                  href={item.href}
                  items={item.children}
                  icon={icon}
                  active={active}
                  open={openMenu === item.label}
                  onOpen={() => setOpenMenu(item.label)}
                  onClose={() =>
                    setOpenMenu((current) =>
                      current === item.label ? null : current,
                    )
                  }
                />
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`nav-link ${active ? "is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
          {loading ? (
            <span className="hidden h-9 w-[88px] rounded-lg bg-[#F1ECFF] sm:inline-flex" aria-hidden />
          ) : user ? (
            <span className="hidden max-w-[180px] truncate rounded-lg bg-[#F1ECFF] px-3.5 py-2 text-[13px] font-semibold text-[#35066F] sm:inline-flex">
              {user.name || user.email}
            </span>
          ) : (
            <>
              <Link
                href="/signin"
                className="hidden h-9 items-center rounded-lg border border-[#35066F] px-3.5 text-[13px] font-semibold text-[#35066F] transition hover:bg-[#F1ECFF] sm:inline-flex"
              >
                Login
              </Link>
              <Link
                href="/signin"
                className="hidden h-9 items-center rounded-lg bg-[#35066F] px-3.5 text-[13px] font-semibold text-white transition hover:bg-[#4A0A96] sm:inline-flex"
              >
                Register
              </Link>
            </>
          )}

          <div className="hidden lg:block">
            <SearchOverlay />
          </div>
          <MobileSearchButton onOpen={() => setMobileSearchOpen(true)} />

          <button
            type="button"
            className="nav-icon-btn lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="site-menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div id="site-menu">
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
      <MobileSearchPanel
        open={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
      />
    </header>
  );
}

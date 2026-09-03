import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  preload?: boolean;
};

export function Logo({ className = "", preload = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2D8E] ${className}`}
      aria-label="Admission Era home"
    >
      <Image
        src="/logo.png"
        alt="Admission Era — Empowering Education"
        width={360}
        height={100}
        className="h-10 w-[150px] object-cover object-center sm:h-11 sm:w-[165px] lg:h-12 lg:w-[180px]"
        preload={preload}
      />
    </Link>
  );
}

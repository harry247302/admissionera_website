import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

export default function BlogNotFound() {
  return (
    <main
      id="main"
      className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-4 py-20 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-era-lilac text-era-primary shadow-xs">
        <BookOpen className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#17134A]">
        Article Not Found
      </h1>
      <p className="mt-3 max-w-md text-base text-slate-600">
        The blog post you&apos;re looking for doesn&apos;t exist or may have
        been removed. Browse our other articles to find what you need.
      </p>
      <Link
        href="/blogs"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-era-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-era-secondary active:scale-95"
      >
        <ArrowLeft className="h-4 w-4" />
        Browse All Articles
      </Link>
    </main>
  );
}


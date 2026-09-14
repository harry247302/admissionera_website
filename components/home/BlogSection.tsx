import Image from "next/image";
import Link from "next/link";
import { SectionEyebrow, SectionHeading, SectionLead } from "./SectionHeading";

const POSTS = [
  {
    category: "Career Guidance",
    title: "Top Career Options After 12th",
    date: "Aug 25, 2025",
    image: "/hero/slide-1.png",
    href: "/about",
  },
  {
    category: "College Insights",
    title: "How to Choose the Right College for Your Future",
    date: "Aug 20, 2025",
    image: "/hero/slide-2.png",
    href: "/about",
  },
  {
    category: "Admission Tips",
    title: "Step-by-Step Guide to the Admission Process",
    date: "Aug 18, 2025",
    image: "/hero/slide-3.png",
    href: "/about",
  },
];

export function BlogSection() {
  return (
    <section className="bg-era-lavender/60 py-16 lg:py-24">
      <div className="era-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>Latest from our blog</SectionEyebrow>
            <SectionHeading className="mt-3">Stay Updated</SectionHeading>
            <SectionLead>
              Get the latest news, tips and guidance to make informed decisions about your education.
            </SectionLead>
          </div>
          <Link href="/about" className="era-link shrink-0">
            View All Posts <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="era-card-lift overflow-hidden rounded-[1.75rem] border border-violet-100 bg-white shadow-[0_12px_30px_rgba(23,19,74,0.05)]"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <span className="inline-flex rounded-full bg-era-lilac px-3 py-1 text-xs font-semibold text-era-primary">
                  {post.category}
                </span>
                <h3 className="mt-3 text-lg font-bold tracking-[-0.02em] text-era-dark">
                  {post.title}
                </h3>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">{post.date}</p>
                  <Link href={post.href} className="era-link text-sm">
                    Read More <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

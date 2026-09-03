import Link from "next/link";

export const metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <main
      id="main"
      className="flex flex-1 items-start justify-center bg-surface px-4 py-16"
    >
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-8">
        <h1 className="text-2xl font-bold tracking-[-0.03em] text-navy">
          Sign in to AdmissionEra
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Save shortlists, compare universities and pick up your guidance where
          you left off.
        </p>
        <form className="mt-6 space-y-4" action="/signin">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="search-field h-11 w-full px-3"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-navy"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="search-field h-11 w-full px-3"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          New here?{" "}
          <Link href="/" className="font-semibold text-brand hover:underline">
            Continue exploring
          </Link>
        </p>
      </div>
    </main>
  );
}

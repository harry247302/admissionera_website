"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { loginWithEmail, registerAccount } from "@/lib/auth";

const COURSES = ["BCA", "BBA", "B.Com", "B.Tech", "BA", "MBA", "MCA", "M.Com", "MA", "M.Tech"];

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;

const BOX =
  "flex h-12 w-full items-center rounded-xl border border-[#E3E7EF] bg-white transition focus-within:border-[#2F5BEA] focus-within:ring-2 focus-within:ring-[#2F5BEA]/15";
const BOX_ERROR = "border-[#F04438]";
const INPUT =
  "h-full min-w-0 flex-1 bg-transparent pr-3 text-[13.5px] text-[#101828] outline-none placeholder:text-[#98A2B3]";

type Errors = Partial<Record<"name" | "phone" | "email" | "course" | "dob" | "state" | "password", string>>;

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="flex w-11 shrink-0 justify-center text-[#667085]" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        {children}
      </svg>
    </span>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none mr-4 h-4 w-4 shrink-0 text-[#475467]" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
  below,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  below?: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13.5px] font-medium text-[#101828]">
        {label}
        {hint ? <span className="ml-1 text-[12px] font-normal text-[#667085]">{hint}</span> : null}
      </label>
      {children}
      {below}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[12px] text-[#D92D20]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function IndiaFlag() {
  return (
    <svg viewBox="0 0 30 20" className="h-[15px] w-[22px] rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" aria-hidden>
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.67" fill="#FF9933" />
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      <circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" strokeWidth="0.8" />
    </svg>
  );
}

const ASSURANCES: { title: string; icon: ReactNode }[] = [
  {
    title: "100% Refund Support",
    icon: (
      <>
        <path d="M20 12a8 8 0 1 1-2.4-5.7" />
        <path d="M20 4v4h-4" />
        <path d="M9.5 9h5M9.5 11.5h5M12.5 9c1.6 0 1.6 3 0 3h-2l3 3.5" />
      </>
    ),
  },
  {
    title: "5 Days Fees Increase Lock",
    icon: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" stroke="none" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    title: "Post Admission Support",
    icon: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" fill="currentColor" stroke="none" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" fill="currentColor" stroke="none" />
        <path d="M19 19c0 1.5-2 2.5-5 2.5" />
      </>
    ),
  },
];

const submitClass =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2F5BEA] text-[14.5px] font-semibold text-white shadow-[0_10px_22px_rgba(47,91,234,0.28)] transition hover:bg-[#2449C9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5BEA] disabled:cursor-not-allowed disabled:opacity-70";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function errorProps(id: string, error?: string) {
  return {
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}

export function SignupCard() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [form, setForm] = useState({
    name: "",
    coupon: "",
    phone: "",
    email: "",
    course: "",
    dob: "",
    state: "",
    password: "",
  });
  const [assured, setAssured] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [couponNote, setCouponNote] = useState("");
  const [status, setStatus] = useState("");
  const [statusKind, setStatusKind] = useState<"info" | "error">("info");
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const switchMode = (next: "signup" | "login") => {
    setMode(next);
    setErrors({});
    setStatus("");
    setStatusKind("info");
  };

  const applyCoupon = () => {
    const code = form.coupon.trim();
    setCouponNote(code ? `Coupon "${code.toUpperCase()}" will be checked by your counsellor.` : "Enter a coupon code first.");
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (!EMAIL_PATTERN.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (mode === "login") {
      if (!form.password) next.password = "Enter your password.";
    } else {
      if (!form.name.trim()) next.name = "Enter your full name.";
      if (!PHONE_PATTERN.test(form.phone)) next.phone = "Enter a valid 10-digit mobile number.";
      if (!form.course) next.course = "Select a course.";
      if (!form.dob) next.dob = "Enter your date of birth.";
      if (!form.state) next.state = "Select your state.";
      if (form.password.length < 6) next.password = "Password must be at least 6 characters.";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("");
      return;
    }

    setSubmitting(true);
    setStatus("");
    try {
      const result =
        mode === "login"
          ? await loginWithEmail(form.email, form.password)
          : await registerAccount({
              name: form.name,
              email: form.email,
              phone_number: form.phone,
              course: form.course,
              dob: form.dob,
              state: form.state,
              password: form.password,
              role: "user",
            });
      setStatusKind("info");
      setStatus(result.message || (mode === "login" ? "Login successful" : "Registration successful"));
      await refreshUser();
      router.push("/");
      router.refresh();
    } catch (error) {
      setStatusKind("error");
      setStatus(error instanceof Error ? error.message : mode === "login" ? "Unable to sign in." : "Unable to create account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-[28px] bg-white px-5 py-6 shadow-[0_24px_60px_rgba(40,60,140,0.10)] sm:px-8 sm:py-7">
      <p className="text-right text-[13px] text-[#475467]">
        {mode === "signup" ? "Already have an account?" : "New to AdmissionEra?"}{" "}
        <button
          type="button"
          onClick={() => switchMode(mode === "signup" ? "login" : "signup")}
          className="font-semibold text-[#2F5BEA] hover:underline"
        >
          {mode === "signup" ? "Sign In" : "Sign Up"}
        </button>
      </p>

      <div className="mt-3 sm:px-4">
        <h1 className="text-[26px] font-extrabold tracking-tight text-[#101828] sm:text-[30px]">
          {mode === "signup" ? "Sign up to get started" : "Welcome back"}
        </h1>
        <p className="mt-1 text-[14.5px] text-[#475467]">
          {mode === "signup" ? "Create your account on AdmissionEra" : "Sign in to continue your journey"}
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
        {mode === "signup" ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-3">
              <Field id="name" label="Full Name" error={errors.name}>
                <div className={`${BOX} ${errors.name ? BOX_ERROR : ""}`}>
                  <Icon>
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                  </Icon>
                  <input
                    id="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => update("name")(event.target.value)}
                    placeholder="Enter your full name"
                    className={INPUT}
                    {...errorProps("name", errors.name)}
                  />
                </div>
              </Field>

              {/* <Field id="coupon" label="Apply Coupon" hint="(Optional)">
                <div className={`${BOX} pr-1.5`}>
                  <Icon>
                    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
                    <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" />
                  </Icon>
                  <input
                    id="coupon"
                    value={form.coupon}
                    onChange={(event) => {
                      update("coupon")(event.target.value);
                      setCouponNote("");
                    }}
                    placeholder="Have a coupon code?"
                    className={INPUT}
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="h-9 shrink-0 rounded-lg bg-[#EEF2FF] px-4 text-[13px] font-semibold text-[#2F5BEA] transition hover:bg-[#E0E7FF]"
                  >
                    Apply
                  </button>
                </div>
                {couponNote ? <p className="mt-1.5 text-[12px] text-[#475467]">{couponNote}</p> : null}
              </Field> */}

              <Field
                id="phone"
                label="Phone Number"
                error={errors.phone}
                below={
                  errors.phone ? null : (
                    <span className="ml-[74px] mt-1 inline-flex items-center gap-1 rounded-full bg-[#E7F8EE] px-2 py-0.5 text-[10.5px] font-medium text-[#16803C]">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
                        <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1.2 13.6-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6Z" />
                      </svg>
                      We don&apos;t spam
                    </span>
                  )
                }
              >
                <div className={`${BOX} ${errors.phone ? BOX_ERROR : ""}`}>
                  <span className="flex h-full shrink-0 items-center gap-2 border-r border-[#E3E7EF] pl-3.5 pr-3 text-[13.5px] text-[#101828]">
                    <IndiaFlag />
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    value={form.phone}
                    onChange={(event) => update("phone")(event.target.value.replace(/\D/g, ""))}
                    placeholder="Enter phone number"
                    className={`${INPUT} pl-3`}
                    {...errorProps("phone", errors.phone)}
                  />
                </div>
              </Field>

              <EmailField value={form.email} onChange={update("email")} error={errors.email} />
            </div>

            <Field id="course" label="Select Course" error={errors.course}>
              <div className={`${BOX} relative ${errors.course ? BOX_ERROR : ""}`}>
                <Icon>
                  <path d="M2 9.5 12 5l10 4.5L12 14 2 9.5Z" />
                  <path d="M6 11.5v4c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-4" />
                </Icon>
                <select
                  id="course"
                  value={form.course}
                  onChange={(event) => update("course")(event.target.value)}
                  className={`${INPUT} cursor-pointer appearance-none ${form.course ? "" : "text-[#98A2B3]"}`}
                  {...errorProps("course", errors.course)}
                >
                  <option value="">Select course</option>
                  {COURSES.map((course) => (
                    <option key={course} value={course} className="text-[#101828]">
                      {course}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-3">
              <Field id="dob" label="Date of Birth" error={errors.dob}>
                <div className={`${BOX} ${errors.dob ? BOX_ERROR : ""}`}>
                  <Icon>
                    <rect x="3.5" y="5" width="17" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3.5 10h17" />
                  </Icon>
                  <input
                    id="dob"
                    type="date"
                    value={form.dob}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(event) => update("dob")(event.target.value)}
                    className={`${INPUT} ${form.dob ? "" : "text-[#98A2B3]"}`}
                    {...errorProps("dob", errors.dob)}
                  />
                </div>
              </Field>

              <Field id="state" label="State" error={errors.state}>
                <div className={`${BOX} ${errors.state ? BOX_ERROR : ""}`}>
                  <Icon>
                    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </Icon>
                  <select
                    id="state"
                    value={form.state}
                    onChange={(event) => update("state")(event.target.value)}
                    className={`${INPUT} cursor-pointer appearance-none ${form.state ? "" : "text-[#98A2B3]"}`}
                    {...errorProps("state", errors.state)}
                  >
                    <option value="">Select state</option>
                    {STATES.map((state) => (
                      <option key={state} value={state} className="text-[#101828]">
                        {state}
                      </option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </Field>
            </div>

            <PasswordField
              value={form.password}
              onChange={update("password")}
              error={errors.password}
              autoComplete="new-password"
            />

            <fieldset className="rounded-2xl border border-[#BFD0FB] bg-[#F5F8FF] px-4 py-4">
              <legend className="sr-only">AdmissionEra Assured</legend>
              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2.5 text-[14px] font-semibold text-[#1D3FAF]">
                  <input
                    type="checkbox"
                    checked={assured}
                    onChange={(event) => setAssured(event.target.checked)}
                    className="h-[18px] w-[18px] rounded accent-[#2F5BEA]"
                  />
                  AdmissionEra Assured
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                    <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z" fill="#2F5BEA" />
                    <path d="M12 4.3 6 6.6v4.6c0 3.9 2.6 7.6 6 8.7 3.4-1.1 6-4.8 6-8.7V6.6l-6-2.3Z" fill="#F4B400" />
                    <path d="m9 12 2 2 4-4" fill="none" stroke="#1D3FAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </label>
                <Link href="/about" className="shrink-0 text-[12.5px] font-medium text-[#2F5BEA] underline-offset-2 hover:underline">
                  Learn more →
                </Link>
              </div>
              <ul className="mt-4 grid grid-cols-1 gap-3 min-[460px]:grid-cols-3 min-[460px]:divide-x min-[460px]:divide-[#D6E0FA]">
                {ASSURANCES.map((item) => (
                  <li key={item.title} className="flex items-center gap-2.5 min-[460px]:px-3 min-[460px]:first:pl-0 min-[460px]:last:pr-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3EAFE] text-[#2F5BEA]" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        {item.icon}
                      </svg>
                    </span>
                    <span className="text-[12px] leading-[1.35] text-[#344054]">{item.title}</span>
                  </li>
                ))}
              </ul>
            </fieldset>

            <div className="flex items-center gap-4 rounded-2xl bg-[#F4F6FB] px-4 py-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2F5BEA] to-[#7C3AED] text-[15px] font-bold text-white" aria-hidden>
                AE
              </span>
              <p className="text-[12.5px] italic leading-5 text-[#475467]">
                <span className="mr-1 text-[20px] font-bold not-italic leading-none text-[#9DB3F5]">“</span>
                An AdmissionEra-trained counsellor will call you first. Every advisor here is trained by our Board of Mentors.
                <span className="ml-1 text-[20px] font-bold not-italic leading-none text-[#9DB3F5]">”</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <EmailField value={form.email} onChange={update("email")} error={errors.email} />
            <PasswordField
              value={form.password}
              onChange={update("password")}
              error={errors.password}
              autoComplete="current-password"
            />
          </>
        )}

        <button type="submit" className={submitClass} disabled={submitting}>
          {mode === "signup"
            ? submitting
              ? "Creating account..."
              : "Create Account"
            : submitting
              ? "Signing in..."
              : "Sign In"}
          <ArrowIcon />
        </button>

        {status ? (
          <p
            role="status"
            className={`rounded-xl px-3 py-2 text-center text-[12.5px] ${
              statusKind === "error"
                ? "bg-[#FEF3F2] text-[#D92D20]"
                : "bg-[#EEF2FF] text-[#1D3FAF]"
            }`}
          >
            {status}
          </p>
        ) : null}

        <p className="text-center text-[12px] text-[#475467]">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-[#1D3FAF] underline underline-offset-2">
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="text-[#1D3FAF] underline underline-offset-2">
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
}

function PasswordField({
  value,
  onChange,
  error,
  autoComplete,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete: string;
}) {
  return (
    <Field id="password" label="Password" error={error}>
      <div className={`${BOX} ${error ? BOX_ERROR : ""}`}>
        <Icon>
          <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" />
          <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
        </Icon>
        <input
          id="password"
          type="password"
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter your password"
          className={INPUT}
          {...errorProps("password", error)}
        />
      </div>
    </Field>
  );
}

function EmailField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <Field id="email" label="Email Address" error={error}>
      <div className={`${BOX} ${error ? BOX_ERROR : ""}`}>
        <Icon>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3.5 6.5 8.5 6 8.5-6" />
        </Icon>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter your email"
          className={INPUT}
          {...errorProps("email", error)}
        />
      </div>
    </Field>
  );
}

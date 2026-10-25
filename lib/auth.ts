const AUTH_API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "https://backend.admissionera.com";

export const LOGIN_API_URL = `${AUTH_API_BASE}/api/auth/login`;
export const REGISTER_API_URL = `${AUTH_API_BASE}/api/auth/register`;
export const VERIFY_USER_API_URL = `${AUTH_API_BASE}/api/auth/verify-user`;

export type AuthUser = {
  id?: string;
  name: string;
  email: string;
  role: string;
  phone_number?: string;
  course?: string;
  dob?: string;
  state?: string;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
};

type AuthResponse = {
  success?: boolean;
  message?: string;
  user?: AuthUser;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone_number: string;
  course: string;
  dob: string;
  state: string;
  password: string;
  role?: "user";
};

export async function loginWithEmail(email: string, password: string) {
  const res = await fetch(LOGIN_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email: email.trim(), password }),
  });

  const payload = (await res.json().catch(() => ({}))) as AuthResponse;

  if (!res.ok || !payload.user) {
    throw new Error(payload.message || `Unable to sign in (${res.status})`);
  }

  return payload;
}

export async function registerAccount(input: RegisterPayload) {
  const res = await fetch(REGISTER_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: input.name.trim(),
      email: input.email.trim(),
      phone_number: input.phone_number,
      course: input.course,
      dob: input.dob,
      state: input.state,
      password: input.password,
      role: input.role || "user",
    }),
  });

  const payload = (await res.json().catch(() => ({}))) as AuthResponse;

  if (!res.ok || payload.success === false || !payload.user) {
    throw new Error(payload.message || `Unable to create account (${res.status})`);
  }

  return payload;
}

function toAuthUser(value: unknown): AuthUser | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.email !== "string" || !row.email) return null;
  return {
    id: row.id == null ? undefined : String(row.id),
    name: typeof row.name === "string" ? row.name : "",
    email: row.email,
    role: typeof row.role === "string" ? row.role : "user",
    phone_number: typeof row.phone_number === "string" ? row.phone_number : undefined,
    course: typeof row.course === "string" ? row.course : undefined,
    dob: typeof row.dob === "string" ? row.dob : undefined,
    state: typeof row.state === "string" ? row.state : undefined,
    createdAt: typeof row.createdAt === "string" ? row.createdAt : undefined,
    updatedAt: typeof row.updatedAt === "string" ? row.updatedAt : undefined,
    created_at: typeof row.created_at === "string" ? row.created_at : undefined,
    updated_at: typeof row.updated_at === "string" ? row.updated_at : undefined,
  };
}

export async function verifyCurrentUser() {
  console.log(VERIFY_USER_API_URL,"++++++++++++++++++++++++");
  const res = await fetch(VERIFY_USER_API_URL, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) return null;
  
  const payload = (await res.json().catch(() => ({}))) as { user?: unknown };
  console.log(payload,"++++++++++++++++++++++++");
  return toAuthUser(payload.user);
}

import { validateLogin, type LoginResponse } from "@/lib/types";

// MOCK authentication for the prototype. Credentials live only on the server.
const DEMO_EMAIL = "guardian@medalert.demo";
const DEMO_PASSWORD = "guardian123";

function respond(body: LoginResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return respond({ ok: false, code: "bad_request", message: "Invalid request." }, 400);
  }

  const { email, password } = (body ?? {}) as { email?: unknown; password?: unknown };
  if (typeof email !== "string" || typeof password !== "string") {
    return respond({ ok: false, code: "bad_request", message: "Invalid request." }, 400);
  }

  const errors = validateLogin(email, password);
  if (errors.email || errors.password) {
    return respond(
      { ok: false, code: "validation", message: "Check the highlighted fields.", errors },
      400,
    );
  }

  if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return respond(
      {
        ok: false,
        code: "invalid_credentials",
        message: "That email and password don’t match. Please check them and try again.",
      },
      401,
    );
  }

  return respond({ ok: true, redirectTo: "/guardian" }, 200);
}

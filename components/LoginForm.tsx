"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, Check, Loader2, ShieldCheck } from "lucide-react";
import { validateLogin, type LoginResponse } from "@/lib/types";

type Status = "idle" | "loading" | "success";
type FieldErrors = { email?: string; password?: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="flex items-start gap-2 text-[16px] font-medium leading-snug text-red-text">
      <AlertCircle size={20} strokeWidth={1.9} className="mt-px shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function LoginForm() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const busy = status !== "idle";
  const credentialsRejected = formError !== null;

  function clear(field: keyof FieldErrors) {
    setErrors((e) => ({ ...e, [field]: undefined }));
    setFormError(null);
  }

  function focusFirst(e: FieldErrors) {
    (e.email ? emailRef : passwordRef).current?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    setFormError(null);
    const local = validateLogin(email, password);
    setErrors(local);
    if (local.email || local.password) {
      focusFirst(local);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as LoginResponse;

      if (data.ok) {
        setStatus("success");
        router.push(data.redirectTo);
        return;
      }
      setStatus("idle");
      if (data.code === "validation" && data.errors) {
        setErrors(data.errors);
        focusFirst(data.errors);
      } else {
        setFormError(data.message);
      }
    } catch {
      setStatus("idle");
      setFormError(GENERIC_ERROR);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-[20px] font-bold text-blue">
          <ShieldCheck size={26} strokeWidth={1.8} aria-hidden="true" />
          Guardian
        </div>
        <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.02em]">Welcome back</h1>
        <p className="text-[18px] leading-normal text-ink-2">Sign in to check on your loved ones.</p>
      </div>

      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6" aria-busy={busy}>
        {formError && (
          <div id="form-error" role="alert" className="flex items-start gap-3 rounded-[14px] bg-red-50 px-4 py-3.5 text-[16px] font-medium leading-snug text-red-text">
            <AlertCircle size={22} strokeWidth={1.9} className="mt-px shrink-0" aria-hidden="true" />
            {formError}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={`text-[17px] font-semibold ${busy ? "text-ink-2" : ""}`}>Email</label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            disabled={busy}
            className="field"
            aria-invalid={Boolean(errors.email) || credentialsRejected}
            aria-describedby={errors.email ? "email-error" : credentialsRejected ? "form-error" : undefined}
            onChange={() => clear("email")}
          />
          {errors.email && <FieldError id="email-error" message={errors.email} />}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className={`text-[17px] font-semibold ${busy ? "text-ink-2" : ""}`}>Password</label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            disabled={busy}
            className="field"
            aria-invalid={Boolean(errors.password) || credentialsRejected}
            aria-describedby={errors.password ? "password-error" : credentialsRejected ? "form-error" : undefined}
            onChange={() => clear("password")}
          />
          {errors.password && <FieldError id="password-error" message={errors.password} />}
        </div>

        <button
          type="submit"
          disabled={busy}
          className={`btn-solid w-full ${status === "idle" ? "" : "bg-blue-dark hover:bg-blue-dark"}`}
        >
          {status === "loading" && (
            <>
              <Loader2 size={22} strokeWidth={2.2} className="animate-spin" aria-hidden="true" />
              Signing in…
            </>
          )}
          {status === "success" && (
            <>
              <Check size={22} strokeWidth={2.4} aria-hidden="true" />
              Signed in
            </>
          )}
          {status === "idle" && "Sign In"}
        </button>
      </form>
    </>
  );
}

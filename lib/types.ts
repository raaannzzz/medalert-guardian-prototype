export type DeviceStatus = {
  id: string;
  name: string;
  watchStatus: "Online" | "Offline";
  battery: number;
  lastGpsUpdate: string;
  lastKnownLocation: string;
  fallDetection: "Active" | "Inactive";
  updatedAt: string;
};

export type LoginResponse =
  | { ok: true; redirectTo: string }
  | {
      ok: false;
      code: "validation" | "invalid_credentials" | "bad_request";
      message: string;
      errors?: { email?: string; password?: string };
    };

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shared by the form (for instant feedback) and the API (as the real check). */
export function validateLogin(email: string, password: string) {
  const errors: { email?: string; password?: string } = {};
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(email.trim()))
    errors.email = "Enter a valid email address, like name@example.com.";
  if (!password) errors.password = "Enter your password.";
  return errors;
}

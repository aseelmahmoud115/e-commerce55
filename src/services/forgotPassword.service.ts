"use server";
import { apiRequest } from "@/Utilites/apiRequest";

export async function ForgotPassword(email: string) {
  return apiRequest<{ statusMsg: string; message: string }>(
    "/auth/forgotPasswords",
    { method: "POST", body: { email }, auth: false },
  );
}

export async function VerifyResetCode(resetCode: string) {
  return apiRequest<{ status: string }>("/auth/verifyResetCode", {
    method: "POST",
    body: { resetCode },
    auth: false,
  });
}

export async function ResetPassword(email: string, newPassword: string) {
  return apiRequest<{ token: string }>("/auth/resetPassword", {
    method: "PUT",
    body: { email, newPassword },
    auth: false,
  });
}

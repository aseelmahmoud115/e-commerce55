import * as zod from "zod";
import { passwordRule } from "./register.schema";

export const ForgotEmailSchema = zod.object({
  email: zod.string().nonempty("Email is required").email("Please enter a valid email address"),
});

export const VerifyCodeSchema = zod.object({
  resetCode: zod
    .string()
    .nonempty("Verification code is required")
    .regex(/^\d{5,6}$/, "Code must be 5 or 6 digits"),
});

export const ResetPasswordSchema = zod
  .object({
    newPassword: passwordRule,
    rePassword: zod.string().nonempty("Please confirm your password"),
  })
  .refine((o) => o.newPassword === o.rePassword, {
    error: "Passwords do not match",
    path: ["rePassword"],
  });

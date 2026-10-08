import * as zod from "zod";

export const passwordRule = zod
  .string()
  .nonempty("Please enter a password")
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Za-z]/, "Password must contain a letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[^A-Za-z0-9]/, "Password must contain a symbol");

export const phoneRule = zod
  .string()
  .nonempty("Please enter your phone number")
  .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number");

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .trim()
      .nonempty("Please enter your name")
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be at most 30 characters"),
    email: zod
      .string()
      .nonempty("Please enter your email")
      .email("Please enter a valid email address"),
    password: passwordRule,
    rePassword: zod.string().nonempty("Please confirm your password"),
    phone: phoneRule,
    terms: zod.boolean().refine((v) => v, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((obj) => obj.password === obj.rePassword, {
    error: "Passwords do not match",
    path: ["rePassword"],
  });

export type registerForm = zod.infer<typeof registerSchema>;

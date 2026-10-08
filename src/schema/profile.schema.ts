import * as zod from "zod";

export const ProfileSchema = zod.object({
  name: zod.string().trim().nonempty("Name is required").min(3, "Name must be at least 3 characters"),
  email: zod.string().nonempty("Email is required").email("Please enter a valid email address"),
  phone: zod
    .string()
    .regex(/^(01[0125][0-9]{8})?$/, "Please enter a valid Egyptian phone number"),
});
export type ProfileForm = zod.infer<typeof ProfileSchema>;

export const ChangePasswordSchema = zod
  .object({
    currentPassword: zod.string().nonempty("Current password is required"),
    password: zod
      .string()
      .nonempty("New password is required")
      .min(6, "Must be at least 6 characters"),
    rePassword: zod.string().nonempty("Please confirm your new password"),
  })
  .refine((o) => o.password === o.rePassword, {
    error: "Passwords do not match",
    path: ["rePassword"],
  });
export type ChangePasswordForm = zod.infer<typeof ChangePasswordSchema>;

import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address"),
  password: zod.string().nonempty("Password is required"),
});

export type loginPayload = zod.infer<typeof loginSchema>;

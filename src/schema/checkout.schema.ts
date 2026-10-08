import * as zod from "zod";

export const CheckoutSchema = zod.object({
  city: zod.string().trim().nonempty("City is required"),
  details: zod.string().trim().nonempty("Street address is required").min(5, "Please enter a more detailed address"),
  phone: zod
    .string()
    .nonempty("Phone number is required")
    .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
});

export type CheckoutForm = zod.infer<typeof CheckoutSchema>;

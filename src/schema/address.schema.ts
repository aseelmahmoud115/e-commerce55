import * as zod from "zod";

export const AddressSchema = zod.object({
  name: zod.string().trim().nonempty("Address name is required"),
  details: zod.string().trim().nonempty("Full address is required"),
  phone: zod
    .string()
    .nonempty("Phone number is required")
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  city: zod.string().trim().nonempty("City is required"),
});

export type AddressForm = zod.infer<typeof AddressSchema>;

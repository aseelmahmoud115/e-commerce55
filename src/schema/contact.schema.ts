import * as zod from "zod";

export const ContactSchema = zod.object({
  name: zod.string().trim().nonempty("Please enter your name"),
  email: zod.string().nonempty("Please enter your email").email("Please enter a valid email address"),
  subject: zod.string().nonempty("Please select a subject"),
  message: zod.string().trim().nonempty("Please enter your message").min(10, "Message must be at least 10 characters"),
});
export type ContactForm = zod.infer<typeof ContactSchema>;

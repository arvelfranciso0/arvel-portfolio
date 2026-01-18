import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Invalid email"),
  message: z.string().min(1, "Message is required"),
});

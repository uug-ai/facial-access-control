import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Invalid phone number").max(10, "Invalid phone number"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  id: z.number().int().positive("Invalid ID"),
  video: z.instanceof(Blob, { message: "Video is required" }),
});

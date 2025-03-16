import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(3, 'le nom est obligatoire et doit avoir au minimum 3 caractères'),
  price: z.number().min(1).max(1000),
  description: z.string().min(10),
  nbTickets: z.number().min(1).max(100),
  img: z
  .any()
  .refine((file) => file && file.length > 0, "File is required") 
  .refine(
    (file) => file && file[0]?.size <= 5 * 1024 * 1024,
    "File size must be less than 5MB"
  ),
});

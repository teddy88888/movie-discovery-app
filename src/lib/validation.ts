import { z } from "zod";

export const searchSchema = z.object({
  query: z.string().trim().min(2, "Movie title must be at least 2 characters"),
});

export type SearchFormData = z.infer<typeof searchSchema>;

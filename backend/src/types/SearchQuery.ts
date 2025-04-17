import { z } from "zod";

export const searchQuerySchema = z.object({
  message: z.string().min(1).max(2000),
});

export type SearchQuerySchema = z.infer<typeof searchQuerySchema>;

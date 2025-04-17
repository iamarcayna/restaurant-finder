import { z } from "zod";

export const searchParameterSchema = z.object({
  query: z.string().optional(),
  near: z.string().optional(),
  price: z.string().optional(),
  open_now: z.boolean().optional(),
});

export type SearchParameter = z.infer<typeof searchParameterSchema>;

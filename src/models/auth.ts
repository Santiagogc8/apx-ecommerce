import { z } from "zod";

export const AuthSchema = z.object({
    expiredAt: z.date(),
    code: z.number()
});

export type Auth = z.infer<typeof AuthSchema>;
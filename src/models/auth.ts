import { z } from "zod";

// Creamos y exportamos los modelos de Auth con zod
export const AuthSchema = z.object({
    email: z.email(),
    expiredAt: z.date(),
    code: z.number()
});

// Y tambien exportamos el tipo Auth que infiere del tipo AuthSchema
export type Auth = z.infer<typeof AuthSchema>;
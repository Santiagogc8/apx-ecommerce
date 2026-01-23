// Usamos zod en vez de yup
import { z } from "zod";

// Creamos y exportamos nuestro modelo de User
export const UserSchema = z.object({
    id: z.string().optional(),
    email: z.email(),
    createdAt: z.date()
});

// Y tambien exportamos el tipo Auth que infiere del tipo UserSchema
export type User = z.infer<typeof UserSchema>;
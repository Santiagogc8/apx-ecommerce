// Usamos zod en vez de yup
import { z } from "zod";

// Creamos nuestro modelo de User
export const UserSchema = z.object({
    id: z.string().optional(),
    email: z.email(),
    createdAt: z.date()
});

export type User = z.infer<typeof UserSchema>;
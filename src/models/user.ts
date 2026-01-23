// Usamos zod en vez de yup
import { z } from "zod";

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// Creamos y exportamos nuestro modelo de User
export const UserSchema = z.object({
    id: z.string().optional(),
    email: z.email(),
    createdAt: z.date(),
    name: z.string().optional(),
    phone: z.string().regex(phoneRegex, 'invalid number').optional()
});

// Y tambien exportamos el tipo User y UserUpdatePayload que infiere del tipo UserSchema
export type User = z.infer<typeof UserSchema>;

// Creamos y exportams un schema que quita explícitamente los campos que NO se deben tocar (omit)
export const UserUpdateSchema = UserSchema.omit({
    id: true,
    createdAt: true,
    email: true
}).partial(); // Hace que todos los campos restantes sean opcionales (perfecto para PATCH).

export type UserUpdatePayload = z.infer<typeof UserUpdateSchema>;

// Creamos un schema para la direccion (Colombia)
export const AddressSchema = z.object({
    department: z.string().min(2, "El nombre del departamento es muy corto"),
    city: z.string().min(2),
    streetLine: z.string().min(5, "La dirección parece incompleta (ej: Calle 123 # 45-67)"),
    neighborhood: z.string().min(2).optional(),
    additionalInfo: z.string().optional(),
    zipCode: z.string()
        .length(6, "El código postal en Colombia debe tener 6 dígitos")
        .regex(/^\d+$/, "El código postal solo debe contener números")
        .optional(),
});

export type UserAddress = z.infer<typeof AddressSchema>;
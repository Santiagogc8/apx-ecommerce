// * POST /auth/token
// Recibe un email y un código y valida que sean los correctos. En el caso de que sean correctos devuelve un token e invalida el código.

import { NextResponse } from "next/server";
import { verifyAuth } from "src/controllers/auth";
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";
import { cookies } from 'next/headers'; // Para setear cookies del lado del servidor
import { z } from "zod"

// Creamos un loginSchema con zod
const loginSchema = z.object({
    email: z.email(),
    code: z.string().length(6)
});

// Y creamos el endpoint POST que tiene el middleware apiErrorHandler para enviar errores
export const POST = apiErrorHandler(async (req: Request) => {
    const body = await req.json(); // Extraemos el body
    const validation = loginSchema.safeParse(body); // Y lo parseamos con el loginSchema

    if (!validation.success) {
        // Si la validacion es falsa, tiramos un error que nos dice los campos faltantes o sobrantes
        return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const {email, code} = validation.data; // Extraemos el email y el codigo de la validacion

    // E intentamos verificar el auth con el email y el codigo recibido
    const token = await verifyAuth(email, code);

    (await cookies()).set('ecommerce-token', token, {
        httpOnly: true, // 🔒 Nadie puede leerla con JS
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax',
        maxAge: 604800, // 7 días
        path: '/'
    })

    // Retornamos el token con un status 200
    return NextResponse.json({ token }, { status: 200 });
});
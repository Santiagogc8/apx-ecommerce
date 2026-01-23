// * POST /auth
// Recibe un email y encuentra/crea un user con ese email y le envía un código vía email.

// Hacemos las importaciones 
import { getOrCreateAuth } from "src/controllers/auth";
import { NextResponse } from "next/server";
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

// Creamos el endpoint de POST que tiene el middleware apiErrorHandler. Al middleware le pasamos una async function que recibe el request
export const POST = apiErrorHandler(async (request: Request) => {
    const body = await request.json(); // Esperamos el body en json
    const { email } = body; // Y extraemos el email directamente del body

    // Si no recibimos un email, tiramos un error
    if(!email) return NextResponse.json({error: "email was expected"}, {status: 400});

    const auth = await getOrCreateAuth(email); // Intentamos obtener o crear un auth 

    // Luego intentamos enviar un email
    try {
        // Destructuramos data y error de resend
        const { data, error } = await resend.emails.send({
            from: 'APX Ecommerce <no-reply@santiagoguzman.dev>',
            to: email,
            subject: 'Tu codigo de inicio de sesion',
            html: `<p>Tu código de acceso es: <strong>${auth.code}</strong></p>`
        });

        // Si hubo un error, lo tiramos con un 500
        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data }); // Y si todo sale bien, tiramosla respuesta con el id del email
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
});
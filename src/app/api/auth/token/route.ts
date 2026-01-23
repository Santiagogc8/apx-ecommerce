// ToDo: POST /auth/token
// Recibe un email y un código y valida que sean los correctos. En el caso de que sean correctos devuelve un token e invalida el código.
import { NextResponse } from "next/server";
import { verifyAuth } from "src/controllers/auth";

export async function POST(request) {
    try{
        const body = await request.json();
        const { email, code } = body;

        if(!email || !code) return NextResponse.json({error: "email and code were expected"}, {status: 400});

        const verifiedCode = await verifyAuth(email, code);
		return NextResponse.json({ token: verifiedCode })
    } catch(error){
		console.error(error)
        return NextResponse.json({error: "body was expected"}, {status: 400})
    }
}
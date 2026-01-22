// ToDo: POST /auth
// Recibe un email y encuentra/crea un user con ese email y le envía un código vía email.
import { getOrCreateAuth } from "src/controllers/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        const body = await request.json();
        const { email } = body;

        if(!email) return NextResponse.json({error: "email was expected"}, {status: 400});

        const auth = await getOrCreateAuth(email)

        return NextResponse.json({auth})
    } catch(error){
        return NextResponse.json({error: "body was expected"}, {status: 400})
    }
}
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Creamos un endpoint POST para poder hacer el logout
export async function POST() {
    const cookieStore = await cookies();
    
    // Seteamos a la cookie ecommerce-token
    cookieStore.set("ecommerce-token", "", {
        maxAge: 0, // Con age de 0 para que ya no sea valida
        path: "/",
    });

    return NextResponse.json({ message: "logout succesful" });
}
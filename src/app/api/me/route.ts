// * GET /me
// * PATCH /me
// Devuelve info del user asociado a ese token
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";
import { withAuth } from "src/middlewares/headers";
import { NextResponse } from "next/server";
import { getUser, patchUserData } from "src/controllers/user";

// Creamos el endpoint de GET. Este tiene dos middlewares. El de apiErrorHandler
export const GET = apiErrorHandler(
	withAuth(async (req: Request) => { // Y el middleware de withAuth (valida el authorization)
		const userData = (req as any).user; // Obtenemos el user directamente de lo que nos devolvio el middleware withAuth

		const user = await getUser(userData.userId); // Llamamos nuestro controller getUser y le pasamos el userId

		return NextResponse.json({ user }); // Por ultimo retornamos al informacion del user
	}),
);

// Y el endpoint de PATCH tambien tiene doble middleware
export const PATCH = apiErrorHandler(
	withAuth(async (req: Request) => {
		const body = await req.json(); // Obtenemos el body de la request
		const userData = (req as any).user; // Obtenemos el user directamente de lo que nos devolvio el middleware withAuth

		// Le intentamos patchear la data que recibimos del body y el userId
		const patchRes = await patchUserData(body, userData.userId);

		// Retornamos lo que nos devolvio patchUserData
		return NextResponse.json({ update: patchRes });
	}),
);
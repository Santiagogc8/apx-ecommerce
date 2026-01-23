// ToDo: PATCH /me/address
// Permite modificar un dato puntual del usuario al que pertenezca el token usado en el request. En este caso el objeto que describe la dirección.
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";
import { withAuth } from "src/middlewares/headers";
import { NextResponse } from "next/server";
import { patchUserAddress } from "src/controllers/user";

export const PATCH = apiErrorHandler(
	withAuth(async (req: Request) => {
		const body = await req.json(); // Obtenemos el body de la request
		const userData = (req as any).user; // Obtenemos el user directamente de lo que nos devolvio el middleware withAuth

		// Le intentamos patchear la data que recibimos del body y el userId
		const patchRes = await patchUserAddress(body, userData.userId);
		return NextResponse.json({ update: patchRes });
	})
)
// ToDo: GET /me
// Todo: PATCH /me
// Devuelve info del user asociado a ese token
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";
import { withAuth } from "src/middlewares/headers";
import { NextResponse } from "next/server";

export const GET = apiErrorHandler(
	withAuth(async (req: Request) => {
		const user = (req as any).user;

		return NextResponse.json({ user });
	}),
);

export async function PATCH(request) {
	return new Response(JSON.stringify({ message: "Hola desde PATCH ME!" }), {
		status: 200,
		headers: { "Content-type": "application/json" },
	});
}

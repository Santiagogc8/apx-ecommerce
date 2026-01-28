// * GET /me/orders
// Devuelve todas mis ordenes con sus status.
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";
import { withAuth } from "src/middlewares/headers";
import { NextRequest, NextResponse } from "next/server";
import { getMyOrders } from "src/controllers/order";

// Creamos el endpoint de GET. Este tiene dos middlewares. El de apiErrorHandler
export const GET = apiErrorHandler(
	withAuth(async (req: NextRequest) => { // Y el middleware de withAuth (valida el authorization)
		const userData = (req as any).user; // Obtenemos el user directamente de lo que nos devolvio el middleware withAuth

		const orders = await getMyOrders(userData.email); // Y le pasamos el email a getMyOrders

		return NextResponse.json({orders}); // Por ultimo retornamos al informacion de las ordenes
	}),
);
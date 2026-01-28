// * GET /order/{orderId}
// Devuelve una orden con toda la data incluyendo el estado de la orden.
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";
import { NextRequest, NextResponse } from "next/server";
import { getOrderById } from "src/controllers/order";

// Creamos un endpoint para obtener una orden por su id
export const GET = apiErrorHandler(
	// Obtenemos los params
	async (req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) => {
		const orderId = (await params).orderId; // Esperamos que obtenga los params y le pedimos el orderId

		const order = await getOrderById(orderId); // Luego esperamos la llamada a la funcion getOrderById

		return NextResponse.json({ order }, { status: 200 }); // Y respondemos con la orden recibida
	},
);
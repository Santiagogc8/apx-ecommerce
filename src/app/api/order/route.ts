// * POST /order?productId={id}
// Genera una compra en nuestra base de datos y además genera una orden de pago en MercadoPago. Devuelve una URL de MercadoPago a donde vamos a redigirigir al user para que pague y el orderId
import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "src/controllers/order";
import { withAuth } from "src/middlewares/headers";
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";

// Creamos el endpoint que tiene el middleware de los errores
export const POST = apiErrorHandler(
	withAuth(async (req: NextRequest) => { // Y el que extrae el email del header
		const searchParams = req.nextUrl.searchParams; // Extraemos los parametros de busqueda

		const productId = searchParams.get("productId") || ""; // Obtenemos el productId de los parametros
		const userData = (req as any).user; // Obtenemos el user directamente de lo que nos devolvio el middleware withAuth

		// Y llamamos el createOrder con el productId y el email extraido de userData
		const paymentLink = await createOrder(productId, userData.email);

		// Respondemos con el link de pago
		return NextResponse.json({ paymentLink }, { status: 200 });
	}),
);
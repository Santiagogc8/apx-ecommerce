// ToDo: POST /order?productId={id}
// Genera una compra en nuestra base de datos y además genera una orden de pago en MercadoPago. Devuelve una URL de MercadoPago a donde vamos a redigirigir al user para que pague y el orderId
import { NextRequest, NextResponse } from "next/server";
import { verifyProduct } from "src/controllers/order";
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";

export const POST = apiErrorHandler(async (req: NextRequest) => {
	const searchParams = req.nextUrl.searchParams;

	const productId = searchParams.get('productId') || "";

	const product = await verifyProduct(productId)

	return NextResponse.json({product}, { status: 200 });
});
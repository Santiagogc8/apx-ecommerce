// * POST /ipn/mercadopago
// Recibe la señal de MercadoPago para confirmar que el pago fué realizado con éxito. Cambia el estado de la compra en nuestra base y le envía un email al usuario para avisarle que el pago se realizó correctamente. También se debe generar algún aviso hacia quienes deban procesar esta compra. Esto último es algo interno así que puede ser un email o un registro en Airtable.
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";
import { getPaymentById } from "src/lib/mercadopago";
import { NextResponse, NextRequest } from "next/server";
import { confirmOrRejectPay } from "src/controllers/order";

// Creamos el endpoint que tiene el middleware apiErrorHandler
export const POST = apiErrorHandler(async (req: NextRequest) => {
	const body = await req.json(); // Obtiene el body

	// Y verifica si el tipo es pago
	if(body.type === "payment"){
		const mpPayment = await getPaymentById(body.data.id); // Busca el payment por id
		const purchaseId = mpPayment.external_reference; // Y le extrae el external_reference

		if(mpPayment.status === "approved"){ // Si el pago fue aprobado, 
			await confirmOrRejectPay(purchaseId, mpPayment.status, mpPayment.id.toString()); // Ejecuta un confirmOrRejectPay
			return NextResponse.json({status: mpPayment.status}) // Y responde con el estado
		} else if(mpPayment.status === "rejected"){ // En caso de haber sido rechazado
			await confirmOrRejectPay(purchaseId, mpPayment.status, mpPayment.id.toString(), mpPayment.additional_info.items); // Tambien le pasamos los items (para que pueda restaurar los stock)
			return NextResponse.json({status: mpPayment.status}); // Y responde con el status
		}
	}

	return NextResponse.json({status: "waiting"}); // Si el body no es de tipo payment, responde con "waiting"
});
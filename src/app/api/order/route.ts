// ToDo: POST /order?productId={id}
// Genera una compra en nuestra base de datos y además genera una orden de pago en MercadoPago. Devuelve una URL de MercadoPago a donde vamos a redigirigir al user para que pague y el orderId

export async function POST(request) {
	return new Response(JSON.stringify({ message: "Hola desde GET ORDER?productId={id}!" }), {
		status: 200,
		headers: { "Content-type": "application/json" },
	});
}
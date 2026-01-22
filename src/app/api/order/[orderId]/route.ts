// ToDo: GET /order/{orderId}
// Devuelve una orden con toda la data incluyendo el estado de la orden.

export async function GET(request) {
	return new Response(JSON.stringify({ message: "Hola desde GET ORDER/{orderId}!"}), {
		status: 200,
		headers: { "Content-type": "application/json" },
	});
}
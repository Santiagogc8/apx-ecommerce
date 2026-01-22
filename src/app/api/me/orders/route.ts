// ToDo: GET /me/orders
// Devuelve todas mis ordenes con sus status.

export async function GET(request) {
	return new Response(JSON.stringify({ message: "Hola desde GET ME/ORDERS!"}), {
		status: 200,
		headers: { "Content-type": "application/json" },
	});
}
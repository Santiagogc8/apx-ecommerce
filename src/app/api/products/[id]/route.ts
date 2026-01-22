// ToDo: GET /products/{id}
// Obtiene toda data de un producto

export async function GET(request) {
	return new Response(JSON.stringify({ message: "Hola desde GET PRODUCTS/{ID}!" }), {
		status: 200,
		headers: { "Content-type": "application/json" },
	});
}
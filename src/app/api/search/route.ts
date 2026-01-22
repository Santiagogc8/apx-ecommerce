// ToDo: GET /search?q=query&offset=0&limit=10
// Buscar productos en nuestra base de datos. Chequea stock y todo lo necesario. Este endpoint utiliza la técnica que vimos sobre Airtable y Algolia.

export async function GET(request) {
	return new Response(JSON.stringify({ message: "Hola desde GET SEARCH!" }), {
		status: 200,
		headers: { "Content-type": "application/json" },
	});
}
// ToDo: GET /me 
// Todo: PATCH /me
// Devuelve info del user asociado a ese token

export async function GET(request) {
	return new Response(JSON.stringify({ message: "Hola desde GET ME!" }), {
		status: 200,
		headers: { "Content-type": "application/json" },
	});
}

export async function PATCH(request) {
	return new Response(JSON.stringify({ message: "Hola desde PATCH ME!" }), {
		status: 200,
		headers: { "Content-type": "application/json" },
	});
}
// ToDo: POST /auth
// Recibe un email y encuentra/crea un user con ese email y le envía un código vía email.

export async function POST(request) {
	return new Response(JSON.stringify({ message: "Hola desde POST AUTH!" }), {
		status: 200,
		headers: { "Content-type": "application/json" },
	});
}
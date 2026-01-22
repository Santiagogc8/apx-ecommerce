// ToDo: POST /auth/token
// Recibe un email y un código y valida que sean los correctos. En el caso de que sean correctos devuelve un token e invalida el código.

export async function POST(request) {
	return new Response(JSON.stringify({ message: "Hola desde POST AUTH/TOKEN!" }), {
		status: 200,
		headers: { "Content-type": "application/json" },
	});
}
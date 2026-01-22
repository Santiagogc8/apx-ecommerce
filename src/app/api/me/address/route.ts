// ToDo: PATCH /me/address
// Permite modificar un dato puntual del usuario al que pertenezca el token usado en el request. En este caso el objeto que describe la dirección.

export async function PATCH(request) {
	return new Response(JSON.stringify({ message: "Hola desde PATCH ME/ADDRESS!" }), {
		status: 200,
		headers: { "Content-type": "application/json" },
	});
}
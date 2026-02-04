// Creamos la funcion fetchApi que recibe una ruta (como /me) y unas options de tipo RequestInit (tipicas del fetch)
export async function fetchApi(route: string, options: RequestInit = {}) {

    // Hacemos el fetch con la ruta recibida
	const res = await fetch("/api" + route, {
        ...options, // Le pasamos las options 
        credentials: "same-origin"
	});

	if (!res.ok) {
        if (res.status === 401) {
            window.location.href = "/logout"
        }
        throw res.status;
    }

	const data = await res.json(); // Guardamos la data en json

	return data; // Y retornamos la data
}

export async function sendCode(email: string) {
    const apiRes = await fetchApi('/auth', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: {
            "Content-type": "application/json"
        }
    })

	return apiRes; // Y retornamos la data 
}

export async function getToken(email: string, code: string) {
    await fetchApi('/auth/token', {
        method: 'POST',
        body: JSON.stringify({email, code}),
        headers: {
            "Content-type": "application/json"
        }
    });

    return true;
}
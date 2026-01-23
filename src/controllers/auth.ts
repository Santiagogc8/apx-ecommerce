import { firestore } from "src/lib/firestore";
import { getOrCreateUser } from "./user";
import { randomInt } from "crypto";
import { z } from "zod";
import { AuthSchema } from "src/models/auth";
import jwt from "jsonwebtoken";
import { ApiError } from "src/models/apiError";

// Obtenemos o creamos la coleccion auth
const authCollection = firestore.collection("auth");

// Creamos nuestra funcion getOrCreateAuth que recibe un email
async function getOrCreateAuth(email: string) {
	const emailVerified = z.email().parse(email); // Intenta verificar que recibimos un email valido
	const user = await getOrCreateUser(emailVerified); // Y le decimos que cree o encuentre un user con el email regresado

	return await createAuth(user.id, email); // Por ultimo, retornamos el createAuth con el id que nos dio user y el email
}

// La funcion createAuth obtiene un userId y un email
async function createAuth(userId: string, email: string) {
	// Creamos una fecha
	const expiredAt = new Date();
	expiredAt.setMinutes(expiredAt.getMinutes() + 20); // Y le sumamos 20 minutos
	const code = randomInt(100000, 1000000); // Y creamos un codigo con crypto (de 6 digitos)

	// Validamos la data con el AuthSchema
	const validData = AuthSchema.parse({
		userId,
		email,
		expiredAt,
		code,
	});

	// Y creamos una coleccion con el mismo id del userId y le seteamos la data validada
	await authCollection.doc(userId).set(validData);

	// Retornamos el codigo y le fecha de expiracion
	return {
		code,
		expiredAt,
	};
}

// Para la funcion de verifyAuth recibimos un email y un codigo
async function verifyAuth(email: string, code: string) {
	// Buscamos en la authCollection donde haya un resultado que su campo email sea igual al que recibimos y lo obtenemos
	const results = await authCollection
		.where("email", "==", email)
		.limit(1)
		.get();

	// Si no recibimos resultados, creamos la instancia de ApiError
	if (results.empty) {
		throw new ApiError("auth not find", 404)
	}

	const doc = results.docs[0]; // Guardamos el doc en su primera posicion
	const authData = doc.data(); // Guardamos la data del doc
	const expiresMillis = authData.expiredAt.toMillis(); // Y convertimos la fecha expiredAt a milisegundos
	const isExpired = Date.now() > expiresMillis; // Verificamos si la fecha actual es mayor a los milisegundos de la fecha de expiracion

	// Si isExpired es true, significa que el codigo expiro. Entonces tiramos una instancia del error 
	if (isExpired) {
        throw new ApiError("code expired", 401);
    }

	// Verificamos si el codigo que tiene authData es igual al codigo que recibimos
	if (authData.code == code) {
		// En caso de que asi sea, obtenemos el documento con el id del doc que encontramos y le actualizamos el campo code a null (anulamos el codigo)
		await authCollection.doc(doc.id).update({code: null});
		return generateToken({ userId: doc.id, email: authData.email }); // Retornamos el token que nos da la funcion generateToken
	} else { // En caso de que el codigo no sea igual, tiramos una instancia del error
		throw new ApiError("not authorized", 401)
	}
}

// Para la funcion generateToken recibimos una data
async function generateToken(data: any) {
	// Y retornamos el token jwt de la data con el secreto que esta en las env variables (y 7 dias de expiracion)
	return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '7d' });
}

async function decodeToken(token: string) {
	if(!token) throw new ApiError("token was expected", 400);

	return jwt.verify(token, process.env.JWT_SECRET);
}

export { getOrCreateAuth, createAuth, verifyAuth, decodeToken };
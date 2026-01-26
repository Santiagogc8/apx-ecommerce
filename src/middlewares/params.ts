import { NextRequest } from "next/server";

// Creamos un middleware que recibe el handler, un maxLimit (inicializa el maxLimit en 50)
export function getOffsetAndLimitFromReq(handler: Function, maxLimit: number = 50) {
	return async (req: NextRequest) => { // Retornamos una funcion asincrona que recibe el req
		const params = req.nextUrl.searchParams; // Obtiene los parametros de req.nextUrl

		// Usamos un valor por defecto si el parámetro no existe o es NaN
		const queryLimit = parseInt(params.get('limit') || "") || 10; // Limite de 10 en caso de que no se especifique nada
		const queryOffset = parseInt(params.get('offset') || "") || 0; // Y offset 0 si no se le especifica nada

		// Aplicamos lógica de seguridad: no exceder el máximo y no ser negativo
		const limit = Math.min(queryLimit, maxLimit); // Elige el número más pequeño de los dos.
		const offset = Math.max(0, queryOffset); // Elige el número más grande de los dos.

		// Y terminamos la funcion pasandole el callback con la req y un objeto con { limit, offset } (lo que obtuvimos del calculo de limit y offset)
		return handler(req, { limit, offset }); 
	}
}
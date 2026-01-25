import { NextApiRequest } from "next";

// Creamos una funcion que nos da el offset y el limite de la request. Recibe una req, un maxLimit y una maxOffset
export function getOffsetAndLimitFromReq(req: NextApiRequest, maxLimit, maxOffset) {
	const queryLimit = parseInt(req.query.limit as string); // Obtenemos el limite y lo convertimos a int
	const queryOffset = parseInt(req.query.offset as string); // Obtenemos el offset y lo convertimos a int

    // Establecemos un valor default para limit: Si el queryLimit es menor o igual al maxLimit, devolvemos el queryLimit. Si es mayor, devolvemos el maxLimit
	const limit = queryLimit <= maxLimit ? queryLimit : maxLimit; 

    // Por otro lado establecemos un valor default para offset: Si el queryOffset es menor o igual al maxOffset, devolvemos el queryOffset. Si es mayor, devolvemos 0
	const offset = queryOffset <= maxOffset ? queryOffset : 0;

    // Retornamos el limite y el offset
	return {
		limit,
		offset,
	};
}

// export function si(handler: Function){
//     return async (req: NextApiRequest, ...args: any[]) => {
//         const queryLimit = parseInt(req.query.limit as string); // Obtenemos el limite y lo convertimos a int
// 	    const queryOffset = parseInt(req.query.offset as string); // Obtenemos el offset y lo convertimos a int

//         // Establecemos un valor default para limit: Si el queryLimit es menor o igual al maxLimit, devolvemos el queryLimit. Si es mayor, devolvemos el maxLimit
//         const limit = queryLimit <= maxLimit ? queryLimit : maxLimit; 

//         // Por otro lado establecemos un valor default para offset: Si el queryOffset es menor o igual al maxOffset, devolvemos el queryOffset. Si es mayor, devolvemos 0
//         const offset = queryOffset <= maxOffset ? queryOffset : 0;
//     }
// }
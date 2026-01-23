import { ApiError } from "src/models/apiError";
import { decodeToken } from "src/controllers/auth";

// Creamos un middleware que permite validar si tenemos un header authorization y lo decodea
export function withAuth(handler: Function){
    return async(req: Request, ...args: any[]) => { // Retorna una funcion asincrona (esta recibe el req y los argumentos. Los argumentos son para las rutas dinamicas)
        const authHeader = req.headers.get("authorization"); // Que obtiene el authorization del header

        // Si no lo recibio, crea una instacia de ApiError
        if(!authHeader) throw new ApiError("Missing or invalid Authorization header", 401);

        // Si lo recibio, obtiene el token valido del authHeader
        const token = authHeader.split(" ")[1];

        // Si no recibimos mal el token, tiramos error
        if(!token) throw new ApiError("token malformed", 400);

        // Decodificamos el token y lo guardamos en una variable
        const user = await decodeToken(token);
        (req as any).user = user; // Y le inyectamos el usuario en el request (para que lo pueda usar el handler)

        return handler(req, ...args); // Y continuamos el flujo (le volvemos a pasar el req y los args)
    }
}
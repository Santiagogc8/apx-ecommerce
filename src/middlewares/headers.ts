import { ApiError } from "src/models/apiError";
import { decodeToken } from "src/controllers/auth";
import { cookies } from "next/headers";

// Creamos un middleware que permite validar si tenemos un header authorization y lo decodea
export function withAuth(handler: Function){
    return async(req: Request, ...args: any[]) => { // Retorna una funcion asincrona (esta recibe el req y los argumentos. Los argumentos son para las rutas dinamicas)
        const cookieStore = await cookies(); // Obtenemos las cookies
        const tokenFromCookie = cookieStore.get("ecommerce-token")?.value; // Obtenemos el valor de la cookie ecommerce-token

        const authHeader = req.headers.get("authorization"); // Obtenemos el authorization del header
        // Si lo recibio, obtiene el token valido del authHeader
        const tokenFromHeader = authHeader?.split(" ")[1];

        // Guardamos el token priorizando el cookie
        const token = tokenFromCookie || tokenFromHeader;

        // Si recibio cookie ni token desde el header, crea una instacia de ApiError
        if(!token) throw new ApiError("No token provided", 401);

        try{
            // Decodificamos el token y lo guardamos en una variable
            const user = await decodeToken(token);
            (req as any).user = user; // Y le inyectamos el usuario en el request (para que lo pueda usar el handler)
        } catch(error){
            (await cookies()).set("ecommerce-token", "", { 
                maxAge: 0, 
                path: "/" 
            });

            throw error;
        }

        return handler(req, ...args); // Y continuamos el flujo (le volvemos a pasar el req y los args)
    }
}
// Se crea un middleware que obtiene ApiError como modelo
import { ApiError } from "src/models/apiError";
import { NextResponse } from "next/server";

// Y el middleware permite handlear los errores
export function apiErrorHandler(handler: Function) {
    return async (req, ...args: any[]) => { // Le pasamos al middleware el req y los args (todo lo que viene en la url)
        try { // Si no hay errores, ejecuta el handler
            return await handler(req, ...args);
        } catch (err) { // Si hay errores, captura el error
            // Y verifica si el error es una instancia de ApiError. De ser asi, devuelve el codigo de estado. Si no, devuelve 500
            const status = err instanceof ApiError ? err.statusCode : 500; 
            const message = err.message || "Internal error"; // Si existe un err.message, lo devuelve y si no, devuelve un fallback
            
            // Retorna una respuesta con el mensaje de error y el status code
            return NextResponse.json({ error: message }, { status });
        }
    };
}
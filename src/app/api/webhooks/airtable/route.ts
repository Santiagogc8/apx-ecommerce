import { syncProducts } from "src/controllers/search";
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";
import { NextRequest, NextResponse } from "next/server";

// Creamos un endpoint /sync. Usa el middleware apiErrorHandler para capturar errores
export const POST = apiErrorHandler(async (req: NextRequest) => {
    const authHeader = req.headers.get('Authorization'); // Capturamos el header Authorization
    
    // Compartamos el Authorization recibido con el SYNC_SECRET
    if (authHeader.toLowerCase() !== `bearer ${process.env.SYNC_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // Si es diferente, tirar error
    }

	await syncProducts(); // Espera que se sincronicen los productos a algolia

	return NextResponse.json({ synced: true }, { status: 200 }); // Responde con un synced: true y un 200 si termino bien
});
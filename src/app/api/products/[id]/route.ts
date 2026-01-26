// * GET /products/{id}
// Obtiene toda data de un producto
import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "src/controllers/search";
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";

// Creamos el endpoint /api/products/[id] que recibe el req y los parametros (para extraer el id)
export const GET = apiErrorHandler( async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
		const id = (await params).id; // Extraemos el id de esperar params (porque es una promesa)

		const product = await getProductById(id); // Luego esperamos a que ejecute la funcion getProductById

		return NextResponse.json({ product }, { status: 200 }); // Y si encontro product, lo retorna en la respuesta
	},
);
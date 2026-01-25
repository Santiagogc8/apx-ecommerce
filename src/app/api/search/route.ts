// ToDo: GET /search?q=query&offset=0&limit=10
// Buscar productos en nuestra base de datos. Chequea stock y todo lo necesario. Este endpoint utiliza la técnica que vimos sobre Airtable y Algolia.
import { getProducts } from "src/controllers/search";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;

	const queryLimit = parseInt(searchParams.get('limit') as string); // Obtenemos el limite y lo convertimos a int
	const queryOffset = parseInt(searchParams.get('offset') as string); // Obtenemos el offset y lo convertimos a int
	const q = searchParams.get('q') as string;

	const list = await getProducts(q, queryOffset, queryLimit);

	return NextResponse.json({list}, {status: 200})
}
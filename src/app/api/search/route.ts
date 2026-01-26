// ToDo: GET /search?q=query&offset=0&limit=10
// Buscar productos en nuestra base de datos. Chequea stock y todo lo necesario. Este endpoint utiliza la técnica que vimos sobre Airtable y Algolia.
import { getProducts, syncProducts } from "src/controllers/search";
import { NextResponse, NextRequest } from "next/server";
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";
import { getOffsetAndLimitFromReq } from "src/middlewares/params";

export const GET = apiErrorHandler(
	getOffsetAndLimitFromReq(async (req: NextRequest, { limit, offset }) => {
		const searchParams = req.nextUrl.searchParams;
		const q = searchParams.get("q") || "";

		const list = await getProducts(q, offset, limit);

		return NextResponse.json({ list }, { status: 200 });
	}),
);

export const POST = apiErrorHandler(async (req: NextRequest) => {
	await syncProducts();

	return NextResponse.json({ synced: true }, { status: 200 });
});
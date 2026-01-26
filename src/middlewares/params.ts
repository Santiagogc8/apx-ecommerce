import { NextRequest } from "next/server";

export function getOffsetAndLimitFromReq(handler: Function, maxLimit: number = 50) {
	return async (req: NextRequest) => {
		const params = req.nextUrl.searchParams;

		// Usamos un valor por defecto si el parámetro no existe o es NaN
		const queryLimit = parseInt(params.get('limit') || "") || 10;
		const queryOffset = parseInt(params.get('offset') || "") || 0;

		// Aplicamos lógica de seguridad: no exceder el máximo y no ser negativo
		const limit = Math.min(queryLimit, maxLimit);
		const offset = Math.max(0, queryOffset);

		return handler(req, { limit, offset });
	}
}
import { syncProducts } from "src/controllers/search";
import { apiErrorHandler } from "src/middlewares/apiErrorHandler";
import { NextRequest, NextResponse } from "next/server";

// Cambiamos a GET porque Vercel Cron llama vía GET
export const GET = apiErrorHandler(async (req: NextRequest) => {
    const authHeader = req.headers.get('Authorization');

    // Vercel envía "Bearer <CRON_SECRET>"
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json(
            { error: "Unauthorized" }, 
            { status: 401 }
        );
    }

    try {
        await syncProducts();
        return NextResponse.json({ synced: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        );
    }
});
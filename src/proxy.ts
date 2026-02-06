// * Este Middleware SOLO afecta al Front y las rutas asociadas en el config
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
    const token = request.cookies.get("ecommerce-token")?.value;
    const { pathname } = request.nextUrl;

    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Protección de rutas privadas
    const protectedRoutes = ['/me'];
    
    // Si la ruta actual está en la lista y no hay token...
    if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
        // ...lo mandamos al login en lugar de la home
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Controla en qué rutas se ejecuta el middleware
export const config = {
    matcher: ['/me/:path*', '/login'],
}
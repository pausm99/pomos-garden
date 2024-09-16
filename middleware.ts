// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });

  // Define las rutas protegidas
  const protectedPaths = ["/", "/tasks", "/chat", "/analytics", "/minigame"];

  // Verifica si la ruta actual es una ruta protegida
  if (protectedPaths.some((path) => request.nextUrl.pathname === path)) {
    if (!token) {
      // Redirige a la página de inicio de sesión si el usuario no está autenticado
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Permite acceso a la página de inicio de sesión y otras rutas no protegidas
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configura el middleware para que se ejecute en las rutas especificadas
export const config = {
  matcher: ["/tasks", "/chat", "/analytics", "/minigame", "/"],
};

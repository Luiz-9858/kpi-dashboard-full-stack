import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Definir quais rotas precisam de autenticação
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/kpis/:path*",
    "/github/:path*",
    "/comparacao/:path*",
    "/relatorios/:path*",
    "/okrs/:path*",
    "/projetos/:path*",
  ],
};

// Middleware com autenticação
export default withAuth(
  function middleware(req) {
    // Você pode adicionar lógica customizada aqui
    return NextResponse.next();
  },
  {
    callbacks: {
      // Verifica se usuário está autenticado
      authorized: ({ token }) => !!token,
    },
    // Redirecionar para login se não autenticado
    pages: {
      signIn: "/auth/login",
    },
  },
);

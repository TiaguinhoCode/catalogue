import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""; // Obtém o host da requisição
  const subdomain = hostname.split(".")[0]; // Extrai o subdomínio (primeira parte do host)

  // Verifica se o subdomínio é "admin"
  if (subdomain === "admin") {
    // Redireciona o subdomínio para a rota correspondente
    const url = request.nextUrl.clone();
    url.pathname = "/admin"; // Define a rota para onde redirecionar
    return NextResponse.rewrite(url);
  }

  // Caso não seja um subdomínio válido, continuar normalmente
  return NextResponse.next();
}

// Configuração de matcher para aplicar o middleware apenas nas rotas desejadas
export const config = {
  matcher: ["/:path*"], // Aplica o middleware a todas as rotas
};

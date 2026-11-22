import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const navegacao = request.method === "GET" || request.method === "HEAD";
  if (!navegacao) return NextResponse.next();

  const secret = process.env.NEXTAUTH_SECRET;
  // A navegação valida a sessão sem renovar o cookie que o logout pode estar removendo.
  const token = secret && await getToken({
    req: { headers: { cookie: request.headers.get("cookie") ?? "" } },
    secret,
    secureCookie: request.nextUrl.protocol === "https:",
  });

  if (!token || !token.sub) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/transacoes/:path*"],
};

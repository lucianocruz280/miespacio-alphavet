import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default withAuth(
  function middleware(req: NextRequest) {

    const host = req.headers.get("host")
    const url = req.nextUrl.clone()

    if (host?.startsWith("miespacio.")) {

      if ((req as any).nextauth?.token && url.pathname === "/") {
        url.pathname = "/home"
        return NextResponse.rewrite(url)
      }

    }

    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/auth/signin",
    },
  }
)

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/pets/:path*",
    "/appointments/:path*",
  ],
}
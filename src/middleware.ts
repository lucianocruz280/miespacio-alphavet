import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default withAuth(
  function middleware(req: NextRequest) {
    const host = req.headers.get("host")
    const url = req.nextUrl.clone()

    if ((req as any).nextauth?.token && url.pathname === "/") {
      url.pathname = "/home"
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname === "/") {
          return true
        }
        return !!token
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
)

export const config = {
  matcher: [
    "/",
    "/home",
    "/dashboard/:path*",
    "/pets/:path*",
    "/appointments/:path*",
  ],
}
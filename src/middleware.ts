import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/VerifyToken"

// Authentication configuration
const AUTH_CONFIG = {
  publicPaths: ["/login", "/forgot-password"],
  protectedPaths: [
    "/home",
    "/trekkings",
    "/tours",
    "/blogs",
    "/accommodations",
    "/quotes",
    "/tailor-made",
    "clients",
  ],
  loginPath: "/login",
  homePath: "/",
}

export async function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("token")?.value
  const pathname = new URL(request.url).pathname
  console.log("Pathname:", pathname)
  console.log("Token:", token)

  // Helper function to check path matching
  const matchesPath = (paths: string[]) =>
    paths.some((path) => pathname.startsWith(path))
  // Scenario 1: No token - redirect to login for protected routes
  if (!token) {
    if (matchesPath(AUTH_CONFIG.protectedPaths)) {
      return NextResponse.redirect(new URL(AUTH_CONFIG.loginPath, request.url))
    }
    return NextResponse.next()
  }

  // Scenario 2: Token exists - validate token
  try {
    const isValidToken = await verifyToken(token)

    // If token is invalid
    if (!isValidToken) {
      const response = NextResponse.redirect(
        new URL(AUTH_CONFIG.loginPath, request.url)
      )
      response.cookies.delete("token")
      return response
    }

    // Scenario 3: Valid token - prevent access to public paths
    if (matchesPath(AUTH_CONFIG.publicPaths)) {
      return NextResponse.redirect(new URL(AUTH_CONFIG.homePath, request.url))
    }

    // Allow access to protected routes
    return NextResponse.next()
  } catch (error) {
    // Catch any unexpected errors during token validation
    const response = NextResponse.redirect(
      new URL(AUTH_CONFIG.loginPath, request.url)
    )
    response.cookies.delete("token")
    return response
  }
}

// Matcher configuration
export const config = {
  matcher: [
    "/trekkings/:path*",
    "/tours/:path*",
    "/blogs/:path*",
    "/accommodations/:path*",
    "/quotes/:path*",
    "/tailor-made/:path*",
    "/clients/:path*", // Include clients in matcher

    "/login", // Include login in matcher
    "/forgot-password", // Include forgot-password in matcher
  ],
}

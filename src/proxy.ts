import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const AFRICAN_COUNTRY_CODES = new Set([
  "ZA", "ZW", "ZM", "MZ", "BW", "NA", "LS", "SZ", "AO", "TZ", "KE", "UG", "RW",
  "BI", "ET", "ER", "DJ", "SO", "SS", "SD", "EG", "LY", "TN", "DZ", "MA", "MR",
  "ML", "NE", "TD", "NG", "GH", "CI", "BF", "SN", "GN", "GM", "SL", "LR", "BJ",
  "TG", "CM", "GA", "CG", "CD", "CF", "GQ", "ST", "CV", "MG", "MU", "SC", "KM",
])

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // Skip re-detection if cookie already set — honour existing session
  if (request.cookies.has("region")) return response

  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase()

  // Fallback to 'za' when header is absent (Firebase App Hosting, local dev)
  const region = country
    ? AFRICAN_COUNTRY_CODES.has(country)
      ? "za"
      : "international"
    : "za"

  response.cookies.set("region", region, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  })

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)",
  ],
}

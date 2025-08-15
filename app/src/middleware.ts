import { NextResponse, type NextRequest } from "next/server"

export const middleware = (request: NextRequest) => {
    const url = request.nextUrl.pathname
    if (!url.includes("/docs")) {
        return NextResponse.redirect(new URL("/docs", request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}

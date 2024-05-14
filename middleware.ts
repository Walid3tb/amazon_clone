import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  let loggedin = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  if (loggedin && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    !loggedin &&
    ![
      "/",
      "/login",
      "/register",
      "/forgot-password",
      "/reset-password",
    ].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

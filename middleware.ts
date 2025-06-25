import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/app/lib/session"; 

const protectedRoutes = ["/dashboard", "/", "/test/create", "/test", "/questions"];
const publicRoutes = ["/login"];

export async function middleware(req:NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // Get session cookie
    const sessionCookie = req.cookies.get("session");
    
    // Only attempt to decrypt if cookie exists
    const session = sessionCookie ? await decrypt(sessionCookie.value) : null;

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

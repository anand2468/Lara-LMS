import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not defined in environment variables");
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const isProd = process.env.NODE_ENV === "production";

export async function createSession(userId:string, email:string, username:string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, email, username, expiresAt });

  // Get cookies instance first
  const cookieStore = await cookies();
  
  // Then set the cookie
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: isProd,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  // Same pattern for deletion
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function encrypt(payload:{ userId: string; email: string;username:string; expiresAt: Date }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session = "") {
    if (!secretKey) {
        console.error("SESSION_SECRET is not defined");
        return null;
    }
    
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error: any) {
        if (error.code === 'ERR_JWT_EXPIRED') {
            console.log("Session expired");
        } else {
            console.log("Failed to verify session:", error.message);
        }
        return null;
    }
}

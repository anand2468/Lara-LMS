"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../../lib/session";
import { redirect } from "next/navigation";

const testUsers = [
    {
        id: "1",
        name:"admin1",
        email: "laralms@gmail.com",
        password: "12345678"
    },
    {
        id: "2",
        name:"admin2",
        email: "admin2@gmail.com",
        password: "87654321"
    },
    {
        id: "3",
        name:"admin3",
        email: "admin3@gmail.com",
        password: "password123"
    }
];

// Zod schema for validating login form data
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .trim(),
});

export async function login(prevState:any, formData:any) {

    //using zod schema to validate form data
    const result = loginSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
        return {
            ...prevState,
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { email, password } = result.data;

    // Find matching user
    const user = testUsers.find(u => u.email === email && u.password === password);

    if (!user) {
        return {
            ...prevState,
            errors: {
                email: ["Invalid email or password"],
            },
        };
    }

    // Create session with user data
    await createSession(user.id, user.email, user.name);
    redirect("/");
}

export async function logout() {
    await deleteSession();
    redirect("/login");
}
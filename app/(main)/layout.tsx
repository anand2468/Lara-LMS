import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";// /Users/anand/projects/nextprog/lara-lms/app/globals.css
import NavBar from "../components/NavBar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "home-lara-lms",
  description: "lara-lms is a learning management system for generating and managing tests.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-[100vh]"
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <aside className="h-full min-w-[200px] p-4 shadow-2xl">
          <h1 className="mt-5 text-3xl font-extrabold text-purple-900">LARA-LMS</h1>
          <NavBar />
        </aside>
        <main className="w-full overflow-scroll bg-purple-200">
          {children}
        </main>
      </body>
    </html>
  );
}

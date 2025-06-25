'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();
    return (
    
    <ul className="mt-10 flex flex-col">
            <li className={ pathname ==='/' ? "m-1 p-1 text-xl text-purple-700" : "m-1 p-1 hover:text-xl hover:text-purple-700"}> 
              <Link href="/">Home</Link>
            </li>
            <li className={ pathname.startsWith('/test') ? "m-1 p-1 text-xl text-purple-700" : "m-1 p-1 hover:text-xl hover:text-purple-700"}>
              <Link href="/test">Tests</Link>
            </li>
            <li className={ pathname.startsWith('/Questions') ? "m-1 p-1 text-xl text-purple-700" : "m-1 p-1 hover:text-xl hover:text-purple-700"}>
              <Link href="/questions">Questions</Link>
            </li>
            <li className={ pathname.startsWith('/profile') ? "m-1 p-1 text-xl text-purple-700" : "m-1 p-1 hover:text-xl hover:text-purple-700"}>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
    );
}
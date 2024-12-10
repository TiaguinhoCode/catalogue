'use client';

// Bibliotecas
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Next
import Link from "next/link";

// Tipagem
interface ActiveLinkProps {
    href: string;
    children: ReactNode;
}

export function ActiveLink({ href, children }: ActiveLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            className={`flex items-center space-x-4 px-4 py-3 rounded-md cursor-pointer transition-all ${isActive ? "bg-white text-blue-700 font-bold" : "hover:bg-white hover:text-blue-700"}`}
            href={href}
        >
            {children}
        </Link>
    );
}

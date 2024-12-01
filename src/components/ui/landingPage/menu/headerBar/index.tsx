'use client';

// Imagem
import slogan from "./../../../../../../public/slogan.png";

// Next
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Para pegar o caminho atual

// Biblioteca
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";

export function HeaderBar() {
    const pathname = usePathname(); 

    return (
        <Navbar
            isBordered
            className="bg-white w-full fixed z-50 border-b border-gray-200"
        >
            <NavbarBrand className="flex items-center gap-2 py-2">
                <Link href="/" className="flex items-center justify-center">
                    <Image
                        src={slogan}
                        alt="Logo Cataloguê"
                        quality={100}
                        priority
                        className="w-[86px]"
                    />
                    <p className="font-bold text-gray-900 text-lg">Cataloguê</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                <NavbarItem isActive={pathname === '/Features'}>
                    <Link
                        href="/features"
                        className={`transition-colors duration-300 ${pathname === '/features' ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500'
                            }`}
                    >
                        Funcionalidades
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathname === '/integration'}>
                    <Link
                        href="/integration"
                        className={`transition-colors duration-300 ${pathname === '/integration' ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500'
                            }`}
                    >
                        Integração
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathname === '/plans'}>
                    <Link
                        href="/plans"
                        className={`transition-colors duration-300 ${pathname === '/plans' ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500'
                            }`}
                    >
                        Planos
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathname === '/help'}>
                    <Link
                        href="/help"
                        className={`transition-colors duration-300 ${pathname === '/help' ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500'
                            }`}
                    >
                        Material de ajuda
                    </Link>
                </NavbarItem>
            </NavbarContent>
            
            <NavbarContent justify="end" className="items-center hidden sm:flex">
                <NavbarItem>
                    <Button
                        as="a"
                        target="_blank"
                        href="https://wa.me/5585987805592/?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20seu%20sistema%20e%20as%20informações%20disponíveis."
                        color="primary"
                        variant="ghost"
                        className="hover:font-semibold transition-transform duration-300 transform hover:scale-105"
                    >
                        Chamar no WhatsApp
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

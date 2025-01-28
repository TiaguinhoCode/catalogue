'use client'

// Next
import { usePathname } from "next/navigation";
import Link from "next/link";

// Componentes
import { Container } from "../../container";
import { FaBell, FaCreditCard, FaLock, FaUser, FaUsers } from "react-icons/fa";

// React
import { useEffect, useState } from "react";

export function SettingsMenu() {
    const pathname = usePathname();
    const company = usePathname().split('/')[1];

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/create`);

    const menuItems = [
        {
            href: `/${pathname ? company : ''}/admin/settings`,
            icon: <FaUser />,
            label: "Minha conta"
        },
        {
            href: `/${pathname ? company : ''}/admin/settings/users`,
            icon: <FaUsers />,
            label: "Gerenciamento Funcionário"
        },
        {
            href: `/${pathname ? company : ''}/admin/settings/notify`,
            icon: <FaBell />,
            label: "Notificação"
        },
        {
            href: `/${pathname ? company : ''}/admin/settings/security`,
            icon: <FaLock />,
            label: "Segurança da conta"
        },
        {
            href: `/${pathname ? company : ''}/admin/settings/signature`,
            icon: <FaCreditCard />,
            label: "Assinatura"
        }
    ];

    return (
        <Container>
            <h4 className="text-gray-600 font-bold text-2xl border-b border-gray-200 pb-2 mb-6">
                Configurações
            </h4>
            <nav className="flex flex-col space-y-3">
                {menuItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <p
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
                            ${isActive(item.href)
                                    ? 'bg-blue-100 text-blue-600 font-semibold shadow'
                                    : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-500'
                                }`}
                            aria-current={isActive(item.href) ? "page" : undefined}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.label}</span>
                        </p>
                    </Link>
                ))}
            </nav>
        </Container>
    );
}

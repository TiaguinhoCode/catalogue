'use client'

// Next
import { usePathname } from "next/navigation";
import Link from "next/link";

// Componentes
import { Container } from "../../container";
import { FaBell, FaLock, FaUser, FaUsers } from "react-icons/fa";

export function SettingsMenu() {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (
        <Container>
            <h4 className="text-gray-600 font-bold text-2xl border-b border-gray-200 pb-4 mb-6">
                Configurações
            </h4>
            <section className="flex flex-col space-y-3">
                <Link href={`/${pathname.split('/')[1]}/admin/settings/profile`}>
                    <span
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(`/${pathname.split('/')[1]}/admin/settings/profile`)
                            ? 'bg-blue-100 text-blue-600 font-semibold'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-500'
                            }`}
                    >
                        <FaUser />
                        <span>Minha conta</span>
                    </span>
                </Link>
                <Link href={`/${pathname.split('/')[1]}/admin/settings/users`}>
                    <span
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(`/${pathname.split('/')[1]}/admin/settings/users`)
                            ? 'bg-blue-100 text-blue-600 font-semibold'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-500'
                            }`}
                    >
                        <FaUsers />
                        <span>Gerenciamento de usuário</span>
                    </span>
                </Link>
                <Link href={`/${pathname.split('/')[1]}/admin/notify`}>
                    <span
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(`/${pathname.split('/')[1]}/admin/settings/notify`)
                            ? 'bg-blue-100 text-blue-600 font-semibold'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-500'
                            }`}
                    >
                        <FaBell />
                        <span>Notificação</span>
                    </span>
                </Link>
                <Link href={`/${pathname.split('/')[1]}/admin/settings/security`}>
                    <span
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(`/${pathname.split('/')[1]}/admin/settings/security`)
                            ? 'bg-blue-100 text-blue-600 font-semibold'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-500'
                            }`}
                    >
                        <FaLock />
                        <span>Segurança da conta</span>
                    </span>
                </Link>
            </section>
        </Container>
    )
}
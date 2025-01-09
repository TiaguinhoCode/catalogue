'use client'

// Next
import { usePathname } from "next/navigation";
import Link from "next/link";

// Componentes
import { Container } from "../../container";

export function SettingsMenu() {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (
        <Container>
            <h4 className="text-gray-600 font-bold pb-4 text-xl border-b border-gray-300">
                Configuração
            </h4>
            <section className="flex flex-col space-y-3 mt-4">
                <Link href={`/${pathname.split("/")[1]}/admin/settings/profile`}>
                    <span
                        className={`${isActive(`/${pathname.split("/")[1]}/admin/settings/profile`)
                            ? "text-blue-500 font-semibold"
                            : "text-gray-700 hover:text-blue-500 hover:font-medium"
                            } text-sm transition`}
                    >
                        Minha conta
                    </span>
                </Link>
                <Link href={`/${pathname.split("/")[1]}/admin/users`}>
                    <span
                        className={`${isActive(`/${pathname.split("/")[1]}/admin/users`)
                            ? "text-blue-500 font-semibold"
                            : "text-gray-700 hover:text-blue-500 hover:font-medium"
                            }  transition`}
                    >
                        Usuário
                    </span>
                </Link>
                <Link href={`/${pathname.split("/")[1]}/admin/notify`}>
                    <span
                        className={`${isActive(`/${pathname.split("/")[1]}/admin/notify`)
                            ? "text-blue-500 font-semibold"
                            : "text-gray-700 hover:text-blue-500 hover:font-medium"
                            } transition`}
                    >
                        Notificação
                    </span>
                </Link>
            </section>
        </Container>
    )
}
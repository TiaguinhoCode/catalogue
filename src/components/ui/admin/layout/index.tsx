'use client'

// React
import { ReactNode, useState } from "react";

// Componentes
import { SideBar } from "../menu/sideBar";
import { HeaderBar } from "../menu/headerBar";

// Tipagem
interface LayoutProps {
    children: ReactNode
    companies: string | undefined
}

export function Layout({ children, companies }: LayoutProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <SideBar isExpanded={isExpanded} companies={companies} />
            <div className="flex flex-1">
                <main
                    className={`flex-1 transition-all duration-300 ${isExpanded ? "ml-56" : "ml-16"
                        }`}
                >
                    <HeaderBar setIsExpanded={() => setIsExpanded(!isExpanded)} />
                    <div className="p-6">{children}</div>
                </main>
            </div>
        </div>
    );
}


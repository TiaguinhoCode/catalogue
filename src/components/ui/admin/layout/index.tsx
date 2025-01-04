'use client'

// React
import { ReactNode, useState } from "react";

// Componentes
import { SideBar } from "../menu/sideBar";
import { HeaderBar } from "../menu/headerBar";
import NotFound from "@/app/not-found";

// Next
import { usePathname } from "next/navigation";

// Dados
import companiesData from '@/data/settings/companies.json';

// Tipagem
interface LayoutProps {
    children: ReactNode
    companies: string | undefined
}

export function Layout({ children, companies }: LayoutProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const pathName = usePathname().split("/")[1];
    const company = companiesData.find(
        (c) => c.name.toLowerCase() === pathName.toLowerCase()
    );

    if (!company) {
        return <NotFound />;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-blue-600">
            <SideBar isExpanded={isExpanded} companies={companies} />
            <div
                className={`flex-1 flex flex-col m-3 bg-[#f1f1f8] rounded-2xl transition-all duration-300 ${isExpanded ? "ml-56" : "ml-16"
                    }`}
            >
                <HeaderBar setIsExpanded={() => setIsExpanded(!isExpanded)} />
                <div className="flex-1 p-4 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}


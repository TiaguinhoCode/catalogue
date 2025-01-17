// React
import { ReactNode } from "react";

// Componentes
import { SettingsMenu } from "@/components/ui/subMenu/settings";

export default async function SettingsLayout({ children }: { children: ReactNode }) {
    return (
        <main className="w-full flex flex-col md:flex-row md:space-x-6 ">
            <aside className="w-full md:w-1/4">
                <SettingsMenu />
            </aside>

            <section className="w-full md:w-3/4 ">
                {children}
            </section>
        </main>
    )
}
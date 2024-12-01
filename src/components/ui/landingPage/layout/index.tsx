// Componentes
import Footer from "../footer";
import { HeaderBar } from "../menu/headerBar";

// React
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="w-full">
            <HeaderBar />
            {children}
            <Footer />
        </div>
    )
}
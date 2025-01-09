// Componentes
import Footer from "../footer";
import { HeaderBar } from "../menu/headerBar";

// Next
import { cookies } from "next/headers";

// React
import { ReactNode } from "react";

export async function Layout({ children }: { children: ReactNode }) {
    const cookieStore = await cookies();

    const token = cookieStore.get('@nextauth.token')?.value;
    const company = cookieStore.get('@nextcompany.name')?.value;

    return (
        <div className="w-full">
            <HeaderBar token={token} company={company} />
            {children}
            <Footer />
        </div>
    )
}
// React
import React from "react";

// Componentes
import { Layout } from "@/components/ui/landingPage/layout";

export default function LandingRouter({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full bg-[#f7f7f7] ">
            <Layout>
                {children}
            </Layout>
        </div>
    )
}
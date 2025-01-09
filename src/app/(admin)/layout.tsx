// React
import React, { ReactNode } from "react";

// Componentes
import { Layout } from "@/components/ui/admin/layout";

// Next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminRouter({ children }: { children: ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('@nextauth.token')?.value;
    const companies = cookieStore.get('@nextcompany.name')?.value;

    if (!token && !companies) {
        redirect('/')
    }

    return (
        <Layout companies={companies}>
            {children}
        </Layout>
    )
}   
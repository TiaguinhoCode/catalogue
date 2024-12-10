// React
import React, { ReactNode } from "react";

// Next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SigInRouter({ children }: { children: ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('@nextauth.token')?.value;
    const companies = cookieStore.get('@nextcompany.name')?.value;

    if (token && companies) {
        redirect(`/${companies}/admin`)
    }

    return (
        <div className="w-full bg-[#f7f7f7] ">
            {children}
        </div>
    )
}
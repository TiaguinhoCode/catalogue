// React
import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
    return (
        <main className="bg-white p-6 rounded-lg shadow-md my-3">{children}</main>
    )
}
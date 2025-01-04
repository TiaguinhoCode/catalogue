// React
import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
    return (
        <main className="bg-white p-4 rounded-2xl shadow-md">
            {children}
        </main>
    );
}

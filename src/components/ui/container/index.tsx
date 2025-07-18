// React
import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
    return (
        <main className="bg-white w-full p-4 rounded-xl shadow-md">
            {children}
        </main>
    );
}

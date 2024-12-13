// Biblioteca
import { AiOutlineLoading } from "react-icons/ai";

export function Loading() {
    return (
        <div className="flex flex-col items-center justify-center space-y-3 p-4">
            <AiOutlineLoading className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-blue-700 font-semibold text-sm animate-pulse">
                Carregando...
            </p>
        </div>
    );
}

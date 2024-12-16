// Biblioteca
import { FaFilter, FaPlus, FaSync } from "react-icons/fa";

// Componentes
import { Input } from "../input";
import { Button } from "../button";

// Next
import Link from "next/link";
import { usePathname } from "next/navigation";

// Tipagem 
interface ToolBarProps {
    search: string;
    setSearch: (value: string) => void
}

export function ToolBar({ search, setSearch }: ToolBarProps) {
    const company = usePathname().split("/")[1];

    return (
        <div className="flex flex-wrap items-center justify-between ">
            <div className="flex items-center w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
                <Input isSearch={true} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full" />
            </div>

            <div className="flex items-center space-x-4">
                <button
                    className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none transition-transform transform hover:scale-105"
                    title="Filtrar produtos"
                >
                    <FaFilter size={16} />
                </button>

                <Button
                    aria-label="Recarregar"
                    className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-transform transform hover:scale-105"
                >
                    <FaSync size={18} />
                    Recarregar
                </Button>

                <Link href={`/${company}/admin/products/create`}>
                    <Button
                        aria-label="Adicionar produto"
                        className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition-transform transform hover:scale-105"
                    >
                        <FaPlus size={18} />
                        Adicionar Produto
                    </Button>
                </Link>
            </div>
        </div>
    );
}

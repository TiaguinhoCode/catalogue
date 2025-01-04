// Biblioteca
import { FaFilter, FaPlus, FaSync } from "react-icons/fa";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdFilterAltOff } from "react-icons/md";

// Componentes
import { Input } from "../input";
import { Button } from "../button";

// Next
import Link from "next/link";
import { RiFileExcel2Line } from "react-icons/ri";

// Tipagem 
interface ToolBarProps {
    search: string;
    hrefe: string;
    descriptionBtn: string;
    setSearch: (value: string) => void;
    refresh: () => void;
    clearFilter: () => void;
    filter?: () => void;
    exportToExcel?: () => void
}

export function ToolBar({ search, hrefe, descriptionBtn, setSearch, refresh, clearFilter, filter, exportToExcel }: ToolBarProps) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 p-2">
            <div className="flex-1 w-full sm:w-auto">
                <Input
                    variant="bordered"
                    isSearch={true}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar produtos..."
                    className="w-full sm:w-[300px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div className="flex items-center space-x-2">
                <button
                    className={`${!filter && 'hidden'} flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none transition-transform transform hover:scale-105`}
                    title="Filtrar produtos"
                >
                    <FaFilter className="text-lg" />
                </button>

                <Button
                    onClick={refresh}
                    aria-label="Recarregar"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-transform transform hover:scale-105"
                >
                    <FaSync className="text-lg" />
                    Recarregar
                </Button>

                <Link href={hrefe}>
                    <Button
                        aria-label="Adicionar produto"
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition-transform transform hover:scale-105"
                    >
                        <FaPlus className="text-lg" />
                        {descriptionBtn}
                    </Button>
                </Link>

                <Dropdown>
                    <DropdownTrigger>
                        <button
                            className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 focus:outline-none transition-transform transform hover:scale-110"
                            title="Opções adicionais"
                        >
                            <BiDotsVerticalRounded className="text-2xl text-gray-600" />
                        </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Opções do menu">
                        <DropdownItem
                            onClick={clearFilter}
                            key="clearFilters"
                            startContent={<MdFilterAltOff className="text-xl text-blue-500 pointer-events-none flex-shrink-0" />}
                        >
                            Remover Filtros
                        </DropdownItem>
                        <DropdownItem
                            key="exportExcel"
                            onClick={exportToExcel}
                            className={`${!exportToExcel && 'hidden'}`}
                            startContent={<RiFileExcel2Line className="text-xl text-green-700 pointer-events-none flex-shrink-0" />}
                        >
                            Exportar para Excel
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
}

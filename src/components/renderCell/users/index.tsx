'use client'

// Bibliotecas
import { Avatar, Tooltip } from "@nextui-org/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

// Next
import Link from "next/link";

// Tipagem
import { ItemsUser } from "@/types/users";

export const renderCell = (
    item: ItemsUser,
    columnUid: string,
    company?: string,
    handleRemove?: (id: string) => void
) => {
    switch (columnUid) {
        case "imagem":
            return <Avatar src={item.photo ? item.photo : ''} radius="md" />;
        case "nome":
            return (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{item.name} {item.surname}</span>
                    <span
                        className="text-sm w-52 text-gray-500 truncate"
                        title={item.email}
                    >
                        {item.email}
                    </span>
                </div>
            );
        case "telefone":
            return <span className="text-sm w-52 text-gray-500 truncate">{item.phone}</span>;
        case "cep":
            return <span className="text-sm w-52 text-gray-500 truncate">{item.cep}</span>;
        case "regra":
            return <span className="text-sm w-52 text-gray-500 truncate">{item.role}</span>;
        case "status":
            return <span className={`font-semibold ${item.is_active ? 'text-green-500' : 'text-red-500'}`}>{item.is_active ? "Ativo" : "Desativado"}</span>;
        case "acao":
            return (
                <div className="relative flex items-center gap-3">
                    <Tooltip placement="left-start" content="Editar Produto">
                        <Link
                            href={``}
                            className="text-lg text-blue-500 cursor-pointer hover:text-blue-700 transition-all duration-300 ease-in-out active:opacity-70"
                        >
                            <FaPencilAlt size={18} />
                        </Link>
                    </Tooltip>

                    <Tooltip color="danger" placement="left-start" content="Excluir Produto">
                        <button
                            onClick={() => handleRemove && handleRemove(item.id as string)}
                            className="text-lg text-red-500 cursor-pointer hover:text-red-700 transition-all duration-300 ease-in-out active:opacity-70"
                        >
                            <FaTrashAlt size={18} />
                        </button>
                    </Tooltip>
                </div>
            );
        default:
            return null;
    }
};

'use client'

// Utils
import { formatCurrency } from "@/utils/mask/money";

// Bibliotecas
import { Avatar, AvatarGroup, Tooltip, User } from "@nextui-org/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";

// Tipagem
import { ItemsProducts } from "@/types/products";

export const renderCell = (item: ItemsProducts, columnKey: string) => {
    switch (columnKey) {
        case "imagem":
            const imageUrls =
                Array.isArray(item.Banner) && item.Banner.length > 0
                    ? item.Banner.map(banner => banner.image_url)
                    : [];
            const maxVisibleAvatars = 3; // Limite de avatares visíveis

            return (
                <AvatarGroup radius="lg">
                    {imageUrls.length > 0 ? (
                        <>
                            {imageUrls.slice(0, maxVisibleAvatars).map((url, index) => (
                                <Avatar key={index} src={url} />
                            ))}
                            {imageUrls.length > maxVisibleAvatars && (
                                <Avatar>
                                    <span className="text-sm font-bold">
                                        +{imageUrls.length - maxVisibleAvatars}
                                    </span>
                                </Avatar>
                            )}
                        </>
                    ) : (
                        <Avatar icon={<MdImageNotSupported />} />
                    )}
                </AvatarGroup>
            );
        case "nome":
            return <span className="font-medium">{item.name}</span>;
        case "ativo":
            return <span className={`font-semibold ${item.is_active ? 'text-green-500' : 'text-red-500'}`}>{item.is_active ? "sim" : "não"}</span>;
        case "Promocao":
            return <span className={`font-semibold ${item.promotion ? 'text-green-500' : 'text-yellow-500'}`}>{item.promotion ? "sim" : "não"}</span>;
        case "Preco":
            return <span className="font-medium">{item.promotion ? formatCurrency(item.discount_price) : formatCurrency(item.price)}</span>;
        case "Acao":
            return (
                <div className="relative flex items-center gap-3">
                    <Tooltip placement="left-start" content="Editar Produto">
                        <span className="text-lg text-blue-500 cursor-pointer hover:text-blue-700 transition-all duration-300 ease-in-out active:opacity-70">
                            <FaPencilAlt />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" placement="left-start" content="Excluir Produto">
                        <span className="text-lg text-red-500 cursor-pointer hover:text-red-700 transition-all duration-300 ease-in-out active:opacity-70">
                            <FaTrashAlt />
                        </span>
                    </Tooltip>
                </div>
            );
        default:
            return null;
    }
};

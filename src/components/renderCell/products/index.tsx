'use client'

// Utils
import { formatCurrency } from "@/utils/mask/money";

// Bibliotecas
import { Avatar, AvatarGroup, Tooltip } from "@nextui-org/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdCampaign, MdImageNotSupported } from "react-icons/md";

// Next
import Link from "next/link";

// Tipagem
import { ItemsProducts } from "@/types/products";

export const renderCell = (
    item: ItemsProducts,
    columnUid: string,
    company: string,
    handleRemove: (id: string) => void,
    createPromotion?: (id: string) => void,
) => {
    switch (columnUid) {
        case "imagem":
            const imageUrls =
                Array.isArray(item.Banner) && item.Banner.length > 0
                    ? item.Banner.map(banner => banner.image_url)
                    : [];
            const maxVisibleAvatars = 3;

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
            return (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{item.name}</span>
                    {item.description && (
                        <span
                            className="text-sm w-52 text-gray-500 truncate"
                            title={item.description} 
                        >
                            {item.description}
                        </span>
                    )}
                </div>
            );

        case "ativo":
            return <span className={`font-semibold ${item.is_active ? 'text-green-500' : 'text-red-500'}`}>{item.is_active ? "sim" : "não"}</span>;
        case "Promocao":
            return <span className={`font-semibold ${item.promotion ? 'text-green-500' : 'text-yellow-500'}`}>{item.promotion ? "sim" : "não"}</span>;
        case "Preco":
            return (
                <span className="font-medium">
                    {item.promotion ? (
                        <>
                            <span className="line-through text-gray-500 mr-2">
                                {formatCurrency(item.price)}
                            </span>
                            <span className="text-green-500">
                                {formatCurrency(item.discount_price)}
                            </span>
                        </>
                    ) : (
                        <span>{formatCurrency(item.price)}</span>
                    )}
                </span>
            );

        case "Acao":
            return (
                <div className="relative flex items-center gap-3">
                    <Tooltip placement="left-start" content="Editar Produto">
                        <Link
                            href={`/${company}/admin/products/edit/${item.id}`}
                            className="text-lg text-blue-500 cursor-pointer hover:text-blue-700 transition-all duration-300 ease-in-out active:opacity-70"
                        >
                            <FaPencilAlt size={18} />
                        </Link>
                    </Tooltip>

                    <Tooltip color="danger" placement="left-start" content="Excluir Produto">
                        <button
                            onClick={() => handleRemove(item.id as string)}
                            className="text-lg text-red-500 cursor-pointer hover:text-red-700 transition-all duration-300 ease-in-out active:opacity-70"
                        >
                            <FaTrashAlt size={18} />
                        </button>
                    </Tooltip>

                    <Tooltip placement="left-start" content="Lançar Promoção">
                        <button
                            onClick={() => createPromotion && createPromotion(item.id as string)}
                            className="text-lg text-green-500 cursor-pointer hover:text-green-700 transition-all duration-300 ease-in-out active:opacity-70"
                        >
                            <MdCampaign size={28} />
                        </button>
                    </Tooltip>
                </div>
            );
        default:
            return null;
    }
};

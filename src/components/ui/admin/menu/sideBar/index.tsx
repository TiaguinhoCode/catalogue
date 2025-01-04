'use client'

// Bibliotecas
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Tooltip } from "@nextui-org/react";
import { FaUserAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";

// React
import { useContext } from "react";
import { AuthContext } from '@/contexts/auth'

// Imagem
import slogan from "./../../../../../../public/slogan.png";

// Next
import Image from "next/image";
import { ActiveLink } from "../activeLink";import { IoPricetagsOutline } from "react-icons/io5";

// Tipagem
interface SideBarProps {
    isExpanded: boolean;
    companies: string | undefined;
}

export function SideBar({ isExpanded, companies }: SideBarProps) {
    const { signOut, user } = useContext(AuthContext);

    const menuItems = [
        { label: "Dashboard", icon: <AiOutlineDashboard size={25} />, href: `/${companies}/admin` },
        { label: "Produtos", icon: <IoPricetagsOutline size={25} />, href: `/${companies}/admin/products` },
    ];

    return (
        <div
            className={`fixed flex flex-col top-0 left-0 h-screen ${isExpanded ? "w-56" : "w-16"
                }  text-white transition-all duration-300`}
        >

            <div
                className={`flex flex-col items-center justify-center ${isExpanded ? "" : ""
                    }`}
            >
                <Image
                    src={slogan}
                    alt="Logo Cataloguê"
                    quality={100}
                    priority
                    className={isExpanded ? 'w-[120px]' : 'w-[80px]'}
                />
            </div>

            <ul className="flex-1 py-3 space-y-2 px-1">
                {menuItems.map((item, index) => (
                    <ActiveLink key={index} href={item.href}>
                        <Tooltip
                            key={index}
                            placement="right"
                            content={item.label}
                            className={isExpanded ? 'hidden' : ''}
                            color="default"
                        >
                            <span className="h-6 w-6 flex items-center justify-center">
                                {item.icon}
                            </span>
                        </Tooltip>
                        <span className={`${isExpanded ? "block" : "hidden"} text-sm font-medium`}>
                            {item.label}
                        </span>
                    </ActiveLink>
                ))}
            </ul>

            <div className="px-2 py-2 mb-4">
                <Dropdown aria-label="User Actions">
                    <DropdownTrigger>
                        <div className="flex items-center space-x-2 cursor-pointer rounded-lg p-2 transition-all duration-200 bg-gray-100 hover:bg-blue-50 hover:shadow-lg">
                            <div className="p-2 rounded-full bg-blue-500 flex items-center justify-center">
                                <FaUserAlt size={15} className="text-white" />
                            </div>
                            <div className={`flex flex-col transition-opacity duration-200 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
                                <p className="text-sm font-semibold text-gray-700">
                                    {user?.name} {user?.surname}
                                </p>
                                <span className="text-xs text-gray-500">
                                    {user?.email}
                                </span>
                            </div>
                        </div>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="User Actions" className="w-64">
                        <DropdownItem key="profile" className="py-3 hover:bg-gray-100">
                            <div>
                                <p className="text-sm font-bold text-gray-800">
                                    {user?.name} {user?.surname}
                                </p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        </DropdownItem>

                        <DropdownItem key="configurations" className="py-2 hover:bg-gray-100">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-700">Configurações</span>
                            </div>
                        </DropdownItem>

                        <DropdownItem key="logout" color="danger" className="py-2 hover:bg-red-50">
                            <button
                                onClick={signOut}
                                className="flex items-center justify-between w-full text-red-600 hover:text-white"
                            >
                                <p className="text-sm">Sair do sistema</p>
                                <CiLogout size={18} />
                            </button>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

        </div>
    );
}

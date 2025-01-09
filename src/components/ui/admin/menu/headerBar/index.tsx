'use client'

// React
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/auth";

// Bibliotecas
import { FaCloud } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { HiOutlineCog } from "react-icons/hi";
import { MdNotifications } from "react-icons/md";
import { CgMenuRight } from "react-icons/cg";

// Next
import { usePathname } from "next/navigation";
import Link from "next/link";

// Tipagem
interface HeaderBarProps {
    setIsExpanded: () => void;
}

export function HeaderBar({ setIsExpanded }: HeaderBarProps) {
    const { user, signOut } = useContext(AuthContext);
    const router = usePathname();

    const [currentDate, setCurrentDate] = useState<string>("");

    useEffect(() => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        };
        const today = new Date();
        const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(today);
        setCurrentDate(formattedDate);
    }, []);

    const breadcrumbs = router
        .split("/")
        .filter(Boolean)
        .map((crumb, index, array) => {
            if (
                (crumb === "edit" || crumb === "create") &&
                array.length === index + 2
            ) {
                return crumb;
            }
            if (index === array.length - 1 && array[index - 1] === "edit") {
                return null;
            }
            return crumb;
        })
        .filter(Boolean);

    return (
        <nav className="block px-6 w-full text-gray-800 py-3 ">
            <div className="flex flex-col-reverse justify-between md:flex-row md:items-center space-x-4">
                <div className="capitalize justify-start w-full">
                    <div className="flex items-center space-x-2">
                        <FaCloud className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">{currentDate}</span>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center w-full">
                    <nav aria-label="breadcrumb" className="w-max">
                        <ol className="flex flex-wrap items-center w-full bg-opacity-70 rounded-md bg-transparent p-0 transition-all">
                            {breadcrumbs.map((crumb, index) => (
                                <li key={index} className="flex items-center text-gray-600 font-medium text-sm cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                    {index < breadcrumbs.length - 1 ? (
                                        <a href={`/${breadcrumbs.slice(0, index + 1).join("/")}`}>
                                            <p className="block text-gray-500 font-normal opacity-60 transition-all hover:text-blue-500">{crumb}</p>
                                        </a>
                                    ) : (
                                        <p className="block text-gray-600 font-normal">{crumb}</p>
                                    )}
                                    {index < breadcrumbs.length - 1 && (
                                        <span className="text-gray-500 text-sm mx-2 pointer-events-none select-none">/</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                    <h6 className="block font-sans text-lg font-semibold leading-relaxed text-gray-800 mt-2">
                        {breadcrumbs[breadcrumbs.length - 1] || "Home"}
                    </h6>
                </div>

                <div className="flex items-center justify-end w-full space-x-4">
                    <Dropdown classNames={{ trigger: "p-2 rounded-full hover:bg-gray-200 transition" }} aria-label="User Actions">
                        <DropdownTrigger>
                            <div className="flex items-center space-x-2 cursor-pointer rounded-lg p-2 transition-all duration-200">
                                <div className="flex items-center justify-center">
                                    <Avatar src={user?.photo} alt="Foto do usuário" as="button" className="transition-transform" classNames={{ base: "w-8 h-8 relative overflow-hidden bg-blue-500 text-white" }} />
                                </div>
                                <div className="flex flex-col transition-opacity duration-200">
                                    <p className="text-sm font-bold text-gray-700">
                                        {user?.name} {user?.surname}
                                    </p>
                                    <span className="text-xs font-semibold text-gray-500">
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

                            <DropdownItem key="configurations" href={`/${router.split("/")[1]}/admin/settings/profile`} className="py-2 hover:bg-gray-100">
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

                    <Link href={`/${router.split("/")[1]}/admin/settings/profile`} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 shadow-lg">
                        <HiOutlineCog className="text-2xl text-gray-700" />
                    </Link>
                    <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 shadow-lg">
                        <MdNotifications className="text-2xl text-gray-700" />
                    </button>
                    <button onClick={setIsExpanded} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 shadow-lg">
                        <CgMenuRight className="text-2xl text-gray-700" />
                    </button>
                </div>
            </div>
        </nav>
    );
}

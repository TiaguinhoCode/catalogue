'use client'

// React
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth";

// Bibliotecas
import { FaRegUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

// Next
import { usePathname } from 'next/navigation';

// Tipagem
interface HeaderBarProps {
    setIsExpanded: () => void;
}

export function HeaderBar({ setIsExpanded }: HeaderBarProps) {
    const { user } = useContext(AuthContext);
    const router = usePathname()

    return (
        <nav className="bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow-lg transition-all duration-300 mx-4 px-4 py-2 rounded-lg my-2">
            <div className="flex justify-between items-center">
                <button
                    onClick={setIsExpanded}
                    className="p-2 rounded-md hover:bg-blue-600"
                >
                    <FiMenu size={24} className="text-white" />
                </button>

                <div className="flex flex-col items-start md:items-center">
                    <h6 className="text-base font-bold">
                        Dashboard
                    </h6>
                    <nav aria-label="breadcrumb">
                        <ol className="flex text-sm">
                            <li className="mr-1">
                                <a href="#" className="hover:text-blue-200">{router.split("/")[1]}</a>
                                <span className="px-1">/</span>
                            </li>
                            <li className="text-white font-medium">{router.split("/")[3]}</li>
                        </ol>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden  md:block">
                        <div className="flex">
                            <p className="text-sm space-x-1">
                                <span>{user?.name}</span>
                            </p>
                        </div>
                    </div>
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <FaRegUser size={20} className="text-white" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

'use client'

// Componentes
import { Container } from "@/components/ui/container";
import { Tabs } from "@/components/ui/tabs";
import { DateRangePicker } from "@nextui-org/react";

// Bibliotecas
import { IoIosArrowBack } from "react-icons/io";

export default function CreateProductsPage() {
    const tabs = [
        {
            key: "products",
            title: "Cadastrar Produtos",
        },
        {
            key: "combo",
            title: "Kit/Combo",
        },
        {
            key: "suppliers",
            title: "Fornecedores",
        },
    ];

    return (
        <Container>
            <div className="w-full flex flex-col space-y-6">
                <div className="flex items-center space-x-3 cursor-pointer text-gray-600 hover:text-gray-900 transition duration-200">
                    <IoIosArrowBack size={20} />
                    <p className="text-sm font-medium">Voltar</p>
                </div>

                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">Gerenciar Produtos</h1>
                </div>
                <DateRangePicker />
                <div className="w-full">
                    <Tabs tabs={tabs} />
                </div>
            </div>
        </Container>
    );
}

'use client'

// Componentes
import { Container } from "@/components/ui/container";
import { ListBox } from "@/components/ui/listBox";
import { ToolBar } from "@/components/ui/toolbar";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { renderCell } from "@/components/renderCell/products";
import { Modal } from "@/components/ui/modal";
import { ContainerModal } from "@/components/ui/container/containerModal/categories";

// Bibliotecas
import { useDisclosure } from "@nextui-org/react";
import { setupApiClient } from "@/services/api";

// Dados
import columns from "@/data/columns/products/columns.json"

// Tipagem
import { ItemsCategories } from "@/types/categories";
import { ItemsProducts } from "@/types/products";

// Utils
import { SearchFilter } from "@/utils/filters/searchFilter";

// React
import { useState } from "react";

interface ContainerProductsProps {
    categories: ItemsCategories[]
    dataProducts: ItemsProducts[]
    token: string | undefined;
}

export function ContainerProducts({ categories, dataProducts, token }: ContainerProductsProps) {
    const [products, setProducts] = useState(dataProducts)
    const [searchParams, setSearchParams] = useState<string>('')

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const filterSearch = SearchFilter({ data: products, search: searchParams })
    const api = setupApiClient(token)

    return (
        <>
            <Container>
                <ToolBar search={searchParams} setSearch={setSearchParams} />
                <div className="flex flex-col lg:flex-row gap-6 py-2">
                    <aside className="p-4 ">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorias</h3>
                        <div className="h-64 overflow-auto">
                            <ListBox lists={categories} displayKey="name" />
                        </div>
                        <div className="border-b my-2 border-gray-300"></div>
                        <Button
                            aria-label="Adicionar Categoria"
                            onClick={onOpen}
                            className='w-full'
                            color="primary"
                            variant="ghost"
                            size="md"
                        >
                            Adicionar Categoria
                        </Button>
                    </aside>

                    <div className="border-r border-gray-300"></div>

                    <main className="flex-1 w-full p-4">
                        <Table data={filterSearch} collumns={columns} renderCell={renderCell} alert="O produto não foi encontrado."/>
                    </main>

                </div>
            </Container>
            <Modal isOpen={isOpen} title="Categorias" onClose={onOpenChange} >
                <ContainerModal categoriesData={categories} api={api} />
            </Modal>
        </>
    )
}
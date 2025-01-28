'use client'

// Componentes
import { Container } from "@/components/ui/container";
import { ListBox } from "@/components/ui/listBox";
import { ToolBar } from "@/components/ui/toolbar";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { renderCell } from "@/components/renderCell/products";
import { Modal } from "@/components/ui/modal";
import { ContainerModal as ModalCategories } from "@/components/ui/container/containerModal/categories";
import { ContainerModal as ModalProducts } from "@/components/ui/container/containerModal/productPromotion";

// Bibliotecas
import { useDisclosure } from "@nextui-org/react";
import { setupApiClient } from "@/services/api";
import { toast } from "react-toastify";

// Dados
import columns from "@/data/columns/products/columns.json"

// Utils
import { SearchFilter } from "@/utils/filters/searchFilter";

// React
import { useState } from "react";

// Next
import { usePathname } from "next/navigation";

// Tipagem
import { ItemsCategories } from "@/types/categories";
import { ItemsProducts } from "@/types/products";
import exportToExcel from "@/utils/relatory/excel/products";

interface ContainerProductsProps {
    categories: ItemsCategories[]
    dataProducts: ItemsProducts[]
    token: string | undefined;
}

export function ContainerProducts({ categories, dataProducts, token }: ContainerProductsProps) {
    const [products, setProducts] = useState(dataProducts)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingSelecting, setLoadingSelecting] = useState<boolean>(false)
    const [promotion, setPromotion] = useState<boolean>(false)
    const [selectingProduct, setSelectingProduct] = useState()
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [searchParams, setSearchParams] = useState<string>('')

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const company = usePathname().split("/")[1];
    const api = setupApiClient(token)

    async function handleRefresh() {
        setLoading(true)

        const resp = await api.get(`/v1/products?company=${company}`)
        setProducts(resp.products)

        setLoading(false)
    }

    async function handleRemove(id: string) {
        try {
            await api.delete(`/v1/products?id=${id}&company=${company}`)
            toast.success("Produto Removido com sucesso!")

            handleRefresh()
        } catch (err) {
            toast.error("Erro ao remover o produto!")
        }
    }

    async function handleCreatePromotion(id: string) {
        setLoadingSelecting(true)
        setPromotion(true)
        onOpen()

        const products = await api.get(`/v1/products?company=${company}&id=${id}`)
        setSelectingProduct(products.products)
        setLoadingSelecting(false)
    }

    const filteredProducts = SearchFilter({
        data: products.filter((product) =>
            selectedCategories.length > 0
                ? selectedCategories.includes(product.category.id)
                : true
        ),
        search: searchParams,
    });

    const handleExportToExcel = () => {
        exportToExcel(products, 'RelatorioProdutos');
    };

    return (
        <main className="w-full flex flex-row items-start justify-between gap-4 ">
            <div className="w-1/5">
                <Container>
                    <aside className="w-full">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorias</h3>
                        <div className="max-h-[400px] h-full overflow-auto border rounded-md p-2">
                            <ListBox lists={categories} displayKey="name" selectedKeys={selectedCategories} setSelectedKeys={setSelectedCategories} />
                        </div>
                        <Button
                            aria-label="Adicionar Categoria"
                            onClick={() => { setPromotion(false); onOpen(); }}
                            className="w-full mt-4"
                            color="primary"
                            variant="ghost"
                            size="md"
                        >
                            Adicionar Categoria
                        </Button>
                    </aside>
                </Container>
            </div>

            <div className="w-4/5">
                <Container>
                    <ToolBar
                        search={searchParams}
                        hrefe={`/${company}/admin/products/create`}
                        descriptionBtn="Adicionar Produto"
                        setSearch={setSearchParams}
                        refresh={handleRefresh}
                        clearFilter={() => setSelectedCategories([])}
                        exportToExcel={handleExportToExcel}
                        isDropdown={true}
                    />
                    <div className="mt-4">
                        <Table data={filteredProducts} handleRemove={handleRemove} createPromotion={handleCreatePromotion} loading={loading} collumns={columns} renderCell={renderCell} alert="O produto não foi encontrado." />
                    </div>
                </Container>
            </div>

            <Modal isOpen={isOpen} title={promotion ? "Promoção" : "Categorias"} onClose={onOpenChange}>
                {promotion ? <ModalProducts loadingSelecting={loadingSelecting} productsData={selectingProduct} api={api} refresh={handleRefresh} /> : <ModalCategories categoriesData={categories} api={api} />}
            </Modal>
        </main>
    )
}
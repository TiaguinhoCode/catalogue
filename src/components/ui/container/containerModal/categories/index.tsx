// Componentes
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";

// React
import { SyntheticEvent, useState } from "react";

// Bibliotecas
import { setupApiClient } from "@/services/api";
import { toast } from "react-toastify";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";

// Next
import { usePathname } from "next/navigation";

// Utils
import { SearchFilter } from "@/utils/filters/searchFilter";

// Tipagem
import { ItemsCategories } from "@/types/categories";
interface ContainerModalProps {
    categoriesData: ItemsCategories[];
    api: ReturnType<typeof setupApiClient>;
}

export function ContainerModal({ categoriesData, api }: ContainerModalProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [categories, setCategories] = useState(categoriesData)
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<ItemsCategories | null>(null);
    const [searchParams, setSearchParams] = useState<string>('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const company = usePathname().split("/")[1];

    const fetchCategories = async () => {
        try {
            const resp = await api.get(`/v1/category?company=${company}`);
            setCategories(resp.category);
        } catch (err) {
            toast.error("Erro ao carregar as categorias.");
        }
    };

    async function handleCreateCategory(e: SyntheticEvent) {
        e.preventDefault();

        setLoading(true);

        if (!name.trim()) {
            setError(true);
            setLoading(false);
            return;
        }

        try {
            if (selectedCategory) {
                await api.put(`/v1/category?company=${company}&id=${selectedCategory.id}`, { name });
                toast.success("Categoria atualizada com sucesso!");
            } else {
                await api.post(`/v1/category?company=${company}`, { name });
                toast.success("Categoria criada com sucesso!");
            }

            setIsFormOpen(false);
            setError(false);
            setName("");

            await fetchCategories()
        } catch (err) {
            toast.error("Erro ao criar a categoria. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    async function handleEditCategory(category: ItemsCategories) {
        setSelectedCategory(category);
        setName(category.name);
        setIsFormOpen(true);
    }

    async function handleRemoveCategory(category: ItemsCategories) {
        try {
            setLoading(true)
            await api.delete(`/v1/category?company=${company}&id=${category.id}`)
            await fetchCategories()
            toast.success("Categoria removida com sucesso!");
        } catch (err) {
            toast.error("Erro ao excluir a categorias.");
        } finally {
            setLoading(false)
        }
    }

    const filterSearch = SearchFilter({ data: categories, search: searchParams })

    if (loading) {
        return (
            <main className="min-h-[300px] h-full flex items-center justify-center">
                <Loading />
            </main>
        );
    }

    return (
        <div className="w-full max-w-lg mx-auto p-4 relative min-h-[300px]">
            <div
                className={`absolute inset-0 transition-all duration-300 ease-in-out ${isFormOpen ? "opacity-0 pointer-events-none scale-95" : "opacity-100"
                    }`}
            >
                <Input
                    aria-label="Filtro de pesquisa"
                    value={searchParams}
                    onChange={(e) => setSearchParams(e.target.value)}
                    isSearch={true}
                    placeholder="Buscar categorias..."
                    className="mb-4"
                />

                {filterSearch.length > 0 ? (
                    <div className="w-full flex flex-col max-h-80 py-3 overflow-y-auto overflow-x-hidden">
                        {filterSearch.map((category) => (
                            <div
                                key={category.id}
                                className="flex w-full items-center justify-between py-2 px-3 bg-gray-100 rounded mb-2 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                    <span className="truncate">{category.name}</span>
                                </div>

                                <div className="relative flex items-center gap-3">
                                    <Tooltip aria-label="Editar produto" placement="left-start" content="Editar Produto">
                                        <button onClick={() => handleEditCategory(category)} className="text-lg text-blue-500 cursor-pointer hover:text-blue-700 transition-all duration-300 ease-in-out active:opacity-70">
                                            <FaPencil />
                                        </button>
                                    </Tooltip>
                                    <Tooltip aria-label="Excluir produto" color="danger" placement="left-start" content="Excluir Produto">
                                        <button onClick={() => handleRemoveCategory(category)} className="text-lg text-red-500 cursor-pointer hover:text-red-700 transition-all duration-300 ease-in-out active:opacity-70">
                                            <FaTrashAlt />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-500 text-sm italic py-10">
                        Nenhuma categoria encontrada.
                    </div>
                )}

                <Button
                    onClick={() => {
                        setIsFormOpen(true);
                        setSelectedCategory(null);
                        setName("");
                    }}
                    aria-label="Adicionar categoria"
                    className="w-full mt-4 transition-transform duration-300 ease-in-out hover:scale-105"
                    color="primary"
                    variant="solid"
                    size="md"
                >
                    Adicionar Categoria
                </Button>
            </div>

            <form
                onSubmit={handleCreateCategory}
                className={`absolute inset-0 flex flex-col transition-opacity duration-300 ease-in-out ${isFormOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <Input
                    aria-label="Nome da categoria"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError(false);
                    }}
                    labelPlacement="outside"
                    isInvalid={error}
                    label="Nome da categoria"
                    placeholder="Digite o nome da categoria"
                />
                <div className="flex items-center justify-between mt-4">
                    <Button
                        aria-label="Salvar"
                        type="submit"
                        disabled={loading}
                        isLoading={loading}
                        variant="solid"
                        size="md"
                        className="w-1/2 mr-2 bg-green-500 text-white font-bold transition-transform duration-300 hover:scale-105"
                    >
                        Salvar
                    </Button>
                    <Button
                        aria-label="Cancelar"
                        onClick={() => setIsFormOpen(false)}
                        type="button"
                        disabled={loading}
                        variant="ghost"
                        size="md"
                        className="w-1/2 ml-2 transition-transform duration-300 hover:scale-105"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
}

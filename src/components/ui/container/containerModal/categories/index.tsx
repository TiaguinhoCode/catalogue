// Componentes
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListBox } from "@/components/ui/listBox";

// React
import { SyntheticEvent, useState } from "react";

// Bibliotecas
import { setupApiClient } from "@/services/api";
import { toast } from "react-toastify";

// Next
import { usePathname } from "next/navigation";

// Tipagem
import { ItemsCategories } from "@/types/categories";
interface ContainerModalProps {
    categories: ItemsCategories[];
    api: ReturnType<typeof setupApiClient>;
}

export function ContainerModal({ categories, api }: ContainerModalProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const company = usePathname().split("/")[1];

    async function handleCreateCategory(e: SyntheticEvent) {
        e.preventDefault();

        setLoading(true);

        if (!name.trim()) {
            setError(true);
            setLoading(false);
            return;
        }

        try {
            await api.post(`/v1/category?company=${company}`, { name });
            toast.success("Categoria criada com sucesso!");
            setIsFormOpen(false);
            setError(false);
            setName("");
        } catch (err) {
            toast.error("Erro ao criar a categoria. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto p-4 relative min-h-[300px]">
            <div
                className={`absolute inset-0 transition-all duration-300 ease-in-out ${isFormOpen ? "opacity-0 pointer-events-none scale-95" : "opacity-100"
                    }`}
            >
                <Input
                    isRequired
                    errorMessage="Campo Obrigatório"
                    isSearch
                    placeholder="Buscar categorias..."
                    className="mb-4"
                />
                <div className="w-full flex flex-col max-h-80 py-3 overflow-auto">
                    <ListBox lists={categories} displayKey="name" />
                </div>
                <Button
                    onClick={() => setIsFormOpen(true)}
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

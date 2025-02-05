'use client'

// Componentes
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Options } from "@/components/ui/autoComplete"
import { Upload } from "@/components/ui/upload"

// Next
import Link from "next/link"

// Biblioteca
import { IoIosArrowBack } from "react-icons/io"
import { Checkbox } from "@nextui-org/react"
import { toast } from "react-toastify"
import { setupApiClient } from "@/services/api"

// Utils
import { MoneyMaskInput } from "@/utils/mask/money/inputMask"
import { parseCurrency } from "@/utils/mask/money"

// React
import React, { SyntheticEvent, useState } from "react"

// Tipagem
import { ItemsCategories } from "@/types/categories"

interface ProductFormProps {
    company: string | undefined;
    categoryData: ItemsCategories[];
    token: string;
    initialValues?: {
        id?: string;
        name: string;
        description: string;
        price: string;
        isActive: boolean;
        promotion: boolean;
        costPrice?: string;
        categoryId: string;
        bannerId: string | null;
        imageUrl?: string | null;
    };
    isEditMode?: boolean;
}

export function ProductForm({ company, categoryData, token, initialValues, isEditMode }: ProductFormProps) {
    const [name, setName] = useState<string>(initialValues?.name || '')
    const [description, setDescription] = useState<string>(initialValues?.description || '');
    const [categoryId, setCategoryId] = useState<string>(initialValues?.categoryId || '');
    const [imagemUrl, setImagemUrl] = useState<string | null>(initialValues?.imageUrl || null);
    const [price, setPrice] = useState<string>(initialValues?.price || '');
    const [isActive, setIsActive] = useState(initialValues?.isActive);
    const [promotion, setPromotion] = useState(initialValues?.promotion);
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { handleChange: handleProductPriceChange } = MoneyMaskInput({ setValue: setPrice })

    const api = setupApiClient(token)

    async function handleFormProduct(e: SyntheticEvent) {
        e.preventDefault();

        setLoading(true);

        if (name === "" || description === "" || categoryId === "" || price === "" || imagemUrl === null) {
            toast.error("Por favor preenchar todos campos obrigatorios");
            setError(true)
            setLoading(false);
            return;
        }

        if (isEditMode) {
            try {
                toast.success('Produto alterado com sucesso!')
                await api.put(`/v1/products?id=${initialValues?.id}&company=${company}`, {
                    name,
                    description,
                    price: parseCurrency(price),
                    categoryId: categoryId,
                    bannerId: initialValues?.bannerId,
                    imagemUrl: imagemUrl,
                    isActive,
                    promotion
                });
            } catch (err) {
                console.log("Error: ", err);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                await api.post(`/v1/products?company=${company}`, { name, description, price: parseCurrency(price), category_id: categoryId, image_url: imagemUrl })

                setName('')
                setDescription('')
                setCategoryId('')
                setImagemUrl('')
                setPrice('')

                toast.success("Produto cadastrado com sucesso!")
            } catch (err) {
                setError(false)
                console.log("Error: ", err)
                toast.error("Erro ao cadastrar produto.");
            } finally {
                setError(false)
                setLoading(false)
            }
        }
    }

    return (
        <Container>
            <form className="w-full" onSubmit={handleFormProduct}>
                <div className="w-full flex flex-col space-y-4">
                    <Link
                        href={`/${company}/admin/products`}
                        className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition duration-200"
                    >
                        <IoIosArrowBack size={22} />
                        <p className="text-sm font-semibold">Voltar</p>
                    </Link>

                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {isEditMode ? 'Editar Produto' : 'Cadastrar Produto'}
                        </h1>
                        <Button isLoading={loading} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                            {isEditMode ? 'Salvar Alterações' : 'Salvar Produto'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                    <div className="lg:col-span-2">
                        <Input
                            label="Nome do Produto"
                            labelPlacement="outside"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Hambúrguer Artesanal"
                            isInvalid={error}
                            variant="bordered"
                        />
                        <div className="flex flex-col py-3">
                            <label htmlFor="description" className="text-sm pb-2 font-medium text-gray-700">
                                Descrição
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ex: Pão artesanal, carne de costela, queijo cheddar..."
                                rows={4}
                                className={`block w-full rounded-md border ${error ? "border-red-500" : "border-gray-300"
                                    } focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
                            />
                        </div>
                        <Input
                            label="Preço"
                            labelPlacement="outside"
                            className="pb-3"
                            value={price}
                            onChange={handleProductPriceChange}
                            placeholder="Ex: R$ 12,00"
                            isInvalid={error}
                            variant="bordered"
                        />
                        <Options
                            label="Categoria"
                            data={categoryData}
                            isInvalid={error}
                            value={categoryId}
                            setValue={setCategoryId}
                            placeholder="Selecione uma categoria"
                        />

                        {isEditMode && (
                            <div className="flex w-full space-x-10">
                                <div className="py-3">
                                    <p className="text-gray-700 text-sm font-medium">Status do Produto</p>
                                    <div className="flex items-center gap-4 py-2">
                                        <Checkbox isSelected={isActive} onChange={() => setIsActive(true)}>
                                            Ativar
                                        </Checkbox>
                                        <Checkbox isSelected={!isActive} onChange={() => setIsActive(false)}>
                                            Desativar
                                        </Checkbox>
                                    </div>
                                </div>

                                <div className="py-3">
                                    <p className="text-gray-700 text-sm font-medium">Promoção? </p>
                                    <div className="flex items-center gap-4 py-2">
                                        <Checkbox isSelected={promotion} onChange={() => setPromotion(true)}>
                                            Sim
                                        </Checkbox>
                                        <Checkbox isSelected={!promotion} onChange={() => setPromotion(false)}>
                                            Não
                                        </Checkbox>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        <Upload
                            imageUrl={imagemUrl}
                            error={error}
                            loading={loading}
                            setImageUrl={setImagemUrl}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </form>
        </Container>
    )
}

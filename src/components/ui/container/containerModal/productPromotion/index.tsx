"use client";

// Biblioteca
import { setupApiClient } from "@/services/api";
import { toast } from "react-toastify";

// Componentes
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading as LoadingUI } from "@/components/ui/loading";

// Utils
import { formatCurrency } from "@/utils/mask/money";
import { calculateDiscountPrice } from "@/utils/calculateDiscount";

// React
import { SyntheticEvent, useState } from "react";

// Next
import { usePathname } from "next/navigation";

// Tipagem
import { ItemsProducts } from "@/types/products";

interface ContainerModalProps {
    productsData: ItemsProducts | undefined;
    loadingSelecting: boolean;
    api: ReturnType<typeof setupApiClient>;
    refresh: () => void;
}

export function ContainerModal({
    productsData,
    loadingSelecting,
    api,
    refresh,
}: ContainerModalProps) {
    const [discount, setDiscount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const company = usePathname().split("/")[1]

    if (loadingSelecting) {
        return <LoadingUI />;
    }

    if (!productsData) return null;

    const discountedPrice = calculateDiscountPrice(
        Number(productsData.price),
        discount
    );

    const handleDiscountChange = (value: string) => {
        const parsedValue = Number(value);

        if (parsedValue < 1 || parsedValue > 100) {
            setError("O desconto deve ser entre 1% e 100%");
            setDiscount(0);
        } else {
            setError(null);
            setDiscount(parsedValue);
        }
    };

    async function handleFormPromotion(e: SyntheticEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            await api.put(
                `/v1/products/promotion?company=${company}&id=${productsData?.id}`,
                { discountPercentage: discount }
            );
            toast.success("A promoção foi criada com sucesso!");
            refresh();
        } catch (err) {
            toast.error("Erro ao criar a promoção. Tente novamente mais tarde.");
            console.log("Error: ", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleFormPromotion} className="w-full max-w-md mx-auto">
            <section className="flex flex-col items-center justify-center text-center">
                <img
                    src={productsData?.Banner[0]?.image_url}
                    alt={productsData.name}
                    className="w-32 h-32 rounded-lg object-cover"
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                    {productsData.name}
                </h2>
            </section>

            <main className="py-6">
                <div className="mb-4">
                    <label
                        htmlFor="discount"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Qual o desconto ({discount}%):
                    </label>
                    <Input
                        id="discount"
                        variant="bordered"
                        value={discount > 0 ? discount.toString() : ""}
                        onChange={(e) => handleDiscountChange(e.target.value)}
                        className={`mt-1 w-full ${error ? "border-red-500" : ""}`}
                        placeholder="Digite o percentual de desconto"
                        type="number"
                    />
                    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                </div>

                <div className="flex justify-between items-center py-4 border-t border-b border-gray-200">
                    <div>
                        <span className="text-sm text-gray-500">Preço original:</span>
                        <p className="text-lg font-bold text-gray-800">
                            {formatCurrency(productsData.price)}
                        </p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500">Preço com desconto:</span>
                        <p className="text-lg font-bold text-emerald-500">
                            {discount > 0
                                ? formatCurrency(String(discountedPrice))
                                : formatCurrency(productsData.price)}
                        </p>
                    </div>
                </div>

                <Button
                    type="submit"
                    isLoading={loading}
                    className={`mt-6 w-full bg-emerald-500 text-white text-lg font-semibold py-2 rounded-lg shadow hover:bg-emerald-600 transition-all ${error ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={!!error}
                >
                    Lançar a promoção
                </Button>
            </main>
        </form>
    );
}

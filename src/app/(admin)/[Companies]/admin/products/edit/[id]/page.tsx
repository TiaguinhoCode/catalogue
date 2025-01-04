// Bibliotecas
import { setupApiClient } from "@/services/api";

// Componentes
import { ProductForm } from "@/components/layouts/forms/createProducts";

// Next
import { cookies } from "next/headers";
import { formatCurrency } from '@/utils/mask/money';

export default async function EditProductsPage({ params }: { params: { id: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('@nextauth.token')?.value;
    const company = cookieStore.get('@nextcompany.name')?.value;

    const api = setupApiClient(token)
    const { id } = await params

    const productsResponse = await api.get(`/v1/products?company=${company}&id=${id}`)
    const categorysResponse = await api.get(`/v1/category?company=${company}`)

    const initialValues = {
        id: productsResponse.products.id,
        name: productsResponse.products.name,
        description: productsResponse.products.description,
        isActive: productsResponse.products.is_active,
        promotion: productsResponse.products.promotion,
        price: formatCurrency(productsResponse.products.price.toString()),
        costPrice: productsResponse.products.costPrice,
        categoryId: productsResponse.products.category.id,
        bannerId: productsResponse.products.Banner?.[0]?.id || null,
        imageUrl: productsResponse.products.Banner?.[0]?.image_url || null,
    };

    return (
        <ProductForm
            company={company}
            categoryData={categorysResponse.category}
            token={token as string}
            initialValues={initialValues}
            isEditMode={true}
        />
    )
}
// Componentes
import { ProductForm } from "@/components/layouts/forms/createProducts";

// Biblioteca
import { setupApiClient } from "@/services/api";

// Next
import { cookies, headers } from "next/headers";

// Bibliotecas

export default async function CreateProductsPage() {
    const router = headers();
    const company = (await router).get("referer")?.split("/")[3];
    const cookieStore = await cookies();
    const token = cookieStore.get('@nextauth.token')?.value;

    const api = setupApiClient(token)

    const categorysResponse = await api.get(`/v1/category?company=${company}`)

    return (
        <>
            <ProductForm
                company={company}
                categoryData={categorysResponse.category}
                token={token as string}
            />
        </>
    );
}

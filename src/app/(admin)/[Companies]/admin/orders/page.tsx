// Componentes
import { ContainerOrders } from "@/components/layouts/ContainerOrders";
import { DisplayCards } from "@/components/ui/displayCards";

// Dados
import InfoCardOrders from "@/data/infoCards";

// Bibliotecas
import { setupApiClient } from "@/services/api";

// Next
import { cookies } from "next/headers";

export default async function OrdersPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('@nextauth.token')?.value;
    const company = cookieStore.get('@nextcompany.name')?.value;

    const api = setupApiClient(token)
    const orders = await api.get(`/v1/order?company=${company}`)

    return (
        <>
            <ContainerOrders ordersData={orders.orders} />
        </>
    );
}

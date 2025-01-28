// next
import { cookies } from "next/headers";

// Bibliotecas
import { setupApiClient } from "@/services/api";

// Componentes
import { ContainerUser } from "@/components/layouts/containerUsers";

export default async function UsersPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('@nextauth.token')?.value;
    const company = cookieStore.get('@nextcompany.name')?.value;

    const api = setupApiClient(token)
    const usersResponse = await api.get(`/v1/users?company=${company}`)

    return (
        <div className="flex space-y-4 flex-col">
            <ContainerUser usersData={usersResponse.users} />
        </div>
    )
}
// Componentes
import { ContainerProfiles } from "@/components/layouts/profiles";

// Next
import { cookies } from "next/headers";
import { setupApiClient } from "@/services/api";

export default async function SettingsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('@nextauth.token')?.value;
    const company = cookieStore.get('@nextcompany.name')?.value;

    const api = setupApiClient(token)
    const user = await api.get(`/v1/me?company=${company}`)

    return (
        <ContainerProfiles user={user.user} />
    );
}

// Componentes
import { SettingsMenu } from "@/components/ui/subMenu/settings";
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
        <main className="w-full flex flex-col md:flex-row md:space-x-6 ">
            <aside className="w-full md:w-1/4">
                <SettingsMenu />
            </aside>

            <section className="w-full md:w-3/4 ">
                <ContainerProfiles user={user.user}/>
            </section>
        </main>
    );
}

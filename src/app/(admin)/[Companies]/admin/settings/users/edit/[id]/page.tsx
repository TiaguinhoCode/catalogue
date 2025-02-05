// Next
import { cookies } from "next/headers";

// Bibliotecas
import { setupApiClient } from "@/services/api";

// Dados
import ruleData from "@/data/rule/rule.json"

// Componentes
import { NotFound } from "@/components/notFound";
import { CreateUserForm } from "@/components/layouts/forms/createUser";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('@nextauth.token')?.value;
    const company = cookieStore.get('@nextcompany.name')?.value;

    const api = setupApiClient(token)
    const { id } = await params

    const userResponse = await api.get(`/v1/users?company=${company}&id=${id}`)

    const initialValues = {
        id: userResponse.users.id,
        name: userResponse.users.name,
        surname: userResponse.users.surname,
        email: userResponse.users.email,
        cep: userResponse.users.cep,
        phone: userResponse.users.phone,
        role: String(ruleData.find((rule) => rule.name.toUpperCase() === userResponse.users.role.toUpperCase())?.id),
        is_active: userResponse.users.is_active,
        photo: userResponse.users.photo || "", 
    };

    return (
        <>
            {userResponse.users ?
                <CreateUserForm userData={initialValues} editMode={true} /> :
                <NotFound
                    message="O usuário que você está procurando não está registrado em nosso banco de dados."
                    href={`/${company}/admin/settings/users`}
                />
            }
        </>
    )
}
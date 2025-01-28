'use client'

// Componentes
import { Container } from "@/components/ui/container";
import { Table } from "@/components/ui/table";
import { ToolBar } from "@/components/ui/toolbar";
import { renderCell } from "@/components/renderCell/users";

// React
import { useState } from "react";

// Bibliotecas
import Cookies from 'js-cookie';
import { setupApiClient } from "@/services/api";

// Dados
import columns from "@/data/columns/users/columns.json"

// Utils
import { SearchFilter } from "@/utils/filters/searchFilter";

// next
import { usePathname } from "next/navigation";

// Tipagem
import { ItemsUser } from "@/types/users";
import { toast } from "react-toastify";
interface ContainerUserProps {
    usersData: ItemsUser[];
}

export function ContainerUser({ usersData }: ContainerUserProps) {
    const [users, setUsers] = useState(usersData)
    const [search, setSearch] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const token = Cookies.get("@nextauth.token")
    const company = usePathname().split("/")[1]
    const api = setupApiClient(token)

    async function handleRefresh() {
        setLoading(true)

        const resp = await api.get(`/v1/users?company=${company}`)
        setUsers(resp.users)

        setLoading(false)
    }

    async function handleRemove(id: string) {
        setLoading(true)

        try {
            api.delete(`/v1/user?user_id=${id}&company=${company}`)
            toast.success("Usuário excluído com sucesso!")
            await handleRefresh()
        } catch (err) {
            console.log("Ërror: ", err)
            toast.error('algo deu errado, tente novamente')
        }

        setLoading(false)
    }

    const filteredUsers = SearchFilter({ data: users, search })

    return (
        <main className="w-full flex flex-row items-start justify-between gap-4 ">
            <Container>
                <ToolBar
                    hrefe={`/${company}/admin/settings/users/create`}
                    descriptionBtn="Adicionar Usuário"
                    clearFilter={() => console.log('Ativou')}
                    refresh={handleRefresh}
                    search={search}
                    setSearch={setSearch}
                />
                <div className="mt-4">
                    <Table data={filteredUsers} loading={loading} handleRemove={handleRemove} collumns={columns} renderCell={renderCell} alert="O produto não foi encontrado." />
                </div>
            </Container>
        </main>
    )
}
'use client'

// Componentes
import { Container } from "@/components/ui/container";
import { Table } from "@/components/ui/table";
import { ToolBar } from "@/components/ui/toolbar";
import { renderCell } from "@/components/renderCell/users";

// React
import { useState } from "react";

// Dados
import columns from "@/data/columns/users/columns.json"

// Utils
import { SearchFilter } from "@/utils/filters/searchFilter";

// Tipagem
import { ItemsUser } from "@/types/users";
interface ContainerUserProps {
    usersData: ItemsUser[];
}

export function ContainerUser({ usersData }: ContainerUserProps) {
    const [users, setUsers] = useState(usersData)
    const [search, setSearch] = useState<string>('')

    const filteredUsers = SearchFilter({ data: users, search })

    return (
        <main className="w-full flex flex-row items-start justify-between gap-4 ">
            <Container>
                <ToolBar
                    hrefe={``}
                    descriptionBtn="Adicionar Usuário"
                    clearFilter={() => console.log('Ativou')}
                    refresh={() => console.log('Ativou')}
                    search={search}
                    setSearch={setSearch}
                />
                <div className="mt-4">
                    <Table data={filteredUsers} loading={false} handleRemove={() => console.log('Ativou')} collumns={columns} renderCell={renderCell} alert="O produto não foi encontrado." />
                </div>
            </Container>
        </main>
    )
}
'use client';

// Utils
import { InfiniteScroll } from "@/utils/InfiniteScroll";

// biblioteca
import {
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Table as TBL,
} from "@nextui-org/react";

// React
import { useState } from "react";

// Componentes
import { Loading } from "../loading";

// Next
import { usePathname } from "next/navigation";

// Tipagem
type ItemsCollumns = {
    name: string;
    uid: string;
}

interface TableProps<T> {
    collumns: ItemsCollumns[];
    data: T[];
    loading: boolean;
    alert?: string;
    handleRemove: (id: string) => void;
    createPromotion?: (id: string) => void;
    renderCell: (item: T, columnUid: string, company: string, handleRemove: (id: string) => void, createPromotion?: (id: string) => void) => React.ReactNode;
}

export function Table<T>({ collumns, data, loading, alert, handleRemove, createPromotion, renderCell }: TableProps<T>) {
    const [limit, setLimit] = useState(0)

    const company = usePathname().split("/")[1];

    const fetchMore = () => {
        if (limit < data.length) {
            setLimit(limit + 5);
        }
    };

    const dataLimit = data.slice(0, limit)

    if (loading) {
        return (
            <main className="w-full items-center justify-center h-[450px]">
                <Loading />
            </main>
        )
    }

    return (
        <main className="w-full z-0 max-h-[450px] h-full overflow-auto">
            <TBL
                classNames={{
                    wrapper: "rounded-lg shadow-lg bg-white p-1 overflow-hidden",
                    base: "rounded-lg",
                }}
                aria-label="Tabela aprimorada"
                isStriped
            >
                <TableHeader columns={collumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            className="bg-blue-500 text-white uppercase"
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={alert ? alert : "Nenhum dado foi encontrado 😞 "} items={dataLimit}>
                    {(item) => (
                        <TableRow key={(item as any).id}>
                            {collumns.map((column) => (
                                <TableCell key={column.uid}>
                                    {renderCell(item, column.uid, company, handleRemove, createPromotion)}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </TBL>
            <InfiniteScroll fetchMore={fetchMore} />
        </main>
    );
}

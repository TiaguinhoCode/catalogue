'use client';

// biblioteca
import {
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Table as TBL,
} from "@nextui-org/react";

// Tipagem
type ItemsCollumns = {
    name: string;
    uid: string;
}

interface TableProps<T> {
    collumns: ItemsCollumns[];
    data: T[];
    alert?: string;
    renderCell: (item: T, columnUid: string) => React.ReactNode;
}

export function Table<T>({ collumns, data, alert, renderCell }: TableProps<T>) {

    return (
        <TBL
            aria-label="tabela"
            classNames={{
                wrapper: "border-none shadow-none overflow-auto max-h-[500px] max-w-full", // Scroll horizontal
                table: "min-w-full border-collapse overflow-hidden text-left",
                th: "bg-blue-500 text-white font-semibold uppercase text-sm px-4 py-2 sticky top-0 z-10",
                tr: "hover:bg-blue-50 rounded-md transition-all duration-200 border-b border-gray-200",
                td: "px-4 py-2 text-gray-800 text-sm whitespace-nowrap",
            }}
        >
            <TableHeader>
                {collumns.map((column) =>
                    <TableColumn key={column.uid} align="center">{column.name}</TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={<span className="text-gray-500 italic">{alert ? alert : "Nenhum dado disponível."}</span>}
                items={data}
            >
                {(item) => (
                    <TableRow key={(item as any).id}>
                        {collumns.map((column) => (
                            <TableCell key={column.uid}>
                                {renderCell(item, column.uid)}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </TBL>
    );
}

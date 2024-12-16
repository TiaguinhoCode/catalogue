'use client';

// Biblioteca
import { Listbox as LstBox, ListboxItem } from "@nextui-org/react";

// Tipagem
type ListBoxProps<T> = {
    lists: T[];
    displayKey: keyof T;
};

export function ListBox<T>({ lists, displayKey }: ListBoxProps<T>) {
    return (
        <LstBox
            disallowEmptySelection
            aria-label="Categorias"
            selectionMode="multiple"
            variant="flat"
            className="bg-gray-50 rounded-md focus-within:ring-2 focus-within:ring-blue-500 transition"
            classNames={{
                emptyContent: "max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
                base: "bg-gray-50",
            }}
        >
            {lists.map((item, index) => (
                <ListboxItem textValue="lista" key={index}>
                    <div className="flex items-center gap-2">
                        <span>{String(item[displayKey])}</span>
                    </div>
                </ListboxItem>
            ))}
        </LstBox>
    );
}

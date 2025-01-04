'use client';

// Biblioteca
import { Listbox as LstBox, ListboxItem } from "@nextui-org/react";

// Tipagem
type ListBoxProps<T> = {
    lists: T[];
    displayKey: keyof T;
    selectedKeys: string[];
    setSelectedKeys: (value: string[]) => void
};

export function ListBox<T>({ lists, displayKey, selectedKeys, setSelectedKeys }: ListBoxProps<T>) {
    return (
        <LstBox
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) => setSelectedKeys(Array.from(keys as Set<string>))}
            aria-label="Categorias"
            selectionMode="multiple"
            variant="flat"
            className=" rounded-md focus-within:ring-2 focus-within:ring-blue-500 transition"
            classNames={{
                emptyContent: "max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
                base: "",
            }}
        >
            {lists.map((item, index) => (
                <ListboxItem textValue="lista" key={(item as any).id}>
                    <div className="flex items-center gap-2">
                        <span>{String(item[displayKey])}</span>
                    </div>
                </ListboxItem>
            ))}
        </LstBox>
    );
}

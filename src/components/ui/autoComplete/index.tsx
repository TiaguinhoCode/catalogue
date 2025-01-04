'use client';

// Biblioteca
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

// React
import React from "react";

// Tipagem
interface OptionsProps<T extends object> {
    data: T[];
    dataKey: keyof T;
    label?: string;
    placeholder?: string;
    setValue: (value: string) => void;
    isInvalid: boolean;
    value: string;
}

export function Options<T extends object>({ data, dataKey, label, placeholder, value, setValue, isInvalid }: OptionsProps<T>) {
    return (
        <Autocomplete
            inputProps={{
                classNames: {
                    inputWrapper: "rounded-lg border-1 border-gray-300 data-[hover=true]:border-gray-400 group-data-[focus=true]:border-blue-500",
                },
            }}
            isInvalid={isInvalid}
            defaultItems={data}
            label="Categoria do Produto: "
            placeholder="Search an animal"
            labelPlacement="outside"
            selectedKey={value}
            variant="bordered"
            onSelectionChange={(newKey) => setValue(newKey as string)}
        >
            {(item) => <AutocompleteItem key={(item as any).id}>{(item as any).name}</AutocompleteItem>}
        </Autocomplete>
    );
}

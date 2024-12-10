'use client'

// Bibliotecas
import { Input as Inpt } from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';

// React
import { ComponentProps } from 'react';

// Tipagem
type InputProps = ComponentProps<typeof Inpt> & {
    isSearch?: boolean;
}

export function Input({ isSearch, ...rest }: InputProps) {

    if (isSearch) {
        return (
            <Input
                classNames={{
                    base: "border border-gray-300 rounded-lg shadow-sm",
                    inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                }}
                placeholder="Pesquise algum produto"
                startContent={<CiSearch size={20} className="text-gray-500" />}
            />
        )
    }

    return (
        <Inpt {...rest}
            classNames={{
                base: "border border-gray-300 rounded-lg shadow-sm",
                inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
            }} />
    )
}
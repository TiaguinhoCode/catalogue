'use client'

// React
import { ComponentProps } from "react"

// Bibliotecas
import { Button as Btn } from '@nextui-org/react';

// Tipagem
type InputProps = ComponentProps<typeof Btn> & {
    description: string;
}

export function Button({ description, ...rest }: InputProps) {
    return (
        <Btn {...rest} className="w-full mt-4">
            {description}
        </Btn>
    )
}
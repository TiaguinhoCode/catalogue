'use client'

// React
import { ComponentProps, ReactNode } from "react"

// Bibliotecas
import { Button as Btn } from '@nextui-org/react';

// Tipagem
type InputProps = ComponentProps<typeof Btn> & {
    children?: ReactNode;
}

export function Button({ children, ...rest }: InputProps) {
    return (
        <Btn {...rest}>
            {children}
        </Btn>
    )
}
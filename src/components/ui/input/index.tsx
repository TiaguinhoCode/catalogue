'use client'

// Bibliotecas
import { Input as Inpt } from '@nextui-org/react';

// React
import { ComponentProps } from 'react';

// Tipagem
type InputProps = ComponentProps<typeof Inpt>

export function Input({ ...rest }: InputProps) {
    return (
        <Inpt {...rest} />
    )
}
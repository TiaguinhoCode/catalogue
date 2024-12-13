'use client'

// Biblioteca
import { Modal as Mdl, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"

// React
import { ReactNode } from "react";

// Tipagem
interface ModalProps {
    isOpen: boolean;
    onClose: () => void
    title: string;
    children: ReactNode;
}

export function Modal({ isOpen, title, onClose, children }: ModalProps) {
    return (
        <Mdl
            isOpen={isOpen}
            onOpenChange={onClose}
            aria-labelledby="modal"
            scrollBehavior="inside"
            placement="auto"
            classNames={{
                base: "fixed top-0 right-0 transform-none w-[320px] h-screen",
            }}
        >
            <ModalContent>
                <ModalHeader>
                    {title}
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Mdl>
    )
}

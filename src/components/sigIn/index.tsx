'use client'

// Componentes
import { Input } from "../ui/input"
import { Button } from "../ui/button"

// React
import { SyntheticEvent, useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth";

// Biblioteca
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export function FormAuth({ company }: { company: string }) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)

    const { signIn } = useContext(AuthContext)

    async function handleSignIn(e: SyntheticEvent) {
        e.preventDefault()

        setLoading(true)

        if (email === '' && password === '') {
            toast.error("Por Favor, insirar seu email e senha.")
        } else {
            await signIn({ email, password, company })
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSignIn} className="space-y-4">
            <div>
                <Input
                    label="E-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="bordered"
                    classNames={{ inputWrapper: "border-gray-300 group-data-[focus=true]:border-gray-500" }}
                    fullWidth
                    className="mt-2"
                />
            </div>
            <div>
                <Input
                    label="Senha"
                    variant="bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={isVisible ? "text" : "password"}
                    classNames={{ inputWrapper: "border-gray-300 group-data-[focus=true]:border-gray-500" }}
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)} aria-label="toggle password visibility">
                            {isVisible ? (
                                <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    fullWidth
                    className="mt-2"
                />
            </div>
            <Button
                type="submit"
                color="primary"
                size="lg"
                variant="shadow"
                description="Entrar"
                isLoading={loading}
            />
        </form>
    )
}
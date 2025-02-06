'use client'

// Componetes
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Options } from "@/components/ui/autoComplete"

// React
import { useEffect, useState } from "react"

// Dados
import ruleData from "@/data/rule/rule.json"

// Biblioteca
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { IoArrowBackOutline, IoSaveOutline } from "react-icons/io5"

// Utils
import { applyPhoneMask } from "@/utils/mask/phone"
import { fetchCep } from "@/utils/handlers/fetchCep"
import { handleFormUser } from "@/utils/handlers/forms/formUser"

// Link
import { usePathname } from "next/navigation"
import Link from "next/link"

// Tipagem
import { ItemsUser } from '@/types/users';
import { Checkbox } from "@nextui-org/react"
interface CreateUserFormProps {
    userData?: ItemsUser;
    editMode?: boolean
}

export function CreateUserForm({ userData, editMode }: CreateUserFormProps) {
    const [name, setName] = useState<string>(userData?.name || '')
    const [surName, setSurName] = useState<string>(userData?.surname || '')
    const [email, setEmail] = useState<string>(userData?.email || '')
    const [password, setPassoword] = useState<string>('')
    const [phone, setPhone] = useState<string>(userData?.phone || '')
    const [cep, setCep] = useState<string>(userData?.cep || '')
    const [address, setAddress] = useState<string>('')
    const [neighborhood, setNeighborhood] = useState<string>('')
    const [state, setState] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [role, setRole] = useState<string>(userData?.role || '')
    const [isActive, setIsActive] = useState<boolean>(userData?.is_active || false);
    const [loading, setLoading] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const company = usePathname().split('/')[1]

    const handleCepChange = async (value: string) => {
        await fetchCep({
            cep: value,
            setCep,
            setAddress,
            setNeighborhood,
            setCity,
            setState,
            setLoading,
        });
    };

    useEffect(() => {
        if (editMode && userData?.cep) {
            fetchCep({
                cep: userData.cep,
                setCep,
                setAddress,
                setNeighborhood,
                setCity,
                setState,
                setLoading,
            });
        }
    }, [editMode, userData?.cep]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await handleFormUser({
            editMode,
            id: userData?.id,
            name,
            surName,
            email,
            password,
            phone,
            cep,
            role,
            isActive,
            setAddress,
            setCep,
            setCity,
            setEmail,
            setName,
            setPassoword,
            setNeighborhood,
            setPhone,
            setRole,
            setState,
            setSurName,
            setError,
            setLoading,
        });
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="flex w-full justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Cadastro de Funcionário</h2>
                    <div className="flex gap-2">
                        <Link href={`/${company}/admin/settings/users`}>
                            <Button
                                isLoading={loading}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                                startContent={<IoArrowBackOutline className="text-xl" />}
                            >
                                Voltar
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            isLoading={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                            startContent={!loading && <IoSaveOutline className="text-xl" />}
                        >
                            Salvar Alterações
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-3 flex gap-4">
                        <Input
                            label="Nome* "
                            labelPlacement="outside"
                            placeholder="Ex: João"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            isInvalid={error}
                            variant="bordered"
                            aria-label="Nome do funcionário"
                        />
                        <Input
                            label="Sobrenome* "
                            labelPlacement="outside"
                            placeholder="Ex: Silva"
                            value={surName}
                            onChange={(e) => setSurName(e.target.value)}
                            isInvalid={error}
                            variant="bordered"
                            aria-label="Sobrenome do funcionário"
                        />
                    </div>

                    <div className="lg:col-span-3 flex gap-4">
                        <Input
                            label="Email* "
                            labelPlacement="outside"
                            placeholder="Ex: exemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={error}
                            variant="bordered"
                            aria-label="Email do funcionário"
                        />
                        <Input
                            label="Senha* "
                            className={`${editMode && 'hidden'}`}
                            labelPlacement="outside"
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
                            placeholder="Digite uma senha segura"
                            isInvalid={error}
                            value={password}
                            onChange={(e) => setPassoword(e.target.value)}
                            variant="bordered"
                            aria-label="Senha do funcionário"
                        />
                        <Input
                            label="Telefone* "
                            labelPlacement="outside"
                            placeholder="Ex: (11) 99999-9999"
                            isInvalid={error}
                            value={phone}
                            onChange={(e) => setPhone(applyPhoneMask(e.target.value))}
                            variant="bordered"
                            aria-label="Telefone do funcionário"
                        />

                    </div>

                    <div className="lg:col-span-3 cursor-not-allowed flex gap-4">
                        <div className="w-full">
                            <Input
                                label="Cep* "
                                labelPlacement="outside"
                                placeholder="Ex: 12345-678"
                                isInvalid={error}
                                value={cep}
                                onChange={(e) => handleCepChange(e.target.value)}
                                variant="bordered"
                                aria-label="Cep do endereço"
                            />
                        </div>
                        <Input
                            label="Endereço"
                            labelPlacement="outside"
                            placeholder="Rua Exemplo, 123"
                            isInvalid={error}
                            value={address}
                            variant="bordered"
                            isDisabled={true}
                            aria-label="Endereço do funcionário"
                        />
                        <Input
                            label="Bairro"
                            labelPlacement="outside"
                            placeholder="Bairro Exemplo"
                            isInvalid={error}
                            value={neighborhood}
                            variant="bordered"
                            isDisabled={true}
                            aria-label="Bairro do funcionário"
                        />
                    </div>

                    <div className="lg:col-span-3 cursor-not-allowed flex gap-4">
                        <div className="w-full">
                            <Input
                                label="Estado"
                                labelPlacement="outside"
                                isInvalid={error}
                                placeholder="SP"
                                value={state}
                                variant="bordered"
                                isDisabled={true}
                                aria-label="Estado do endereço"
                            />
                        </div>
                        <Input
                            label="Cidade"
                            labelPlacement="outside"
                            placeholder="São Paulo"
                            isInvalid={error}
                            value={city}
                            variant="bordered"
                            isDisabled={true}
                            aria-label="Cidade do endereço"
                        />
                    </div>
                    <div className="lg:col-span-3 items-center flex gap-4">
                        <div className="w-full">
                            <Options
                                label="Nivel de acesso* "
                                data={ruleData}
                                value={role}
                                setValue={setRole}
                                placeholder="Digite sua regras"
                                isInvalid={error}
                            />
                        </div>
                        <div className="py-3 w-52">
                            <p className="text-gray-700 text-sm font-medium">Ativo? </p>
                            <div className="flex items-center gap-4 py-2">
                                <Checkbox isSelected={isActive} onChange={() => setIsActive(true)}>
                                    Sim
                                </Checkbox>
                                <Checkbox isSelected={!isActive} onChange={() => setIsActive(false)}>
                                    Não
                                </Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Container>
    )
}
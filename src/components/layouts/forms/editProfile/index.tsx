// Biblioteca
import { FaPencilAlt, FaRegAddressCard } from "react-icons/fa";
import Cookies from "js-cookie";
import { setupApiClient } from "@/services/api";

// Componentes
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSaveOutline } from "react-icons/io5";

// Utils
import { applyPhoneMask } from "@/utils/mask/phone";
import { applyCepMask } from "@/utils/mask/cep";

// Next
import { usePathname } from "next/navigation";

// React
import { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";

// Tipagem
interface ProfileFormProps {
    isEdit: boolean;
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    cep: string;
    role: string;
    setIsEdit: (value: boolean) => void;
    setName: (value: string) => void;
    setSurname: (value: string) => void;
    setEmail: (value: string) => void;
    setPhone: (value: string) => void;
    setCep: (value: string) => void;
}

export function ProfileForm({ isEdit, id, name, surname, email, phone, cep, role, setIsEdit, setName, setSurname, setEmail, setPhone, setCep }: ProfileFormProps) {
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const token = Cookies.get('@nextauth.token')
    const company = usePathname().split("/")[1]
    const api = setupApiClient(token)

    async function handleEditProfile(e: SyntheticEvent) {
        e.preventDefault()

        setLoading(true)

        if (name === '' && surname === '' && email === '' && phone === '' && cep === '') {
            toast.error("Por favor, preencha todos os campos.")
            setError(true)
        } else {
            try {
                await api.put(`/v1/user?id=${id}&company=${company}`, { name, surname, email, phone, cep })
                toast.success("Informações pessoais alteradas com sucesso!")
                setError(false)
            } catch (err) {
                toast.error("Erro ao cadastrar produto.");
                setError(true)
            }
        }

        setError(false)
        setLoading(false)
    }

    return (
        <form onSubmit={handleEditProfile} className="mt-6 border p-6 rounded-md space-y-6">
            <div className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                <FaRegAddressCard className="text-blue-500" />
                <span>Informações pessoais</span>
            </div>

            <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                    <div className={`flex-1 ${!isEdit && 'cursor-not-allowed'}`}>
                        <Input
                            variant="bordered"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Digite seu nome"
                            label="Nome:"
                            isDisabled={isEdit ? false : true}
                            labelPlacement="outside"
                            isInvalid={error}
                        />
                    </div>
                    <div className={`flex-1 ${!isEdit && 'cursor-not-allowed'}`}>
                        <Input
                            variant="bordered"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            type="text"
                            placeholder="Digite seu sobrenome"
                            label="Sobrenome:"
                            isDisabled={isEdit ? false : true}
                            labelPlacement="outside"
                            isInvalid={error}
                        />
                    </div>
                </div>

                <div className={`py-1 ${!isEdit && 'cursor-not-allowed'}`}>
                    <Input
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Digite seu e-mail"
                        label="E-mail:"
                        isDisabled={isEdit ? false : true}
                        labelPlacement="outside"
                        isInvalid={error}
                    />
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className={`flex-1 ${!isEdit && 'cursor-not-allowed'}`}>
                        <Input
                            variant="bordered"
                            value={phone}
                            onChange={(e) => setPhone(applyPhoneMask(e.target.value))}
                            type="text"
                            placeholder="Digite seu telefone"
                            label="Telefone:"
                            isDisabled={isEdit ? false : true}
                            labelPlacement="outside"
                            isInvalid={error}
                        />
                    </div>
                    <div className={`flex-1 ${!isEdit && 'cursor-not-allowed'}`}>
                        <Input
                            variant="bordered"
                            value={cep}
                            onChange={(e) => setCep(applyCepMask(e.target.value))}
                            type="text"
                            placeholder="Digite seu CEP"
                            label="CEP:"
                            isDisabled={isEdit ? false : true}
                            labelPlacement="outside"
                            isInvalid={error}
                        />
                    </div>
                    <div className="flex-1 cursor-not-allowed">
                        <Input
                            variant="bordered"
                            type="text"
                            value={role}
                            placeholder="Digite sua função"
                            label="Função:"
                            labelPlacement="outside"
                            isInvalid={error}
                            isDisabled
                            className="cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    {isEdit && (
                        <Button
                            onClick={() => setIsEdit(false)}
                            className="bg-gray-500 text-white hover:bg-gray-600 w-full sm:w-auto"
                        >
                            Cancelar
                        </Button>
                    )}
                    <Button
                        type={isEdit ? "button" : "submit"}
                        isLoading={loading}
                        onClick={() => setIsEdit(!isEdit)}
                        className="bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
                        startContent={!loading && isEdit ? <IoSaveOutline /> : <FaPencilAlt />}
                    >
                        {isEdit ? 'Salvar' : 'Editar'}
                    </Button>
                </div>
            </div>
        </form>
    )
}
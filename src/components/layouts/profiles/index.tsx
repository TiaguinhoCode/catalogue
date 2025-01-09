'use client'

// Componentes
import { Container } from "@/components/ui/container";
import { Loading } from "@/components/ui/loading";
import { ProfileForm } from "../forms/editProfile";

// Utils
import { getGreeting } from "@/utils/getGreeting";

// Bibliotecas
import { Avatar } from "@nextui-org/react";
import { FaCamera } from "react-icons/fa";
import { setupApiClient } from "@/services/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// React
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Tipagem
import { ItemsUser } from "@/types/users";
interface ContainerProfilesProps {
    user: ItemsUser
}

export function ContainerProfiles({ user }: ContainerProfilesProps) {
    const [photo, setPhoto] = useState<string>(user?.photo || "");
    const [name, setName] = useState<string>(user ? user?.name : '');
    const [surname, setSurname] = useState<string>(user ? user?.surname : '');
    const [phone, setPhone] = useState<string>(user ? user?.phone : '');
    const [email, setEmail] = useState<string>(user ? user?.email : '');
    const [cep, setCep] = useState<string>(user ? user?.cep : '');
    const [fileLoading, setFileLoading] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const greeting = getGreeting();
    const company = usePathname().split("/")[1] 
    const token = Cookies.get('@nextauth.token')
    const api = setupApiClient(token)

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("O arquivo selecionado excede o tamanho máximo de 2MB.");
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("O arquivo selecionado não é uma imagem.");
            return;
        }

        setFileLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const result = await api.put(`/v1/user?id=${user.id}&company=${company}`, formData);
            toast.success("Upload realizado com sucesso!");
            setPhoto(result.user.photo)
        } catch (err) {
            console.error("Erro no upload:", err);
            toast.error("Erro ao realizar upload.");
        } finally {
            setFileLoading(false)
            window.location.reload()
        }
    };

    return (
        <Container>
            <div>
                <div className="w-full flex flex-col items-center py-6 bg-gray-100 rounded-lg shadow-sm">
                    <div className="relative group w-24 h-24">
                        <input
                            type="file"
                            id="upload-photo"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="upload-photo"
                            className="relative w-24 h-24 cursor-pointer"
                        >
                            {fileLoading ?
                                <>
                                    <Loading />
                                </> :
                                <>
                                    <Avatar src={photo} classNames={{ base: "w-24 h-24 relative overflow-hidden" }} alt="Foto do usuário" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 rounded-full group-hover:opacity-100 transition-opacity duration-300">
                                        <FaCamera className="text-white text-lg" />
                                    </div>
                                </>
                            }
                        </label>
                    </div>


                    <h2 className="text-gray-800 text-xl font-bold mt-4 flex items-center gap-2">
                        <span className="text-2xl">👋</span>
                        <span>
                            Olá, <span className="text-blue-600">{greeting}</span> {user?.name} {user?.surname}!
                        </span>
                    </h2>
                    <p className="text-gray-600 text-base mt-2">
                        É ótimo ver você novamente! Atualize suas informações pessoais para manter tudo em dia.
                    </p>
                </div>

                <ProfileForm
                    isEdit={isEdit}
                    id={user.id}
                    name={name}
                    surname={surname}
                    email={email}
                    phone={phone}
                    cep={cep}
                    role={user.role || ''}
                    setIsEdit={setIsEdit}
                    setName={setName}
                    setSurname={setSurname}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    setCep={setCep}
                />
            </div>
        </Container>
    );
}

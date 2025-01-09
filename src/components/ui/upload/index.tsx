'use client'

// Biblioteca
import { MdOutlineAddAPhoto } from "react-icons/md";
import Cookies from "js-cookie";

// React

// Biblioteca
import { toast } from "react-toastify";
import { setupApiClient } from "@/services/api";

// Utils

// Next
import { usePathname } from "next/navigation";

interface UploadProps {
    imageUrl: string | null;
    loading: boolean;
    error: boolean;
    setImageUrl: (value: string | null) => void;
    setLoading: (value: boolean) => void;
}

export function Upload({ imageUrl, error, loading, setImageUrl, setLoading }: UploadProps) {
    const company = usePathname().split("/")[1]
    const token = Cookies.get('@nextauth.token')
    const api = setupApiClient(token)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            toast.error("Por favor, selecione uma imagem.");
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

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const result = await api.post(`/v1/upload?company=${company}`, formData);

            toast.success("Upload realizado com sucesso!");
            setImageUrl(result.url)
        } catch (err) {
            console.error("Erro no upload:", err);
            toast.error("Erro ao realizar upload.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className={`relative h-48 w-full rounded-lg border-2 border-dashed ${error ? 'border-red-600' : 'border-gray-300'} flex justify-center items-center bg-gray-50 hover:bg-gray-100 hover:scale-105 transition-all duration-300`}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={loading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Imagem carregada"
                        className="h-full w-full object-cover rounded-lg"
                    />
                ) : (
                    <div className="flex flex-col items-center text-gray-500">
                        <MdOutlineAddAPhoto className="text-5xl mb-2" />
                        <p className="text-sm">{loading ? 'Enviando...' : 'Upload de Imagem'}</p>
                    </div>
                )}
            </div>
            <p className="text-gray-500 mt-2 text-sm text-center">
                Formatos suportados: JPG, PNG. Tamanho máximo: 2MB.
            </p>
        </div>
    )
}
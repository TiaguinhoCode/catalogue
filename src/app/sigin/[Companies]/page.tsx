// Dados
import companiesData from '@/data/settings/companies.json';

// Componente
import { NotFound } from '@/components/notFound';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Imagem
import slogan from '../../../../public/slogan.png';

// Next
import Image from 'next/image';

interface SignInProps {
    params: { Companies: string };
}

export default async function SigIn({ params }: SignInProps) {
    const { Companies } = await params;

    const company = companiesData.find((c) => c.name.toLowerCase() === Companies.toLowerCase());

    if (!company) {
        return <NotFound />;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex flex-row w-full">
                <div className="hidden lg:flex flex-col justify-between bg-blue-700 text-white p-8 lg:max-w-sm xl:max-w-lg">
                    <div className="flex items-center space-x-3">
                        <Image
                            src={slogan}
                            quality={100}
                            priority
                            alt="slogan"
                            className="rounded-full w-12 h-12"
                        />
                        <span className="text-xl font-semibold">CatLog</span>
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-4xl font-extrabold leading-tight">
                            Entre na sua conta e descubra novas experiências
                        </h1>
                        <p className="text-sm text-gray-200">
                            Acesse ferramentas incríveis para gerenciar suas preferências.
                        </p>
                    </div>
                    <p className="text-xs font-medium text-gray-300">
                        © 2024 Cataloguê — Todos os direitos reservados
                    </p>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center px-6 sm:px-10">
                    <div className="flex lg:hidden justify-between items-center w-full mb-6">
                        <div className="flex items-center space-x-3">
                            <Image
                                src={slogan}
                                quality={100}
                                priority
                                alt="slogan"
                                className="rounded-full w-12 h-12"
                            />
                            <span className="text-xl font-semibold text-gray-700">CatLog</span>
                        </div>
                    </div>
                    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">Fazer login</h2>
                            <p className="text-gray-600 text-sm">
                                Entre com suas credenciais para continuar.
                            </p>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <Input
                                    label="E-mail"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    fullWidth
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Input
                                    label="Senha"
                                    type="password"
                                    placeholder="Digite sua senha"
                                    fullWidth
                                    className="mt-2"
                                />
                            </div>
                            <Button
                                type="submit"
                                color="primary"
                                size="lg"
                                variant='shadow'
                                description='Entrar'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

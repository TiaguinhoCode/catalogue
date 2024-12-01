// Biblioteca
import Image from "next/image";

// Imagem
import slogan from "../../../../../public/slogan.png";

// Biblioteca
import { FaDiscord, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="flex items-end w-full bg-gradient-to-t from-blue-900 via-blue-800 to-blue-600">
            <footer className="w-full text-white body-font">
                <div
                    className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap"
                >
                    <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
                        <Image
                            src={slogan}
                            alt="Logo Cataloguê"
                            quality={100}
                            priority
                            className="w-[100px] mx-auto md:mx-0"
                        />
                        <div className="mt-6">
                            <span className="inline-flex justify-center sm:justify-start space-x-5">
                                <a
                                    className="text-blue-300 cursor-pointer hover:text-blue-100 transition-colors duration-300"
                                >
                                    <FaInstagram size={24} />
                                </a>
                                <a
                                    className="text-blue-300 cursor-pointer hover:text-blue-100 transition-colors duration-300"
                                >
                                    <FaYoutube size={24} />
                                </a>
                                <a
                                    className="text-blue-300 cursor-pointer hover:text-blue-100 transition-colors duration-300"
                                >
                                    <FaLinkedin size={24} />
                                </a>
                                <a
                                    className="text-blue-300 cursor-pointer hover:text-blue-100 transition-colors duration-300"
                                >
                                    <FaDiscord size={24} />
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
                        {/* Coluna 1 */}
                        <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                            <h2 className="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">
                                Atendimento
                            </h2>
                            <nav className="mb-10 list-none">
                                <li className="mt-3">
                                    <a className="text-blue-300 cursor-pointer hover:text-white">
                                        Padrão de Brasília
                                    </a>
                                </li>
                                <li className="mt-3">
                                    <a className="text-blue-300 cursor-pointer hover:text-white">
                                        Segunda à Sexta: 9h - 18h
                                    </a>
                                </li>
                                <li className="mt-3">
                                    <a className="text-blue-300 cursor-pointer hover:text-white">
                                        Sábados: 9h - 15h
                                    </a>
                                </li>
                            </nav>
                        </div>
                        {/* Coluna 2 */}
                        <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                            <h2 className="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">
                                Recursos
                            </h2>
                            <nav className="mb-10 list-none">
                                <li className="mt-3">
                                    <a className="text-blue-300 cursor-pointer hover:text-white">
                                        Em breve teremos
                                    </a>
                                </li>
                            </nav>
                        </div>
                        {/* Coluna 3 */}
                        <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                            <h2 className="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">
                                Segmentos
                            </h2>
                            <nav className="mb-10 list-none">
                                {[
                                    "Cafeteria",
                                    "Confeitaria",
                                    "Cosméticos",
                                    "Hamburgueria",
                                    "Hortifruti",
                                    "Loja de materiais de construção",
                                    "Loja de produtos eletrônicos",
                                    "Loja de roupas",
                                    "Loja de suplemento alimentar",
                                    "Restaurantes"
                                ].map((segmento, idx) => (
                                    <li key={idx} className="mt-3">
                                        <a className="text-blue-300 cursor-pointer hover:text-white">
                                            {segmento}
                                        </a>
                                    </li>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-700">
                    <div className="container px-5 py-6 mx-auto">
                        <p className="text-sm text-center text-blue-300">
                            © 2024 Cataloguê — Todos os direitos reservados
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

'use client';

// Biblioteca
import { motion } from 'framer-motion';
import { FaCheckCircle, FaEnvelope, FaQuestionCircle, FaWhatsapp } from "react-icons/fa";

// Next
import Image from 'next/image';
import Link from 'next/link';

// Imagens
import publicOne from "../../../../../public/banner2.png";

export function Main() {
    return (
        <section className="bg-gray-50">
            <div className="grid max-w-screen-xl px-6 pt-20 pb-12 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                <motion.div
                    className="mr-auto place-self-center lg:col-span-7"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h1 className="max-w-2xl mb-6 text-4xl font-extrabold leading-tight tracking-tight text-blue-700 md:text-5xl xl:text-6xl">
                        Catálogo Virtual Personalizado
                    </h1>
                    <p className="max-w-2xl mb-8 text-lg font-medium text-gray-600 lg:mb-10 lg:text-xl">
                        Transforme a gestão do seu negócio com nosso sistema inovador! Personalize, gerencie e acompanhe suas vendas de forma prática e eficiente.
                    </p>
                    <div className="flex space-x-4 mt-6">
                        <button
                            className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            aria-label="Saiba mais sobre o catálogo"
                        >
                            Saiba Mais
                        </button>
                    </div>
                </motion.div>
                <motion.div
                    className="hidden lg:flex lg:col-span-5 lg:justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="relative bg-gradient-to-r from-gray-50 via-white to-gray-100 p-4 rounded-lg shadow-lg">
                        <Image
                            src={publicOne}
                            alt="Catálogo virtual"
                            className="rounded-lg"
                            quality={100}
                            priority
                        />
                    </div>
                </motion.div>
            </div>

            <div className="w-full bg-blue-600 flex flex-col items-center justify-center text-center text-white py-12">
                <h2 className="text-3xl font-bold mb-6">Suporte personalizado para tirar todas as suas dúvidas</h2>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 max-w-5xl w-full px-6">
                    <motion.a
                        href="mailto:tiago.rafael019@gmail.com?subject=Assunto&body=Corpo%20do%20e-mail"
                        className="bg-white cursor-pointer rounded-2xl p-6 text-gray-800 shadow-lg hover:shadow-xl transition duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex justify-center text-blue-600 text-4xl mb-4">
                            <FaEnvelope />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-center">Tire suas dúvidas</h3>
                        <p className="text-center text-gray-600">Entre em contato via e-mail para obter respostas rápidas e eficientes.</p>
                    </motion.a>
                    <motion.a
                        href="https://wa.me/5585987805592/?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20seu%20sistema%20e%20as%20informações%20disponíveis."
                        target="_blank"
                        className="bg-white cursor-pointer rounded-2xl p-6 text-gray-800 shadow-lg hover:shadow-xl transition duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex justify-center text-green-500 text-4xl mb-4">
                            <FaWhatsapp />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-center">Chat no WhatsApp</h3>
                        <p className="text-center text-gray-600">Converse conosco pelo WhatsApp para dúvidas e sugestões de melhorias.</p>
                    </motion.a>
                    <Link href="/help">
                        <motion.div
                            className="bg-white cursor-pointer rounded-2xl p-6 text-gray-800 shadow-lg hover:shadow-xl transition duration-300"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex justify-center text-yellow-500 text-4xl mb-4">
                                <FaQuestionCircle />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-center">Central de Ajuda</h3>
                            <p className="text-center text-gray-600">Acesse artigos e tutoriais para solucionar suas dúvidas rapidamente.</p>
                        </motion.div>
                    </Link>
                </div>
            </div>
            <div className="max-w-screen-xl px-6 py-12 mx-auto">
                <h2
                    className="mb-8 text-3xl font-bold text-blue-700 text-center"
                >
                    Benefícios do Nosso Sistema
                </h2>
                <motion.div
                    className="grid gap-6 lg:grid-cols-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, staggerChildren: 0.2 }}
                    viewport={{ once: true }}
                >
                    {[
                        {
                            title: "Catálogo Digital Acessível",
                            description:
                                "Acesse seu catálogo pelo celular ou computador. Compartilhe o link com seus clientes e impulsione suas vendas.",
                        },
                        {
                            title: "Gestão de Produtos e Promoções",
                            description:
                                "Adicione produtos, personalize imagens e destaque promoções de forma simples e prática.",
                        },
                        {
                            title: "Controle de Vendas em Tempo Real",
                            description:
                                "Acompanhe suas vendas com gráficos interativos e atualizações em tempo real.",
                        },
                        {
                            title: "Integração com WhatsApp",
                            description:
                                "Compartilhe o catálogo no WhatsApp e gerencie pedidos diretamente com nosso chatbot inteligente.",
                        },
                        {
                            title: "Gestão para Restaurantes",
                            description:
                                "Visualize pedidos em tempo real para facilitar o atendimento de garçons e organizar sua cozinha.",
                        },
                    ].map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="flex items-start p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="text-blue-600 text-3xl mr-4"
                            >
                                <FaCheckCircle />
                            </motion.div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

        </section>
    );
}

'use client'

// Biblioteca
import { motion } from 'framer-motion';

export default function Plans() {
    return (
        <div className="w-full min-h-screen py-16">
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="mx-auto max-w-2xl text-center px-6">
                    <motion.h1
                        className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl leading-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Otimize seu tempo com nosso sistema
                    </motion.h1>
                    <motion.p
                        className="mt-6 text-lg leading-8 text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        Crie sua conta no{" "}
                        <span className="text-blue-600 font-semibold">Catalogue</span>{" "}
                        e descubra como podemos facilitar a gestão do seu tempo e produtividade.
                        Quer saber mais? Fale com nosso atendente no WhatsApp e conheça o sistema em
                        detalhes!
                    </motion.p>
                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
                        <motion.a
                            href="https://wa.me/seu-numero-de-whatsapp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Fale no WhatsApp <span aria-hidden="true">→</span>
                        </motion.a>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 px-4 py-4">
                {/* Plano Base */}
                <motion.div
                    className="w-full sm:w-1/3 px-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
                        <span className="text-blue-600 font-semibold text-lg block mb-4">
                            Plano Base
                        </span>
                        <h2 className="font-bold text-gray-800 mb-5 text-4xl">
                            R$ 481,00
                            <span className="text-base text-gray-500 font-medium">/ Mês</span>
                        </h2>
                        <p className="text-base text-gray-600 pb-6 mb-6 border-b">
                            Ideal para sites pessoais ou pequenos projetos de clientes.
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="text-gray-600">✔️ 1 Usuário</li>
                            <li className="text-gray-600">✔️ Todos os componentes UI</li>
                            <li className="text-gray-600">✔️ Acesso vitalício</li>
                            <li className="text-gray-600">✔️ Atualizações gratuitas</li>
                            <li className="text-gray-600">✔️ 1 projeto</li>
                            <li className="text-gray-600">✔️ Suporte por 3 meses</li>
                        </ul>
                        <a
                            href="#"
                            className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Escolher Plano Base
                        </a>
                    </div>
                </motion.div>

                {/* Plano Intermediário */}
                <motion.div
                    className="w-full sm:w-1/3 px-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
                        <span className="text-blue-600 font-semibold text-lg block mb-4">
                            Plano Intermediário
                        </span>
                        <h2 className="font-bold text-gray-800 mb-5 text-4xl">
                            R$ 981,00
                            <span className="text-base text-gray-500 font-medium">/ Mês</span>
                        </h2>
                        <p className="text-base text-gray-600 pb-6 mb-6 border-b">
                            Ideal para empresas em crescimento que precisam de mais recursos.
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="text-gray-600">✔️ 3 Usuários</li>
                            <li className="text-gray-600">✔️ Todos os componentes UI</li>
                            <li className="text-gray-600">✔️ Acesso vitalício</li>
                            <li className="text-gray-600">✔️ Atualizações gratuitas</li>
                            <li className="text-gray-600">✔️ 5 projetos</li>
                            <li className="text-gray-600">✔️ Suporte prioritário</li>
                        </ul>
                        <a
                            href="#"
                            className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Escolher Plano Intermediário
                        </a>
                    </div>
                </motion.div>

                {/* Plano Avançado */}
                <motion.div
                    className="w-full sm:w-1/3 px-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
                        <span className="text-blue-600 font-semibold text-lg block mb-4">
                            Plano Avançado
                        </span>
                        <h2 className="font-bold text-gray-800 mb-5 text-4xl">
                            R$ 1.481,00
                            <span className="text-base text-gray-500 font-medium">/ Mês</span>
                        </h2>
                        <p className="text-base text-gray-600 pb-6 mb-6 border-b">
                            Ideal para empresas grandes com uma necessidade complexa de recursos.
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="text-gray-600">✔️ Usuários ilimitados</li>
                            <li className="text-gray-600">✔️ Todos os componentes UI</li>
                            <li className="text-gray-600">✔️ Acesso vitalício</li>
                            <li className="text-gray-600">✔️ Atualizações gratuitas</li>
                            <li className="text-gray-600">✔️ Projetos ilimitados</li>
                            <li className="text-gray-600">✔️ Suporte dedicado</li>
                        </ul>
                        <a
                            href="#"
                            className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Escolher Plano Avançado
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

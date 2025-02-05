// Next
import Link from "next/link";

interface NotFoundProps {
    message: string;
    href: string;
}

export function NotFound({ message, href }: NotFoundProps) {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col items-center justify-center px-8 py-10 lg:px-24 lg:py-16 space-y-6">
                <p className="text-6xl md:text-7xl lg:text-9xl font-extrabold text-gray-300">
                    500
                </p>
                <p className="text-xl md:text-2xl lg:text-4xl font-semibold text-center text-gray-600">
                    {message} {/* A empresa que você está procurando não está registrada em nosso banco de dados. */}
                </p>
                <p className="text-base md:text-lg lg:text-xl text-gray-500 text-center mt-4">
                    Desculpe, não conseguimos encontrar os dados que você estava buscando.
                </p>
                <Link
                    href={href}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition duration-300 transform hover:scale-105"
                    title="Voltar à página inicial"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                    </svg>
                    <span className="font-medium">Voltar para a página inicial</span>
                </Link>
            </div>
        </div>
    );
}

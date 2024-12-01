// Next
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 flex items-center justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div>
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Parece que você encontrou o portal para o desconhecido!
              </h1>
              <p className="my-2 text-gray-800">
                Desculpe por isso! Clique no botão abaixo para voltar à página inicial e continuar navegando.
              </p>
              <div className="py-4">
                <Link href="/" className="sm:w-full lg:w-auto my-2 border rounded-md py-4 px-8 text-center bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">
                  Voltar para a página inicial
                </Link>
              </div>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="Erro 404" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="404 Ilustração" />
      </div>
    </div>
  );
}

'use client'

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DisplayCards } from "@/components/ui/displayCards";
import { FaTable } from "react-icons/fa";
import { Avatar } from "@nextui-org/react";

// Dados
import InfoCardOrders from "@/data/infoCards";

// Tipagem
import { ItemsOrders } from "@/types/orders";
interface ContainerOrdersProps {
  ordersData: ItemsOrders[]
}

export function ContainerOrders({ ordersData }: ContainerOrdersProps) {
  const cardsData = InfoCardOrders({ ordersData });
  console.log("Dados: ", ordersData);
  return (
    <>
      <DisplayCards data={cardsData} />
      <main className="py-6 flex flex-col">
        <Container>
          <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-gray-900 font-bold text-3xl">Pedidos</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 flex items-center gap-2 transition-colors">
              <FaTable />
              Visualizar em tabela
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coluna: Em Andamento */}
            <div className="min-w-[280px] md:min-w-[320px] flex flex-col shadow-sm border border-gray-300 rounded-md p-5 bg-[#f7f8fa]">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Em Andamento
              </h3>
              <div className="flex flex-col gap-4">
                {/* Card de pedido */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar name="Tiago Rafael" color="primary" size="lg" />
                      <p className="text-lg font-semibold text-gray-700">Tiago Rafael</p>
                    </div>
                    {/* Badge para a mesa */}
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">
                      Mesa 1
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-600 mb-1">Pedidos:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Pizza - (1x)</li>
                      <li>Americano Pão Árabe - (2x)</li>
                      <li>Refrigerante Coca-Cola 2 - (5x)</li>
                    </ul>
                    <button
                      className="mt-2 text-sm text-blue-600 hover:underline focus:outline-none"
                    >
                      Ver mais
                    </button>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-base font-bold text-gray-700">Preço:</span>
                    <span className="text-base font-bold text-emerald-500">R$ 38,00</span>
                  </div>
                </div>
                {/* Outros pedidos podem ser mapeados aqui */}
              </div>
            </div>

            {/* Coluna: Preparação */}
            <div className="min-w-[280px] md:min-w-[320px] flex flex-col shadow-sm border border-gray-300 rounded-md p-5 bg-[#f7f8fa]">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Preparação
              </h3>
              <div className="flex flex-col gap-4">
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar name="Maria Silva" color="warning" size="lg" />
                      <p className="text-lg font-semibold text-gray-700">Maria Silva</p>
                    </div>
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">
                      Mesa 3
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-600 mb-1">Pedidos:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Hambúrguer - (1x)</li>
                      <li>Batata Frita - (1x)</li>
                    </ul>
                    <button
                      className="mt-2 text-sm text-blue-600 hover:underline focus:outline-none"
                    >
                      Ver mais
                    </button>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-base font-bold text-gray-700">Preço:</span>
                    <span className="text-base font-bold text-emerald-500">R$ 45,00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna: Finalizado */}
            <div className="min-w-[280px] md:min-w-[320px] flex flex-col shadow-sm border border-gray-300 rounded-md p-5 bg-[#f7f8fa]">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Finalizado
              </h3>
              <div className="flex flex-col gap-4">
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar name="João Souza" color="success" size="lg" />
                      <p className="text-lg font-semibold text-gray-700">João Souza</p>
                    </div>
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">
                      Mesa 2
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-600 mb-1">Pedidos:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Sushi - (2x)</li>
                      <li>Tempura - (1x)</li>
                    </ul>
                    <button
                      className="mt-2 text-sm text-blue-600 hover:underline focus:outline-none"
                    >
                      Ver mais
                    </button>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-base font-bold text-gray-700">Preço:</span>
                    <span className="text-base font-bold text-emerald-500">R$ 60,00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

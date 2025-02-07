import { Container } from "@/components/ui/container";
import { DisplayCards } from "@/components/ui/displayCards";

export default async function OrdersPage() {
    return (
        <>
            <DisplayCards />
            <main className="py-4 flex flex-col">
                <Container>
                    <h2 className="text-gray-800 font-bold text-2xl mb-4">Pedidos</h2>

                    <div className="flex gap-4 overflow-x-auto p-2">
                        <div className="w-full min-w-[280px] md:min-w-[320px] flex flex-col shadow-md rounded-lg p-4 bg-gray-300" >
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">
                                Em Andamento
                            </h3>
                            <div className="flex flex-col gap-3">
                                <div className="bg-white p-3 rounded-lg shadow-sm transition-transform hover:scale-105">
                                    Pedido 1
                                </div>
                            </div>
                        </div>

                        <div className="w-full min-w-[280px] md:min-w-[320px] flex flex-col shadow-md rounded-lg p-4 bg-yellow-300" >
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">
                                Em Andamento
                            </h3>
                            <div className="flex flex-col gap-3">
                                <div className="bg-white p-3 rounded-lg shadow-sm transition-transform hover:scale-105">
                                    Pedido 1
                                </div>
                            </div>
                        </div>

                        <div className="w-full min-w-[280px] md:min-w-[320px] flex flex-col shadow-md rounded-lg p-4 bg-green-300" >
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">
                                Finalizado
                            </h3>
                            <div className="flex flex-col gap-3">
                                <div className="bg-white p-3 rounded-lg shadow-sm transition-transform hover:scale-105">
                                    Pedido 1
                                </div>
                            </div>
                        </div>
                    </div>

                </Container>
            </main>
        </>
    );
}

const columns = [
    {
        id: "in-progress",
        title: "Em Andamento",
        orders: ["Pedido 1", "Pedido 4", "Pedido 7"]
    },
    {
        id: "preparing",
        title: "Em Preparação",
        orders: ["Pedido 2", "Pedido 5"],
        bgColor: "bg-yellow-300",
    },
    {
        id: "finished",
        title: "Finalizado",
        orders: ["Pedido 3", "Pedido 6", "Pedido 8"],
        bgColor: "bg-green-300",
    },
];

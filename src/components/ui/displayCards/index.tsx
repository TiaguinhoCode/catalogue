// Bibliotecas
import { FaCheckCircle, FaClipboardList, FaTruckLoading } from "react-icons/fa";

export function DisplayCards() {
    const cards = [
        {
            title: "Pedidos Em Andamento",
            count: 333,
            color: "from-blue-500 to-violet-500",
            icon: <FaClipboardList className="text-white text-2xl" />,
        },
        {
            title: "Pedidos em Preparação",
            count: 120,
            color: "from-red-600 to-orange-600",
            icon: <FaTruckLoading className="text-white text-2xl" />,
        },
        {
            title: "Pedidos Prontos",
            count: 200,
            color: "from-emerald-500 to-teal-400",
            icon: <FaCheckCircle className="text-white text-2xl" />,
        },
    ];

    return (
        <div className="w-full py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between w-full bg-white shadow-lg rounded-2xl p-6 min-h-[120px] transform transition-transform hover:scale-105"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-semibold text-gray-600 uppercase">
                                    {card.title}
                                </p>
                                <h5 className="text-xl font-bold text-gray-800">{card.count}</h5>
                            </div>
                            <div
                                className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tl ${card.color}`}
                            >
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
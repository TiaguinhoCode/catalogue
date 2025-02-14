// React
import { ReactNode } from "react";

// Tipagem
type ItemsCards = {
    title: string;
    count: number;
    color: string;
    icon: ReactNode;
}

export function DisplayCards({ data }: { data: ItemsCards[] }) {
    return (
        <div className="w-full py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((card, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between w-full bg-white shadow-lg rounded-2xl p-6 min-h-[120px] transform transition-transform"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-semibold text-gray-600 uppercase">
                                    {card.title}
                                </p>
                                <h5 className="text-xl font-bold text-gray-800">{card.count}</h5>
                            </div>
                            <div
                                className={` ${card.color} flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tl`}
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
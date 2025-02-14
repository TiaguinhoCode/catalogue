'use client'

// Bibliotecas
import { FaCheckCircle, FaClipboardList, FaTruckLoading } from "react-icons/fa";

// Tipagem
import { ItemsOrders } from "@/types/orders";
interface InfoCardOrdersProps {
    ordersData: ItemsOrders[]
}

export default function InfoCardOrders({ ordersData }: InfoCardOrdersProps) {
    const ordersInProgress = ordersData.filter(orders => orders.status.name.toLowerCase() === "em atendimento")
    const ordersInpreparation = ordersData.filter(orders => orders.status.name.toLowerCase() === "em preparação")
    const readyOrders = ordersData.filter(orders => orders.status.name.toLowerCase() === "pronto")

    const cards = [
        {
            title: "Pedidos Em Andamento",
            count: ordersInProgress.length,
            color: "from-blue-500 to-violet-500",
            icon: <FaClipboardList className="text-white text-2xl" />,
        },
        {
            title: "Pedidos em Preparação",
            count: ordersInpreparation.length,
            color: "from-red-600 to-orange-600",
            icon: <FaTruckLoading className="text-white text-2xl" />,
        },
        {
            title: "Pedidos Prontos",
            count: readyOrders.length,
            color: "from-emerald-500 to-teal-400",
            icon: <FaCheckCircle className="text-white text-2xl" />,
        },
    ];

    return cards
}
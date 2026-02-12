"use client";
import { useMe } from "../lib/hooks";
import { Skeleton } from "./Skeleton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "../lib/api";
import Link from "next/link";

interface Order {
    id: string;
    status: 'pending' | 'approved' | 'rejected';
    total: number;
}

const priceFormatter = new Intl.NumberFormat("es-ES", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});

export function UserOrders() {
	const { user, isLoading } = useMe();
	const router = useRouter();
	const [userOrders, setUserOrders] = useState<Order[] | null>();

	useEffect(() => {
		if (!user && !isLoading) {
			router.push(`/`);
		}

		if (user && !userOrders) {
            (async () => {
                try {
                    const data = await fetchApi('/me/orders');
                    setUserOrders(data.orders || []); // Aseguramos que sea array
                } catch (error) {
                    console.error("Error al cargar ordenes", error);
                    setUserOrders([]); // En caso de error, array vacío para no romper
                }
            })();
        }
	}, [isLoading, user]);

	if (isLoading || !user || !userOrders)
		return <Skeleton customClasses="w-full max-w-xl h-35" />;

    if (userOrders?.length === 0) {
        return <p>Aún no has realizado ninguna compra.</p>;
    }

	const statusColor = {
		pending: "text-yellow-400",
		approved: "text-green-400",
		rejected: "text-red-500",
	};

	return (
		<div className="flex flex-col gap-4 w-full max-w-xl">
            {userOrders.map((order) => (
                <div className="bg-orange-700/20 backdrop-blur-md border border-orange-500 rounded-xl p-4 shadow-lg flex flex-col gap-2" key={order.id}> {/* Usamos ID como key, es mejor que index */}
                    <div className="border-b border-orange-500 pb-2 flex justify-between gap-2">
                        <p className="truncate">Orden #{order.id}</p>
                        <p className={`font-bold ${statusColor[order.status] || 'text-white'}`}>
                            {order.status.toUpperCase()}
                        </p>
                    </div>
                    <p className="text-end text-xl font-mono">
                        ${priceFormatter.format(order.total)}
                    </p>
                    <Link className="text-end text-sm text-orange-300 hover:text-orange-100 transition-colors underline" href={`orders/${order.id}`}>
                        Ver detalles
                    </Link>
                </div>
            ))}
        </div>
	);
}
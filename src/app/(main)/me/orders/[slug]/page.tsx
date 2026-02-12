import { getOrderById } from "@/src/controllers/order";
import { getProductById } from "@/src/controllers/search";
import Link from "next/link";
import { PrimaryBtn } from "@/src/ui/PrimaryBtn";
import { SecondaryBtn } from "@/src/ui/SecondaryBtn";

// Helper para formatear fecha
const dateFormatter = new Intl.DateTimeFormat("es-CO", {
	dateStyle: "medium",
	timeStyle: "short",
});

const priceFormatter = new Intl.NumberFormat("es-CO", {
	style: "currency",
	currency: "COP",
	maximumFractionDigits: 0,
});

export default async function OrderIdPage({params,}: {params: Promise<{ slug: string }>;}) {
	const { slug } = await params;

	const order = await getOrderById(slug);
    const product = await getProductById(order.product[0]);
    console.log(order)

	if (!order) {
		return <div className="p-10 text-center">Orden no encontrada</div>;
	}

    const status = order.status;

    const getStatusDetails = () => {
        switch (status) {
            case "approved":
                return { text: "PAGADO", classes: "bg-green-100 text-green-700" };
            case "rejected":
                return { text: "RECHAZADO", classes: "bg-red-100 text-red-700" };
            default:
                return { text: "PENDIENTE", classes: "bg-yellow-100 text-yellow-700" };
        }
    };

    const { text, classes } = getStatusDetails();

	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center py-30 px-4">
			<div className="bg-zinc-100 text-neutral-800 w-full max-w-xl p-8 rounded-sm shadow-xl border-t-8 border-orange-500">
				<div className="flex flex-col items-start gap-5 border-b mb-8 pb-3 md:pb-8 md:flex-row md:justify-between">
					<div>
						<h1 className="text-3xl font-bold text-neutral-900">FACTURA</h1>
						<p className="text-sm text-neutral-500">#{String(order.id_mercadopago)}</p>
					</div>
					<div className="text-right">
						<div
                        className={`inline-block px-3 py-1 rounded-xl text-sm font-bold md:rounded-full ${classes}`}
                    >
                        {text}
                    </div>
					</div>
				</div>

				<div className="mb-8">
					<h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
						Facturar a:
					</h3>
					<p className="font-semibold">{String(order.client) || "Cliente"}</p>
				</div>

				<div className="mb-8">
					<table className="w-full text-left">
						<thead>
							<tr className="border-b border-neutral-200">
								<th className="py-2 text-sm font-semibold text-neutral-600">
									Descripción
								</th>
								<th className="py-2 text-sm font-semibold text-neutral-600 text-right">
									Cantidad
								</th>
								<th className="py-2 text-sm font-semibold text-neutral-600 text-right">
									Total
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b border-neutral-100">
								<td className="py-4">
									<p className="font-bold">{product.name}</p>
									<p className="text-xs text-neutral-500">
										ID: {String(order.product[0])}
									</p>
								</td>
								<td className="py-4 text-right">1</td>
								<td className="py-4 text-right font-mono">
										{priceFormatter.format(Number(order.total))}
									</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="flex justify-end mb-12 w-full">
					<div className="flex justify-between items-center w-full max-w-70 py-2 border-b border-neutral-200">
						<span className="font-semibold">Total Pagado</span>
						<span className="font-bold text-2xl text-orange-600">
							{priceFormatter.format(Number(order.total))}
						</span>
					</div>
				</div>

				<div className="text-center text-xs text-neutral-400 mt-10 pt-5 border-t">
					<p>Gracias por tu compra en Localhost.</p>
					<p>Esta es una factura digital generada automáticamente.</p>
				</div>
			</div>

			<div className="mt-8 flex gap-4">
				<Link href="/">
					<SecondaryBtn>Volver al inicio</SecondaryBtn>
				</Link>
				<Link href="/me/orders">
					<PrimaryBtn>Ir a mis compras</PrimaryBtn>
				</Link>
			</div>
		</div>
	);
}

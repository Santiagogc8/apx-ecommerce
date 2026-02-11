import { fetchApi } from "@/src/lib/api";
import Link from "next/link";
import { PrimaryBtn } from "@/src/ui/PrimaryBtn";

const priceFormatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export default async function ItemPage({params,}: {params: Promise<{ slug: string }>;}) {
	const { slug } = await params;
    const res = await fetchApi(`/products/${slug}`);
    const product = res.product;
    const stock = product.stock <= 0;

	return (
		<div className="py-30 flex flex-col items-center justify-center w-full">
			<div className="w-[80%] flex justify-center gap-10">
                <div className="bg-orange-100">
                    Producto
                </div>
                <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    {stock && <p className="text-red-500 font-bold">Actualmente no hay stock para este producto</p>}
                    <p className="text-orange-500">${priceFormatter.format(+product.unit_cost)}</p>
                    <Link href={'#'}>
                        <PrimaryBtn>Comprar</PrimaryBtn>
                    </Link>
                </div>
            </div>
		</div>
	);
}
import { getProductById } from "@/src/controllers/search";
import Link from "next/link";
import { PrimaryBtn } from "@/src/ui/PrimaryBtn";
import { ProductGallery } from "@/src/ui/ProductGallery";

const priceFormatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export default async function ItemPage({params,}: {params: Promise<{ slug: string }>;}) {
	const { slug } = await params;
    const product = await getProductById(slug) as any;
    const stock = product.stock > 0;

	return (
		<div className="py-30 flex flex-col items-center justify-center w-full xl:pt-30 xl:pb-0">
			<div className="w-[80%] flex flex-col gap-10 xl:flex-row xl:items-start pt-10">
                <div className="w-full xl:w-1/2 max-w-150">
                    <ProductGallery gallery={product.images}/>
                </div>
                <div className="flex flex-col gap-5 w-full xl:w-1/2">
                    <h3 className="text-5xl">{product.name}</h3>
                    <p>{product.description}</p>
                    {!stock && <p className="text-red-500 font-bold">Actualmente no hay stock para este producto</p>}
                    <p className="text-orange-500 text-2xl">${priceFormatter.format(+product.unit_cost)}</p>
                    <Link className="text-xl" href={`/checkout/${slug}`}>
                        <PrimaryBtn>Comprar</PrimaryBtn>
                    </Link>
                </div>
            </div>
		</div>
	);
}
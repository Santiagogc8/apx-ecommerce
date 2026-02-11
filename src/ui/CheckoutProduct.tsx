import { getProductById } from "@/src/controllers/search";

const priceFormatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export async function CheckoutProduct({ productId }: { productId: string }) {
    const product = await getProductById(productId) as any;

	return (
        <div>
            <div className="w-[80%] flex flex-col gap-10 xl:flex-row xl:items-start pt-10">
                <div className="w-full xl:w-1/2 max-w-150">
                </div>
                <div className="flex flex-col gap-5 w-full xl:w-1/2">
                    <h3 className="text-5xl">{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="text-orange-500 text-2xl">${priceFormatter.format(+product.unit_cost)}</p>
                </div>
            </div>
        </div>
    )
}
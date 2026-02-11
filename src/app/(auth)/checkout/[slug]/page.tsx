import AuthWrapper from "@/src/components/AuthWrapper";
import { getProductById } from "@/src/controllers/search";

const priceFormatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export default async function CheckoutPage({params,}: {params: Promise<{ slug: string }>;}) {
	const { slug } = await params;
    const product = await getProductById(slug) as any;

	const stock = product.stock > 0;

	if (!product) return <div>Producto no encontrado</div>;

	return (
		<AuthWrapper>
			<div className="w-full h-full flex items-center justify-center gap-10">
				<p className="text-2xl font-semibold">Estas a punto de comprar <span className="text-orange-500">{product.name}</span></p>
				<div className="w-80 bg-orange-100 rounded-2xl p-5">
					<img src={product.images[0]} alt={`${product.name}-image`} />
				</div>
			</div>
		</AuthWrapper>
	)
}
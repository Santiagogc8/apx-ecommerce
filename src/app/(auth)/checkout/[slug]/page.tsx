import AuthWrapper from "@/src/components/AuthWrapper";
import { getProductById } from "@/src/controllers/search";
import { CheckoutProduct } from "@/src/ui/CheckoutProduct";

export default async function CheckoutPage({params,}: {params: Promise<{ slug: string }>;}) {
	const { slug } = await params;
    const product = await getProductById(slug) as any;

	if (!product) return <div>Producto no encontrado</div>;

	return (
		<AuthWrapper>
			<div className="w-full xl:min-h-screen flex flex-col items-center justify-center gap-10 py-10">
				<p className="text-2xl font-semibold text-center">Estas a punto de comprar <span className="text-orange-500">{product.name}</span></p>
				<CheckoutProduct product={product}/>
			</div>
		</AuthWrapper>
	)
}
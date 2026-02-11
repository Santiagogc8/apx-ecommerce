
import { getProducts } from "@/src/controllers/search";
import { ProductCard } from "@/src/ui/ProductCard";

// En Next.js, los Server Components de tipo Page reciben los searchParams por props
export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{ q: string }>;
}) {
	const params = await searchParams;
	const q = params.q || "";

	// Llamas al controller directo, sin fetchApi
	const response = await getProducts(q, 0, 10);
	const results = response.results || [];

	return (
		<div className="flex flex-col gap-10 items-center py-30">
			{results.length <= 0 ? (
				<p className="font-bold text-3xl text-center">
					Vaya, al parecer no encontramos:{" "}
					<span className="text-orange-500">{q}</span>
				</p>
			) : (
				<>
					<p className="font-bold text-3xl text-center">
						Se completó el fetch para:{" "}
						<span className="text-orange-500">{q}</span>
					</p>
					<div className="flex gap-10 w-full flex-wrap justify-center">
						{results.map((product) => (
							<ProductCard
								imageUrl={product.images[0]}
								name={product.name}
								price={product.unit_cost}
								key={product.objectID}
								id={product.objectID}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
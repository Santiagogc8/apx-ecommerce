"use client";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/src/lib/hooks";
import { ProductCard } from "@/src/ui/ProductCard";
import { Suspense } from "react";
import { Skeleton } from "@/src/ui/Skeleton";

function SearchResults() {
	const searchParams = useSearchParams();
	const search = searchParams.get("q");
	const { products, isLoading, isError } = useProducts(search);

	return (
		<div className="flex flex-col gap-20 items-center py-30">
			<div>
				<p>Hola desde /search</p>
				<p>La query es: {search}</p>
			</div>
			{isError && <p>Ocurrio un error... {isError}</p>}
			{isLoading && <p>Estoy cargando los productos</p>}
			{products && (
				<div className="flex gap-10 w-full flex-wrap justify-center">
					{products.list?.results?.map((product) => (
						<ProductCard
							imageUrl={product.images[0]}
							name={product.name}
							price={product.unit_cost}
							key={product.objectID}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default function SearchPage() {
	return (
		<Suspense fallback={<Skeleton customClasses="w-full max-w-2xl h-[500px]"/>}>
			<SearchResults />
		</Suspense>
	);
}
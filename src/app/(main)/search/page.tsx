"use client";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/src/lib/hooks";
import { ProductCard } from "@/src/ui/ProductCard";
import { Suspense } from "react";

function SearchResults() {
	const searchParams = useSearchParams();
	const search = searchParams.get("q");
	const { products, isLoading, isError } = useProducts(search);

	return (
		<div className="min-h-screen pt-30 flex flex-col gap-20 justify-center items-center">
			<div>
				<p>Hola desde /search</p>
				<p>La query es: {search}</p>
			</div>
			{isError && <p>Ocurrio un error... {isError}</p>}
			{isLoading && <p>Estoy cargando los productos</p>}
			{products && (
				<div>
					{products.list?.results?.map((product) => (
						<ProductCard
							imageUrl={product.images[0]}
							name={"Nike air force one dos tres cuatro cinco seis siete"}
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
		<div className="min-h-screen pt-30">
			<Suspense fallback={<p>Cargando buscador...</p>}>
				<SearchResults />
			</Suspense>
		</div>
	);
}
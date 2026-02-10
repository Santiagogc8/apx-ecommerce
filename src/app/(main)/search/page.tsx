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

	const results = products?.list?.results || [];

	if (isError) return <p className="py-30 text-center">Ocurrió un error: {isError.message}</p>;

	if (isLoading) {
        return (
            <div className="w-[90%] flex flex-col items-center gap-5 py-30">
                <p>Llamando a la api...</p>
                <Skeleton customClasses="w-full h-[500px]" />
            </div>
        );
    }

	return (
		<div className="flex flex-col gap-10 items-center py-30">
			{results.length <= 0 ? (
				<p className="font-bold text-3xl text-center">
					Vaya, al parecer no encontramos:{" "}
					<span className="text-orange-500">{search}</span>
				</p>
			): (
				<>
					<p className="font-bold text-3xl text-center">
						Se completó el fetch para:{" "}
						<span className="text-orange-500">{search}</span>
					</p>
					<div className="flex gap-10 w-full flex-wrap justify-center">
						{results?.map((product) => (
							<ProductCard
								imageUrl={product.images[0]}
								name={product.name}
								price={product.unit_cost}
								key={product.objectID}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default function SearchPage() {
	return (
		<Suspense
			fallback={<Skeleton customClasses="w-full max-w-2xl h-[500px]" />}
		>
			<SearchResults />
		</Suspense>
	);
}
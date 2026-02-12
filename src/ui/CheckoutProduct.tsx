"use client";
import { Product } from "../models/products";
import { useMe } from "../lib/hooks";
import { useEffect, useState } from "react";
import { Skeleton } from "./Skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { PrimaryBtn } from "./PrimaryBtn";
import { SecondaryBtn } from "./SecondaryBtn";
import Link from "next/link";
import { fetchApi } from "../lib/api";

const priceFormatter = new Intl.NumberFormat("es-ES", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});

export function CheckoutProduct({ product }: { product: Product }) {
	const { user, isLoading } = useMe();
	const router = useRouter();
	const stock = product.stock > 0;
    const [newPrefLoading, setNewPrefLoading] = useState(false);
	const searchParams = useSearchParams();
	const status = searchParams.get("status");

	useEffect(() => {
		if (!user && !isLoading) {
			router.push(`/`);
		}
	}, [isLoading, user]);

	const handlecreatePref = async () => {
        setNewPrefLoading(true);

        const res = await fetchApi(`/order?productId=${product.objectID}`, {
            method: 'POST'
        });

        setNewPrefLoading(false);

        const {paymentLink} = res;

        window.location.href = paymentLink;
    };

	if (isLoading || !user) return <Skeleton customClasses="h-5 w-40" />;

	if(!user.address || !user.address.department || !user.address.city || !user.address.streetLine){
		return (
			<div className="flex flex-col justify-center items-center gap-5">
				<p>Oops, no hemos encontrado una direccion de envio, por favor, agrega una direccion de envio</p>
				<Link href={"/me"}>
					<PrimaryBtn>Configurar mi dirección</PrimaryBtn>
				</Link>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-10 p-5 bg-neutral-900/5 backdrop-blur-sm md:w-[70%] xl:flex-row xl:w-[60%]">
			<div className="flex flex-col gap-5 xl:w-1/2">
				<div className="flex flex-col gap-3">
					<p className="border-b border-white font-black text-lg">
						Informacion de envio
					</p>
					<p className="font-bold">
						Email: <span className="font-normal">{user.email}</span>
					</p>
					<div className="border-y border-white py-2">
						<p className="font-bold mb-2">Direccion de envio</p>
						{user.address.department && (
							<p>Departamento: {user.address.department}</p>
						)}
						{user.address.city && <p>Ciudad: {user.address.city}</p>}
						{user.address.streetLine && (
							<p>Direccion: {user.address.streetLine}</p>
						)}
						{user.address.additionalInfo && (
							<p>Informacion adicional: {user.address.additionalInfo}</p>
						)}
						{user.address.neighborhood && (
							<p>Barrio: {user.address.neighborhood}</p>
						)}
						{user.address.zipCode && <p>Codigo postal: {user.address.zipCode}</p>}
					</div>
					<p className="font-bold">
						Telefono de contacto:{" "}
						<span className="font-normal">{user.phone}</span>
					</p>
				</div>
				{status === "failure" && <p className="text-red-500 text-center md:text-start">Al parecer hubo un fallo en tu compra... Por favor intenta de nuevo</p>}
				<div className="flex gap-5 text-sm my-5">
					<Link className="w-full" href={"/me"}>
						<SecondaryBtn>Editar informacion de envio</SecondaryBtn>
					</Link>
					<PrimaryBtn handleClick={()=> handlecreatePref()} isLoading={newPrefLoading} disabled={!stock}>{!stock ? 'No hay stock' : 'Continuar con la compra'}</PrimaryBtn>
				</div>
			</div>
			<div className="flex flex-col gap-5 xl:w-1/2">
				<div className="bg-orange-100 rounded-2xl p-5 mx-auto">
					<img src={product.images[0]} alt={`${product.name}-image`} />
				</div>
				<p className="text-orange-500 text-2xl font-semibold text-center">
					Precio: $ {priceFormatter.format(+product.unit_cost)}
				</p>
			</div>
		</div>
	);
}
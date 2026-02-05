"use client";
import { PrimaryBtn } from "src/ui/PrimaryBtn";
import { Skeleton } from "../ui/Skeleton";
import Link from "next/link";
import { useMe } from "../lib/hooks";

export function Header() {
	const { user, isLoading } = useMe();

	// Creamos una funcion de retorno temprano (early return)
	const renderAuthContent = () => {
		// Valida si isLoading es true y rita un Skeleton en caso afirmativo
		if (isLoading) return <Skeleton customClasses="h-5 w-40"/>;

		if (user) { // SI tenemos un userm mostramos el email en el header
			return <p className="text-sm">{user?.email}</p>
		}

		// Por defecto (error o no user), mostramos el login
		return (
			<Link href="/login">
				<PrimaryBtn>
					<div className="relative overflow-hidden h-6">
						<p className="group-hover:-translate-y-7 transition-all duration-700 ease-out">
							Login
						</p>
						<p className="absolute top-7 left-0 group-hover:top-0 transition-all duration-700 ease-out">
							Login
						</p>
					</div>
				</PrimaryBtn>
			</Link>
		);
	};

	return (
		<header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] p-5 rounded-3xl border border-white/10 bg-neutral-900/10 backdrop-blur-md backdrop-saturate-200 shadow-[0px_3px_10px_rgba(0,0,0,0.4)] flex justify-between items-center mb-5">
			<Link href={"/"}>
				<p className="font-medium text-white text-xl">Localhost</p>
			</Link>
			{renderAuthContent()}
		</header>
	);
}
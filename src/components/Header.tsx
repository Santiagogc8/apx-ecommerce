"use client";
import { PrimaryBtn } from "src/ui/PrimaryBtn";
import { Skeleton } from "../ui/Skeleton";
import Link from "next/link";
import { useMe } from "../lib/hooks";
import { BurguerMenu, CloseMenu } from "../ui/Icons";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { ConfirmModal } from "../ui/ConfirmModal";

export function Header() {
	const { user, error, isLoading } = useMe();
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
        setMounted(true);
    }, []);

	// Creamos una funcion de retorno temprano (early return)
	const renderAuthContent = () => {
		// Valida si isLoading es true y rita un Skeleton en caso afirmativo
		if (isLoading) return <Skeleton customClasses="h-5 w-40" />;

		if (user && !error) {
			// SI tenemos un user mostramos el email en el header
			return (
				<button className="cursor-pointer hover:scale-110 transition-transform" onClick={() => setIsOpen(true)}>
					<BurguerMenu />
				</button>
			);
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
		<header className="fixed top-3 left-1/2 -translate-x-1/2 z-10 w-[95%] p-5 rounded-3xl border border-white/10 bg-neutral-900/10 backdrop-blur-md backdrop-saturate-200 shadow-[0px_3px_10px_rgba(0,0,0,0.4)] flex justify-between items-center mb-5">
			<Link href={"/"}>
				<p className="font-medium text-white text-xl">Localhost</p>
			</Link>
			{renderAuthContent()}
			{mounted && createPortal(
				<>
					<div
						className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-50 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
						onClick={() => setIsOpen(false)}
					/>

					<div
						className={`flex flex-col justify-between fixed top-0 right-0 h-screen w-full max-w-md bg-neutral-900 z-100 p-6 shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
					>
						<div className="flex justify-end mb-8">
							<button
								onClick={() => setIsOpen(false)}
								className="hover:scale-110 transition-transform cursor-pointer"
							>
								<CloseMenu />
							</button>
						</div>

						<nav className="flex-1 flex flex-col gap-6 text-white">
							<p className="text-gray-400 text-xs uppercase tracking-widest">
								Usuario
							</p>
							<p className="text-lg font-medium border-b border-white/10 pb-4">
								{user?.email}
							</p>
							<Link
								href="/me"
								className="hover:text-blue-400 transition-colors"
							>
								Mi Perfil
							</Link>
						</nav>

						<div>
							<p className="text-center">{user?.email}</p>
							<Link href='/logout'>
								<p className="text-center text-rose-800">Cerrar sesión</p>
							</Link>
						</div>
					</div>
				</>,
				document.body,
			)}
		</header>
	);
}
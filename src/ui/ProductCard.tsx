"use client"
import { BuyIcon, MoreInfo } from "@/src/ui/Icons";
import { useState, useEffect } from 'react';
import Link from "next/link";

type ProductOptions = {
    name: string;
    price: string;
    imageUrl: string;
    id: string;
}

const priceFormatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export function ProductCard({name, price, imageUrl, id}: ProductOptions){
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        if (isZoomed) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isZoomed]);

    return (
        <div className="w-80 h-80 grid grid-cols-[min-content_auto] grid-rows-[1fr_min-content] bg-orange-100 text-orange-100 rounded-2xl overflow-hidden md:w-100 md:h-100">
            <div className="p-1.5 row-span-2 bg-neutral-900 h-full flex items-center justify-center md:p-3">
                <p className="uppercase font-bold [writing-mode:vertical-rl] rotate-180 text-center tracking-wider md:text-xl leading-tight">
                    {name}
                </p>
            </div>

            {isZoomed && (
                <div 
                    onClick={() => setIsZoomed(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-md z-20 transition-opacity duration-300 animate-in fade-in"
                />
            )}

            <div className="self-center flex justify-center">
                <img 
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`transition-all duration-400 cursor-zoom-in
                        ${isZoomed 
                            ? "fixed inset-0 m-auto z-30 cursor-zoom-out rotate-0 w-auto md:h-[70vh]" 
                            : "px-4 -rotate-12 hover:rotate-0 scale-100"
                        }`} 
                    src={imageUrl} 
                    alt={name} 
                />
            </div>
            <div className="self-center justify-self-center w-full py-3 px-5 flex items-center gap-3">
                <Link href={`/item/${id}`}>
                    <MoreInfo stroke="#000" />
                </Link>
                <p className="font-bold text-xl text-center text-black flex-1">$ {priceFormatter.format(+price)}</p>
                <Link href={`/checkout/${id}`}>
                    <BuyIcon fill="#000" />
                </Link>
            </div>
        </div>
    )
}
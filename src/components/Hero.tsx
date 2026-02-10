"use client"
import { bgPattern } from "src/ui/bgPattern";
import { Typewriter } from "../ui/Typewriter";

export function Hero({ minHeight = "150" }) {
	return (
		<section style={bgPattern} className={`flex flex-col justify-center items-center ${minHeight} md:-mx-20`}>
			<div className="min-h-16 md:min-h-32 flex items-center">
                <h1 className="text-5xl font-medium text-center text-white md:text-8xl font-variable">
                    <span className="sr-only">Bienvenido a Localhost</span>
                    <span aria-hidden="true">
                        <Typewriter text=" Bienvenido a Localhost" speed={120} />
                    </span>
                </h1>
            </div>
			<p className="text-white text-center md:text-2xl">
				El ecommerce que los <span className="text-orange-500">{'<developers />'}</span> merecen
			</p>
		</section>
	);
}
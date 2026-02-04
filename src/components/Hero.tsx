import { bgPattern } from "src/ui/bgPattern";

export function Hero({ minHeight = "150" }) {
	return (
		<section style={bgPattern} className={`flex flex-col justify-center items-center ${minHeight} md:-mx-20`}>
			<h1 className="text-4xl font-medium text-center font-variable text-white md:text-8xl">
				Bienvenido a Localhost
			</h1>
			<p className="text-white text-center md:text-2xl">
				El ecommerce que los developers merecen
			</p>
		</section>
	);
}
import { PrimaryBtn } from "src/ui/PrimaryBtn";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-[95%] mx-auto p-5 rounded-b-3xl border-white/10 bg-zinc-900/60 backdrop-blur-xs backdrop-saturate-200 shadow-[0px_3px_10px_rgba(0,0,0,0.4)] flex justify-between items-center mb-5">
			<p className="font-medium text-white text-xl">Localhost</p>
			<PrimaryBtn>
				<div className="relative overflow-hidden">
					<p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
						Login
					</p>
					<p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
						Login
					</p>
				</div>
			</PrimaryBtn>
		</header>
	);
}
import { PrimaryBtn } from "src/ui/PrimaryBtn"

export function Header(){
    return (
        <header className="sticky top-0 z-50 w-full p-5 rounded-b-3xl border-white/10 bg-zinc-900/60 backdrop-blur-xs backdrop-saturate-200 shadow-[0px_3px_10px_rgba(0,0,0,0.4)] flex justify-between items-center mb-5">
            <p className="text-white">Just a test</p>
            <PrimaryBtn>Ingresar</PrimaryBtn>
        </header>
    )
}
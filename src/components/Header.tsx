import { BaseBtn } from "../ui/BaseBtn"

export function Header(){
    return (
        <header className="w-full p-5 rounded-b-2xl bg-zinc-900 flex justify-between items-center">
            <p className="text-white">Just a test</p>
            <BaseBtn>Ingresar</BaseBtn>
        </header>
    )
}
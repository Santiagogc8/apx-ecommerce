import { Login } from "@/src/components/Login";

export default async function Signin({searchParams}){
    const {redirectTo} = await searchParams;

    return (
        <section className="h-full flex flex-col items-center justify-center">
            <div className="w-full">
                <Login redirectTo={redirectTo}/>
            </div>
        </section>
    )
}
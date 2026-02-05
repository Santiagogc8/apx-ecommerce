"use client"
import { useMe } from "@/src/lib/hooks";
import { Skeleton } from "@/src/ui/Skeleton";

export default function MePage(){
    const {user, error, isLoading} = useMe();

    const renderUserContent = () => {
        if(isLoading){
            return (
                <div className="flex flex-col items-center gap-2 h-content">
                    <h3 className="text-3xl">Bienvenido de nuevo</h3>
                    <Skeleton customClasses="w-50 h-8 inline-block"/>
                </div>
            )
        }

        if(error){
            return(
                <>
                    <p>Ocurrio un error al cargar la data</p>
                    <p>{error}</p>
                </>
            )
        }

        return (
            <div>
                <h3 className="text-3xl text-center">Bienvenido de nuevo {user?.email}</h3>
            </div>
        )
    }

    return (
        <section className="min-h-screen flex flex-col items-center justify-center">
            {renderUserContent()}
        </section>
    )
}
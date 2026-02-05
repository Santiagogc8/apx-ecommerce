"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/src/lib/api";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            try{
                await fetchApi('/auth/logout', {
                    method: "POST"
                });

                router.push('/')
            } catch(error){
                alert("Ocurrio un error: " + error);
                return router.replace('/login');
            }
        };

        performLogout();
    }, [router]);

    return <div>Cerrando sesión... 🔒</div>;
}
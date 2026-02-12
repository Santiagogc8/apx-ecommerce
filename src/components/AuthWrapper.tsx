"use client";
import { useMe } from "@/src/lib/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useMe();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user && !isLoading) {
            router.push(`/login?redirectTo=${pathname}`);
        }
    }, [user, isLoading, router, pathname]);

    if (isLoading){
        return (
            <div className="min-h-screen w-full flex justify-center items-center">
                <p>Cargando...</p>
            </div>
        )
    }

    return <>{children}</>;
}
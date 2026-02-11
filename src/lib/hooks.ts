import useSWR from 'swr'; // Importamos el hook de useSWR
import { fetchApi } from "./api"; // E importamos nuestro fetchApi
import { useState, useEffect } from 'react';

// Creamos y exportamos nuestra funcion useMe (tiene que ser sincrona)
export function useMe(){
    // Le decimos a useSWR que su id es /me y llamamos el fetcher (este solo hace GET, no hace POST por hook)
    // useSWR pide la data cada vez que el usuario recarga, cambia de pestaña o recupera la conexion
    const { data, error, isLoading, mutate } = useSWR("/me", fetchApi, {
        revalidateOnFocus: false, // Evita llamadas al cambiar de pestaña
        shouldRetryOnError: false, // Si falla una vez (ej: no hay token), no sigue intentando
        dedupingInterval: 10000, // Durante 10 segundos, ignora peticiones repetidas al mismo endpoint
    });

    return {
        user: data?.user,
        error, 
        isLoading, 
        mutate
    }; // Retornamos la informacion, errores, cargas y mutaciones
}

export function useProducts(q: string){
    const [products, setProducts] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError]= useState<boolean | any>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const res = await fetchApi(`/search?q=${q}`);

                setProducts(res);
            } catch (error: any) {
                console.error(error);
                setIsError(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (q) {
            fetchData();
        } else {
            setIsLoading(false); 
        }
    }, [q]);

    return {
        isLoading,
        isError,
        products
    }
}
import useSWR from 'swr'; // Importamos el hook de useSWR
import { fetchApi } from "./api"; // E importamos nuestro fetchApi

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
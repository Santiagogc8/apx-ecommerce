import useSWR from 'swr'; // Importamos el hook de useSWR
import { fetchApi } from "./api"; // E importamos nuestro fetchApi

// Creamos y exportamos nuestra funcion useMe (tiene que ser sincrona)
export function useMe(){
    // Le decimos a useSWR que su id es /me y llamamos el fetcher (este solo hace GET, no hace POST por hook)
    // useSWR pide la data cada vez que el usuario recarga, cambia de pestaña o recupera la conexion
    const { data, error, isLoading, mutate } = useSWR("/me", fetchApi);

    return {
        user: data?.user,
        error, 
        isLoading, 
        mutate
    }; // Retornamos la informacion, errores, cargas y mutaciones
}
import { ApiError } from "src/models/apiError";
import { airtableBase } from "../lib/airtable";

// Creamos una funcion que verifica si hay un producto con un id
async function verifyProduct(productId: string) {
    try{
        // Intenta encontrar el producto con el productId recibido
        const product = await airtableBase('Furniture').find(productId);

        return product.fields; // Y retornamos el producto encontrado
    } catch(error){
        if(error.statusCode === 404) throw new ApiError(error.message, error.statusCode);

        // Atrapamos el error enviando una instancia de ApiError con el mensaje de error y un 500
		throw new ApiError(error.message, 500);
	}
}

async function createOrder(productId: string) {
    const product = await verifyProduct(productId);

    // Aqui verificar si hay stock y cuanto cuesta en caso de que si haya
}

export { verifyProduct }
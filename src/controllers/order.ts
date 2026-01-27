import { ApiError } from "src/models/apiError";
import { airtableBase } from "../lib/airtable";
import { createSingleProductPreference } from "src/lib/mercadopago";

// Creamos una funcion que verifica si hay un producto con un id
async function verifyProduct(productId: string) {
	try {
		// Intenta encontrar el producto con el productId recibido
		const product = await airtableBase("products").find(productId);

		return product.fields; // Y retornamos el producto encontrado
	} catch (error) {
		if (error.statusCode === 404)
			throw new ApiError(error.message, error.statusCode);

		// Atrapamos el error enviando una instancia de ApiError con el mensaje de error y un 500
		throw new ApiError(error.message, 500);
	}
}

// Creamos una funcion updateProduct que recibe un productId y una data fresca 
async function updateProduct(productId: string, newData: any) {
	try{
        await airtableBase("products").update([ // Intenta updatear la base products
            {
                id: productId, // En el id que recibimos
                fields: newData // Y le pasamos la nueva data
            },
        ]);

        return true; // Si funciono, retornamos un true
    } catch (error) {
		if (error.statusCode === 404)
			throw new ApiError(error.message, error.statusCode);

		// Atrapamos el error enviando una instancia de ApiError con el mensaje de error y un 500
		throw new ApiError(error.message, 500);
	}
}

// Para la funcion de createOrder recibimos un productId y un userMail
async function createOrder(productId: string, userMail: string) {
	const product = await verifyProduct(productId); // Verificamos si existe el producto con el id recibido

    // Si el numero de stock es menor o igual a 0, tiramos un error
	if ((product.stock as number) <= 0) throw new ApiError("out of stock", 400);

	try { // Luego intenta crear un registro en la db orders
        const newOrder = await airtableBase("orders").create([
            {
                fields: { // Especificamos sus datos
                    client: userMail,
                    status: "pending",
                    total: product.unit_cost,
                    id_mercadopago: "id de prueba",
                    product: [productId] // Y le decimos que el productId es un registro de otra tabla
                }
            }
        ]);

        // Hacemos un updateProduct (para "reservar" un producto) y restamos 1 al stock
        await updateProduct(productId, {stock: (product.stock as number) - 1});

        const orderPref = { // Creamos la preferencia
            productName: (product.name as string),
            productId: productId,
            productPrice: (product.unit_cost as number),
            quantity: 1,
            transactionId: newOrder[0].id // Y le asisgnamos el id del nuevo registro en la tabla order
        }

        // Y mediante la funcion createSingleProductPreference creamos la preferencia
        const mpOrder = createSingleProductPreference(orderPref);

        // Por ultimo retornamos el link de pago al cliente
        return (await mpOrder).init_point;
	} catch (error) {
		// Atrapamos el error enviando una instancia de ApiError con el mensaje de error y un 500
		throw new ApiError(error.message, 500);
	}
}

export { verifyProduct, createOrder };
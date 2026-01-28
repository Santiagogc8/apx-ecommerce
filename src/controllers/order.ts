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
                    id_mercadopago: "",
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

// Creamos una funcion que confirma o rechaza el pago
async function confirmOrRejectPay(id: string, status: string, mpId: string, items?: Array<any>) {
    try{
        await airtableBase("orders").update([ // Intenta updatear la base orders
            {
                id, // En el id que recibimos
                fields: {status, id_mercadopago: mpId} // Y le pasamos la nueva data (el estado y el id de pago)
            },
        ]);

        // Si el estado fue rechazado
        if(status == "rejected"){
            await Promise.all( // Esperamos una promesa de todo
                items.map(async (item) => { // Y hacemos un map sobre items
                    const product = await verifyProduct(item.id); // Donde verificamos el producto

                    await updateProduct(item.id, {stock: (product.stock as number) + 1}); // Y le sumamos 1 (la cantidad que le habiamos quitado antes)
                })
            )

            return; // Terminamos la funcion
        }

        return true; // Si funciono, retornamos un true
    } catch (error) {
		// Atrapamos el error enviando una instancia de ApiError con el mensaje de error y un 500
		throw new ApiError(error.message, 500);
	}
}

// Creamos una funcion para obtener ordenes por medio de email
async function getMyOrders(email: string) {
    try {
        // Intenta buscar en la tabla orders
        const orders = await airtableBase("orders").select({
            filterByFormula: `{client} = '${email}'` // Las que coincidan con la fila clients y tengan el valor de email
        }).all(); // Y las pide todas

        return orders.map(order => ({ // Retorna un objeto ordando por cada orden obtenida
            id: order.id,
            ...order.fields
        }));
    } catch (error) {
		// Atrapamos el error enviando una instancia de ApiError con el mensaje de error y un 500
		throw new ApiError(error.message, 500);
	}
}

// La funcion getOrderById recibe un id
async function getOrderById(orderId: string) {
    try {
        // Busca por el id recibido en la tabla orders
        const order = await airtableBase("orders").find(orderId);
        return order.fields; // Retorna el fields de la order
    } catch (error) {
        if (error.statusCode === 404) // Si hubo un error de 404, tiramos error
			throw new ApiError(error.message, error.statusCode);
		// Atrapamos el error enviando una instancia de ApiError con el mensaje de error y un 500
		throw new ApiError(error.message, 500);
	}
}

export { verifyProduct, createOrder, confirmOrRejectPay, getMyOrders, getOrderById };
// Importamos los modulos necesarios de mercadopago
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

// Inicializamos el objeto cliente
const client = new MercadoPagoConfig({
	accessToken: process.env.MP_TOKEN as string,
	options: { timeout: 5000 },
});

// Creamos una url base
const BASE_URL = process.env.VERCEL_URL || "https://aerobiological-leeann-blottingly.ngrok-free.dev";

// Inicializamos el objeto preferencia y le pasamos el cliente
const pref = new Preference(client);

// Creamos un tipo para CreatePrefOptions
type CreatePrefOptions = {
	productName: string;
	productId: string;
	productPrice: number;
    quantity: number;
	transactionId: string;
};

// Y creamos una funcion createSingleProductPreference que recibe unas options
export async function createSingleProductPreference(options: CreatePrefOptions) {
	return pref.create({
		// Retornamos la preferencia creada
		body: {
			// Le pasamos el body
			items: [
				// Y los items
				{
					id: options.productId,
					title: options.productName,
					quantity: options.quantity,
					currency_id: "COP", // Y la moneda son pesos colombianos
					unit_price: options.productPrice,
				},
			],
            notification_url: `${BASE_URL}/ipn/mercadopago`, // Esta es la url donde nos avisara el webhook
			// URL de redirección en los distintos casos
			back_urls: {
				success: "https://" + BASE_URL + "/donate/success",
				failure: "https://" + BASE_URL + "/donate/failure",
				pending: "https://" + BASE_URL + "/donate/pending",
			},
			// Id para identificar si el pago se completo
			external_reference: options.transactionId,
		},
	});
}
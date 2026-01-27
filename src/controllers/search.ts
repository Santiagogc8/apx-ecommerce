import { ApiError } from "src/models/apiError";
import { airtableBase } from "../lib/airtable";
import { productsClient, SearchResponse } from "src/middlewares/algolia";

// Creamos la funcion que usaremos para sincronizar los productos de airtable a algolia (webhook con cron job)
async function syncProducts() {
	try {
		// Este intenta esperar una nueva promesa que recibe el res y rej
		await new Promise((resolve, reject) => {
			// Especificamos la tabla y la seleccionamos. Sobre cada pagina, crea una funcion page que recibe los records y el callback fetchNextPage
			airtableBase("products")
				.select()
				.eachPage(
					async function page(records, fetchNextPage) {
						const algoliaRecords = records.map((record) => {
							// Sobre los records de la pagina hace un map donde por cada record
							return {
								// Retornamos un objeto donde
								objectID: record.id, // Guardamos el id como objectID
								...record.fields, // Y le pasamos el resto de los fields
							};
						});

						// Luego esperamos el saveObjects donde guardamos los objetos de algoliaRecords al numero de indice indexName
						await productsClient.saveObjects({
							indexName: "products-index",
							objects: algoliaRecords,
						});

						fetchNextPage(); // Al terminar con todos los productos de una pagina, pasa a la siguiente
					},
					function done(err) {
						// Luego evaluamos si quedo bien
						if (err) reject(err); // Si hubo un error, rechazamos la promesa
						resolve(true); // Si no, resolvemos la promesa con un true
					},
				);
		});
	} catch (error) {
		// Atrapamos el error enviando una instancia de ApiError con el mensaje de error y un 500
		throw new ApiError(error.message, 500);
	}
}

// Para la funcion de getProducts recibimos el q, el offset y el limit
async function getProducts(q: string, offset: number, limit: number) {
	try {
		// Intentamos esperar la respuesta de productsClient con su metodo search
		const response = await productsClient.search({
			requests: [ // Y en la request le pedimos que extraiga
				{
					indexName: "products-index", // de products-index
					query: q, // la query recibida
					hitsPerPage: limit, // Y que nos de el limite recibido como hits por pagina
					page: Math.floor(offset / limit), // E inicie la pagina sobre el numero mas bajo de la division entre el offset / limit
					filters: 'stock > 0', // Y le decimos que nos devuelva SOLO los resultados que tengan "In stock" true (1 en este caso truthy)
				},
			],
		});

		const searchResult = response.results[0] as SearchResponse; // Extraemos los resultados de la posicion 0

		return { // Y retornamos los hits
			results: searchResult.hits,
			pagination: { // Y creamos el objeto de pagination para mostrar la informacion
				offset,
				limit,
				total: searchResult.nbHits,
			},
		};
	} catch (error) { // Si hubo un error, tiramos una instancia de ApiError con el mensaje de error y 500
		throw new ApiError(error.message, 500);
	}
}

// Creamos nuestra funcion que obtiene un producto por su id
async function getProductById(id: string) {
	try{ // Intenta buscar el producto en el client con getObject
		const product = await productsClient.getObject({
			indexName: "products-index",
			objectID: id // Y el id
		});

		return product; // Y retorna el producto encontrado
	} catch (error) {
		// Si Algolia nos dice explícitamente que no existe (404)
		if (error.status === 404) {
			throw new ApiError("product not found", 404);
		}

		// Para cualquier otro error (red, credenciales, etc.) usamos 500
		throw new ApiError(error.message, 500);
	}
}

export { getProducts, syncProducts, getProductById };
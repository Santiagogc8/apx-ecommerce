import { algoliasearch, type SearchResponse } from "algoliasearch"; // Importamos algolia y sus tipos

const productsClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY); // Inicializamos el cliente

export { productsClient, SearchResponse } // Y exportamos el cliente y sus tipos
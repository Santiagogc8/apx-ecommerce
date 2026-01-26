import { ApiError } from "src/models/apiError";
import { airtableBase } from "../lib/airtable";
import { productsClient, SearchResponse } from "src/middlewares/algolia";

async function syncProducts() {
    try{
        await new Promise((resolve, reject) => {
            airtableBase("Furniture").select().eachPage(async function page(records, fetchNextPage) {
                const algoliaRecords = (records.map(record => {
                    return {
                        objectID: record.id,
                        ...record.fields
                    }
                }));

                await productsClient.saveObjects({
                    indexName: "products-index",
                    objects: algoliaRecords
                });

                fetchNextPage();
            },
                function done(err) {
                    if (err) reject(err);
                    resolve(true);
                }
            );
        });
    } catch(error){
        throw new ApiError(error.message, 500);
    }
}

async function getProducts(q: string, offset: number, limit:number) {
    try {
		const response = await productsClient.search({
			requests: [
				{ indexName: "products-index", query: q, hitsPerPage: limit, page: Math.floor(offset / limit), filters: '"In stock" = 1'},
			],
		});

        const searchResult = response.results[0] as SearchResponse;

		return {
			results: searchResult.hits,
			pagination: {
				offset,
				limit,
				total: searchResult.nbHits,
			},
		};
	} catch (error) {
        throw new ApiError(error.message, 500);
	}
}

export { getProducts, syncProducts }
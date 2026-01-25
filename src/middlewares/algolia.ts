import { algoliasearch, type SearchResponse } from "algoliasearch";

const productsClient = algoliasearch('WE56XU3XQG', '89d22e7bf77b7cd04391b4fecc2ba298');

export { productsClient, SearchResponse }
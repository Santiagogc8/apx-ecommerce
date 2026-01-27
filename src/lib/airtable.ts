import Airtable from "airtable";

const AIRTABLE_API_KEY = process.env.AIRTABLE_TOKEN

export const airtableBase = new Airtable({apiKey: AIRTABLE_API_KEY}).base('appFvjj3k819wvFSc');
import Airtable from "airtable";

const AIRTABLE_API_KEY = process.env.AIRTABLE_TOKEN

export const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base('appkt4g7kaJPCnwaz');
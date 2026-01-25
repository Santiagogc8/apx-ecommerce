import { base } from "../lib/airtable"

async function getProducts(q: string, offset: number, limit:number) {
    const results = base('Furniture').select({
        offset: offset,
        fields: [q],
        pageSize: limit
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            console.log('Retrieved', record.get('Name'));
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

export { getProducts }
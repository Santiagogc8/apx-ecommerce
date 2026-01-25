import { base } from "../lib/airtable"

async function getProducts(q: string, offset: number, limit:number) {
    const results = base('Furniture').select({
        offset: offset,
        pageSize: limit,
        filterByFormula: `SEARCH('${q}', {Name})`
    })

    return new Promise((resolve, reject) => {
        results.firstPage((err, records) => {
            if (err) return reject(err);
            
            // Airtable adjunta el offset a la respuesta de la página si hay más resultados
            // @ts-ignore (Airtable types pueden ser un poco estrictos aquí)
            const nextOffset = records.offset || null;

            const data = records.map(r => ({
                id: r.id,
                ...r.fields
            }));

            resolve({
                productos: data,
                offset: nextOffset // Este es el "ticket" para la siguiente página
            });
        });
    });
}

export { getProducts }
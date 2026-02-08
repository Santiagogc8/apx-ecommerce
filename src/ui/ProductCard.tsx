type ProductOptions = {
    name: string;
    price: string;
    images: any[];
    id: string;
}

const priceFormatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export function ProductCard({name, price, images}: ProductOptions){
    return (
        <div className="flex flex-col items-center justify-center w-50 p-4 border border-amber-300">
            {images.map((image, i) => {
                return <img src={image.url} alt={`${name}-image-${i}`} key={i} />
            })}
            <p>{name}</p>
            <p>$ {priceFormatter.format(+price)}</p>
        </div>
    )
}
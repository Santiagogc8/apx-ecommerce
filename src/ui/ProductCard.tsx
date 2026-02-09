type ProductOptions = {
    name: string;
    price: string;
    imageUrl: string;
    id: string;
}

const priceFormatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export function ProductCard({name, price, imageUrl}: ProductOptions){
    return (
        <div className="w-50 grid grid-cols-[auto_auto] grid-rows-[1fr_min-content]">
            <div className="p-3 row-span-2">
                <p className="uppercase font-bold tracking-widest [writing-mode:vertical-lr] rotate-180">{name}</p>
            </div>
            <div className="self-center">
                <img 
                    className="px-4 -rotate-20 hover:rotate-0 transition-transform duration-300" 
                    src={imageUrl} 
                    alt={name + ' - image'} 
                />
            </div>
            <div className="self-center justify-self-center">
                <p className="text-amber-600 font-bold text-lg">$ {priceFormatter.format(+price)}</p>
            </div>
        </div>
    )
}
"use client"
import { useState } from "react"

export function ProductGallery({gallery}: {gallery: Array<string>}){
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div>
            <div>
                <img src={gallery[currentImage]} alt="imagen principal" />
            </div>
            {gallery.length > 1 && (
                <div>
                    {gallery.map((image, index) => <img src={image} alt="imagen" onClick={()=> setCurrentImage(index)} key={index}/>)}
                </div>
            )}
        </div>
    )
}
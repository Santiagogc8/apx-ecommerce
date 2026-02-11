"use client";
import { useState, useRef, useEffect } from "react";

export function ProductGallery({ gallery }: { gallery: Array<string> }) {
	const [currentImage, setCurrentImage] = useState(0);
	const thumbnailsDiv = useRef(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const [isZoomed, setIsZoomed] = useState(false);

	const checkScroll = () => {
		if (thumbnailsDiv.current) {
			const { scrollLeft, scrollWidth, clientWidth } = thumbnailsDiv.current;

			setCanScrollLeft(scrollLeft > 0);

			setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
		}
	};

	useEffect(() => {
		checkScroll();
		window.addEventListener("resize", checkScroll);
		return () => window.removeEventListener("resize", checkScroll);
	}, [gallery]);

	useEffect(() => {
		if (isZoomed) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isZoomed]);

	const handleLeftClick = () => {
		thumbnailsDiv.current.scrollBy({ left: -150, behavior: "smooth" });
	};

	const handleRightClick = () => {
		thumbnailsDiv.current.scrollBy({ left: 150, behavior: "smooth" });
	};

	return (
		<div className="flex flex-col gap-5 w-full">
			{isZoomed && (
				<div
					onClick={() => setIsZoomed(false)}
					className="fixed inset-0 bg-black/40 backdrop-blur-md z-20 transition-opacity duration-300 animate-in fade-in"
				/>
			)}
			<div className="bg-orange-100 p-4 rounded-xl min-h-65 flex justify-center items-center md:min-h-110">
				<img
					onClick={() => setIsZoomed(!isZoomed)}
					src={gallery[currentImage]}
					className={`cursor-zoom-in object-contain ${isZoomed ? "fixed inset-0 m-auto z-30 cursor-zoom-out w-auto md:h-[70vh] object-contain max-w-[90%]" : "scale-100"}`}
					alt="thumbnail main"
				/>
			</div>
			{gallery.length > 1 && (
				<div className="relative flex items-center group">
					{canScrollLeft && (
						<button
							onClick={handleLeftClick}
							className="bg-gray-900/60 hover:bg-gray-900/80 transition-colors h-full px-3 text-white absolute left-0 z-10 cursor-pointer"
						>
							{"<"}
						</button>
					)}

					<div
						ref={thumbnailsDiv}
						onScroll={checkScroll}
						className="flex gap-3 overflow-x-auto relative w-full snap-x"
					>
						{gallery.map((image, index) => (
							<img
								key={index}
								src={image}
								alt={`thumbnail ${index}`}
								onClick={() => setCurrentImage(index)}
								className={`bg-orange-100 p-2 rounded-md w-24 h-24 object-contain cursor-pointer shrink-0 snap-start transition-all ${index === currentImage ? "border-2 border-orange-500" : ""}`}
							/>
						))}
					</div>

					{canScrollRight && (
						<button
							onClick={handleRightClick}
							className="bg-gray-900/60 hover:bg-gray-900/80 transition-colors h-full px-3 text-white absolute right-0 z-10 cursor-pointer"
						>
							{">"}
						</button>
					)}
				</div>
			)}
		</div>
	);
}
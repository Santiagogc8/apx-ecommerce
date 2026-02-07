import { SearchIcon } from "./Icons";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function SearchInput() {
	const [query, setQuery] = useState("");
	const [showInput, setShowInput] = useState(false);
    const inputRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
		setShowInput(false);
        setQuery('');
	}, [pathname]);

    const handleButtonClick = () => {
        if (!showInput) {
            setShowInput(true);
            setTimeout(() => inputRef.current?.focus(), 300);
            return;
        }
    }

	const handleSearchSubmit = (e) => {
		e.preventDefault();

        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.toLowerCase())}`);
        }
	};

	return (
		<form onSubmit={(e) => handleSearchSubmit(e)} className="flex gap-3 overflow-hidden w-full">
			<input
                ref={inputRef}
				onChange={(e) => setQuery(e.target.value)}
                onBlur={() => { if (!query) setShowInput(false); }}
				type="text"
				placeholder="Busca un producto"
				className={`${showInput ? "block" : "opacity-0 translate-x-45 pointer-events-none"} flex-1 transition-all duration-300 ease-out outline-0 field-sizing-content max-w-sm pr-2 border-r border-gray-400`}
				value={query}
			/>
			<button
				type={showInput ? "submit" : "button"}
				onClick={handleButtonClick}
				className="cursor-pointer"
			>
				<SearchIcon />
			</button>
		</form>
	);
}
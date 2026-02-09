type IconOptions = {
	width?: string;
	height?: string;
	stroke?: string;
	fill?: string;
};

export function BurguerMenu({
	width = "28",
	height = "28",
	stroke = "#ffffff",
}: IconOptions) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 512 512"
		>
			<path
				fill="none"
				stroke={stroke}
				strokeLinecap="round"
				strokeMiterlimit="10"
				strokeWidth="48"
				d="M88 152h336M88 256h336M88 360h336"
			/>
		</svg>
	);
}

export function CloseMenu({
	width = "28",
	height = "28",
	fill = "#ffffff",
}: IconOptions) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 512 512"
		>
			<path
				fill={fill}
				d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"
			/>
		</svg>
	);
}

export function SearchIcon({ width = "19", height = "19", fill = "#ffffff" }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 32 32"
		>
			<path
				fill={fill}
				d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"
			/>
		</svg>
	);
}

export function BuyIcon({ width = "23", height = "23", fill = "#ffffff" }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
		>
			<path
				fill={fill}
				d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M6.15 6l2.4 5h7l2.75-5zM5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25zm3.35 7h7z"
			/>
		</svg>
	);
}

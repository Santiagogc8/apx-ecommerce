type IconOptions = {
	width?: string;
	height?: string;
	stroke?: string;
    fill?: string;
};

export function BurguerMenu({
	width = "32",
	height = "32",
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
	width = "32",
	height = "32",
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
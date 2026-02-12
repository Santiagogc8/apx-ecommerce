import { ReactNode } from "react";

export type CustomBtnProps = {
	children: ReactNode;
	handleClick?: React.MouseEventHandler;
	type?: "button" | "submit" | "reset";
    disabled?: true | false;
	className?: string;
};

export function BaseBtn({children, handleClick, type = "button", className, disabled}: CustomBtnProps) {
	return (
		<button className={`w-full p-2 ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:cursor-pointer transition-all hover:shadow-[0_0_20px_#f97316]'}`} type={type} onClick={handleClick} disabled={disabled}>
			{children}
		</button>
	);
}
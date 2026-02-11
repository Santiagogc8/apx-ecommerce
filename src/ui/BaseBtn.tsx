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
		<button className={`w-full px-4 py-2 hover:cursor-pointer transition-all ${className}`} type={type} onClick={handleClick} disabled={disabled}>
			{children}
		</button>
	);
}
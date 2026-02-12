import { ReactNode } from "react";

export type CustomBtnProps = {
	children: ReactNode;
	handleClick?: React.MouseEventHandler;
	type?: "button" | "submit" | "reset";
    disabled?: true | false;
	className?: string;
	isLoading?: boolean;
};

export function BaseBtn({children, handleClick, type = "button", className, disabled, isLoading}: CustomBtnProps) {
	const baseStyles = "w-full p-2 transition-all";
    const statusStyles = isLoading ? "opacity-50 cursor-wait" : disabled ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer hover:shadow-[0_0_20px_#f97316]";

    return (
        <button 
            type={type} 
            onClick={handleClick} 
            disabled={disabled || isLoading}
            className={`${baseStyles} ${statusStyles} ${className}`}
        >
            {isLoading ? 'Cargando...' : children}
        </button>
    );
}
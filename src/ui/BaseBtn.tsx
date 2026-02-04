import { ReactNode } from "react";

type CustomBtnProps = {
	children: ReactNode;
	handleClick?: React.MouseEventHandler;
	type?: "button" | "submit";
    disabled?: true | false;
};

export function BaseBtn({children, handleClick, type = "button"}: CustomBtnProps) {
	return (
		<button className="px-4 py-2 hover:cursor-pointer w-fit text-white" type={type} onClick={handleClick}>
			{children}
		</button>
	);
}
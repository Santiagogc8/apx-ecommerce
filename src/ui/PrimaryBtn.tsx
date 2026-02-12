import { BaseBtn, type CustomBtnProps } from "./BaseBtn";

export const PrimaryBtn = (props: CustomBtnProps) => (
	<BaseBtn
		{...props}
		className="bg-orange-500 text-black rounded-lg shadow-lg/45 h-full hover:bg-orange-400 hover:text-black font-medium group"
	>
		{props.children}
	</BaseBtn>
);
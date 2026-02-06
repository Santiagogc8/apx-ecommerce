import { BaseBtn, type CustomBtnProps } from "./BaseBtn";

export const PrimaryBtn = (props: CustomBtnProps) => (
	<BaseBtn
		{...props}
		className="bg-orange-500 text-black rounded-lg shadow-lg/45 hover:shadow-[0_20px_120px_#f97316] hover:bg-orange-400 hover:text-black font-medium group"
	>
		{props.children}
	</BaseBtn>
);
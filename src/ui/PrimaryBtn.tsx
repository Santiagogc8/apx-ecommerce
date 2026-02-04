import { BaseBtn, type CustomBtnProps } from "./BaseBtn";

export const PrimaryBtn = (props: CustomBtnProps) => (
	<BaseBtn
		{...props}
		className="bg-orange-500 text-orange-950 rounded-lg shadow-orange-500 shadow-lg/45 hover:shadow-[0_0_20px_#f97316,0_0_30px_#f97316] hover:bg-orange-400 hover:text-black font-medium group "
	>
		{props.children}
	</BaseBtn>
);
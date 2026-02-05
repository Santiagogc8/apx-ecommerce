import { BaseBtn, type CustomBtnProps } from "./BaseBtn";

export const SecondaryBtn = (props: CustomBtnProps) => (
    <BaseBtn
        {...props}
        className="border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium group"
    >
        {props.children}
    </BaseBtn>
);
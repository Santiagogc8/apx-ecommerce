import { BaseBtn, type CustomBtnProps } from "./BaseBtn";

export const PrimaryBtn = (props: CustomBtnProps) => (
    <BaseBtn {...props} className="bg-blue-600 text-white hover:bg-blue-700">{props.children}</BaseBtn>
);
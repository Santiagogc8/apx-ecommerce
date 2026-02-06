import { createPortal } from "react-dom";
import { PrimaryBtn } from "./PrimaryBtn";
import { SecondaryBtn } from "./SecondaryBtn";

type ConfirmModalOptions = {
    text: string;
    onConfirm: Function;
    onCancel: Function;
}

export function ConfirmModal({text, onConfirm, onCancel}: ConfirmModalOptions){
    return (
        createPortal(
            <>
                <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-200 opacity-100`}>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center w-full h-50 max-w-sm p-8 rounded-lg bg-neutral-900 gap-10">
                        <p className="text-lg text-center">{text}</p>
                        <div className="flex w-full justify-center gap-8">
                            <SecondaryBtn handleClick={()=> onConfirm()}>
                                <p>Confirmar</p>
                            </SecondaryBtn>
                            <PrimaryBtn handleClick={()=> onCancel()}>
                                <p>Cancelar</p>
                            </PrimaryBtn>
                        </div>
                    </div>
                </div>
            </>,
            document.body
        )
    )
}

type ModalOptions = {
    text: string;
    onClose: Function;
}

export function Modal({text, onClose}: ModalOptions){
    return (
        createPortal(
            <>
                <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-200 opacity-100`}>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center w-full h-50 max-w-sm p-8 rounded-lg bg-neutral-900 gap-10">
                        <p className="text-lg text-center">{text}</p>
                        <div className="flex w-full justify-center gap-8">
                            <PrimaryBtn handleClick={()=> onClose()}>
                                <p>Cerrar</p>
                            </PrimaryBtn>
                        </div>
                    </div>
                </div>
            </>,
            document.body
        )
    )
}
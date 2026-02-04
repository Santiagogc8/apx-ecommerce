"use client"
import { useState } from "react";
import { sendCode, getToken } from "src/lib/api";
import { useRouter } from 'next/navigation';

export function Login(){
    const [email, setEmail] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [code, setCode] = useState("");
    const router = useRouter();

    const handleSendCode = async () => {
        // Validación básica de email antes de "enviar"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            await sendCode(email);
            setCodeSent(true); 
        } else {
            alert("Por favor, ingresa un correo válido.");
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if(code.length == 6){
            try{
                const res = await getToken(email, code);

                if(res){
                    router.push('/me');
                }
            } catch(error){
                alert("El codigo es invalido");
            }
        } else{
            alert("Por favor asegurate de proporcionar un codigo valido");
        }
    }

	return (
		<div className="flex-1 flex flex-col justify-center items-center mx-10">
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6 font-sans">
                <div className="group relative">
                    <label
                        htmlFor="email"
                        className="block mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-zinc-900 dark:text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                        </div>
                        <input
                            type="email"
                            id="email"
                            className="block w-full pl-10 p-3.5 bg-white text-zinc-900 font-medium text-sm border-2 border-zinc-900 focus:outline-none focus:ring-0 focus:border-blue-600 dark:bg-zinc-900 dark:text-white dark:border-zinc-100 dark:focus:border-orange-400 transition-colors duration-200 ease-in-out"
                            placeholder="name@example.com"
                            autoComplete="off"
                            value={email}
                            disabled={codeSent}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-zinc-200 -z-10 translate-x-1.5 translate-y-1.5 border-2 border-transparent dark:bg-zinc-700 transition-transform group-focus-within:translate-x-2.5 group-focus-within:translate-y-2.5" />
                    </div>
                </div>
                <div className={`group relative ${codeSent ? "inherit" : "hidden"}`}>
                    <label
                        htmlFor="password"
                        className="block mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                    >
                        Code
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-zinc-900 dark:text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6} 
                            placeholder="00000"
                            className="block w-full pl-10 p-3.5 bg-white text-zinc-900 font-medium text-sm border-2 border-zinc-900 focus:outline-none focus:ring-0 focus:border-blue-600 dark:bg-zinc-900 dark:text-white dark:border-zinc-100 dark:focus:border-orange-400 transition-colors duration-200 ease-in-out"
                            pattern="\d{6}"
                            onChange={(e) => {
                                setCode(e.target.value.replace(/\D/g, ""));
                            }}
                            value={code}
                            required
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-zinc-200 -z-10 translate-x-1.5 translate-y-1.5 border-2 border-transparent dark:bg-zinc-700 transition-transform group-focus-within:translate-x-2.5 group-focus-within:translate-y-2.5" />
                    </div>
                </div>
                {codeSent && !code && <p className="text-center text-emerald-500 font-semibold">Codigo enviado al correo electronico</p>}
                <button type="button" onClick={handleSendCode} className={`relative w-full group mt-2 cursor-pointer ${codeSent ? "hidden" : "inline-block"}`}>
                    <span className="absolute top-0 left-0 w-full h-full transition-all duration-200 ease-out transform translate-x-1.5 translate-y-1.5 bg-blue-600 dark:bg-orange-400 border-2 border-zinc-900 dark:border-white group-hover:translate-x-0 group-hover:translate-y-0" />
                    <span className="relative block w-full px-5 py-3.5 text-sm font-bold tracking-widest uppercase border-2 border-zinc-900 bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white dark:border-white">
                        Confirmar correo
                    </span>
                </button>
                <button type="submit" className={`relative w-full group mt-2 cursor-pointer ${codeSent ? "inline-block" : "hidden"}`}>
                    <span className="absolute top-0 left-0 w-full h-full transition-all duration-200 ease-out transform translate-x-1.5 translate-y-1.5 bg-blue-600 dark:bg-yellow-400 border-2 border-zinc-900 dark:border-white group-hover:translate-x-0 group-hover:translate-y-0" />
                    <span className="relative block w-full px-5 py-3.5 text-sm font-bold tracking-widest uppercase border-2 border-zinc-900 bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white dark:border-white">
                        Ingresar
                    </span>
                </button>
            </form>
        </div>
	);
};
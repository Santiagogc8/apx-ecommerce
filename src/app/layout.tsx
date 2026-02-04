import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Localhost",
	description: "Desafio final de APX by Santiago Guzman",
	creator: "Santiago Guzman",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className="bg-black font-display text-white min-h-screen">{children}</body>
		</html>
	);
}
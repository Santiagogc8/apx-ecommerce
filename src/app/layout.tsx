import { Metadata } from "next";
import "./globals.css";
import { Header } from "src/components/Header";

export const metadata: Metadata = {
    title: "Localhost",
    description: "Desafio final de APX by Santiago Guzman",
    creator: "Santiago Guzman"
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className="bg-black font-display">
				<Header/>
				<main className="md:px-20">{children}</main>
			</body>
		</html>
	);
}
import { Metadata } from "next";
import "./globals.css";
import { Header } from "src/components/Header";

export const metadata: Metadata = {
    title: "APX Ecommerce",
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
			<body>
				<Header/>
				<main>{children}</main>
			</body>
		</html>
	);
}
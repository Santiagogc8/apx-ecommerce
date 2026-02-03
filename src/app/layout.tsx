import { Metadata } from "next";
import "./globals.css";

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
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
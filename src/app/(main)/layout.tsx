import { Header } from "src/components/Header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header/>
			<main className="md:px-20">{children}</main>
		</>
	);
}
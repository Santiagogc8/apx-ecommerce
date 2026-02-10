import { Header } from "src/components/Header";
import { Suspense } from "react";
import { Skeleton } from "@/src/ui/Skeleton";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Suspense fallback={<Skeleton customClasses="w-full h-5"/>}>
				<Header/>
			</Suspense>
			<main className="md:px-20">{children}</main>
		</>
	);
}
import { bgPattern } from "src/ui/bgPattern";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main style={bgPattern} className="min-h-screen">{children}</main>
        </>
    );
}
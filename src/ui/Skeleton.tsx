export function Skeleton({ customClasses = "w-20 h-5" }: { customClasses?: string }) {
	return (
        <div className={`${customClasses} relative overflow-hidden rounded-md bg-white/10 border border-white/5`}>
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>
    )
}
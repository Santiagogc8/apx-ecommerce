import { UserOrders } from "@/src/ui/UserOrders"

export default function OrdersPage(){
    return (
        <div className="min-h-screen w-full pt-30 flex flex-col items-center gap-10 px-4">
            <p className="font-bold text-4xl">Mis ordenes</p>
            <UserOrders/>
        </div>
    )
}
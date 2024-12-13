"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SubscriptionManagementBtn() {
    const router = useRouter();
    const loadPortal = async () => {
        const res = await fetch("/api/portal")
        console.log(res)
        const data = await res.json()

        router.push(data.url)
    }

    return (
        <Button onClick={loadPortal}>サブスクリプション管理</Button>
    )
}

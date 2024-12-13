"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function GoBackBtn() {
    const router = useRouter()

    return <ChevronLeft width={24} height={24} onClick={() => router.back()} className="hover:cursor-pointer" />
}

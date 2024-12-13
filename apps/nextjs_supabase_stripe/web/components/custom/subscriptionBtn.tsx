"use client"

import { loadStripe } from "@stripe/stripe-js";
import { Button } from "../ui/button"

// ボタンの表示する内容を引数として受け取る
type SubscriptionBtnProps = {
    text: string;
    planId: string
}

export default function SubscriptionBtn({ text, planId }: SubscriptionBtnProps) {
    const processSubscription = async () => {
        const res = await fetch(`/api/subscription/${planId}`, {
            method: 'GET'
        })
        const data = await res.json();

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
        await stripe?.redirectToCheckout({ sessionId: data?.id });
    }
    return (
        <Button onClick={processSubscription}>{text}</Button>
    )
}

import ServerBtn from "@/components/custom/serverBtn";
import SubscriptionBtn from "@/components/custom/subscriptionBtn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPlans } from "@/lib/stripe";
import { getProfile, getSupabaseClient } from "@/lib/supabase";
import Link from "next/link";

export default async function Pricing() {
    const supabase = await getSupabaseClient();
    const { data: user } = await supabase.auth.getSession();

    const [plans, profile] = await Promise.all([
        await getAllPlans(),
        await getProfile(),
    ])

    const showSubscribeButton = !!user.session && !profile?.is_subscribed;
    const showCreateAccountButton = !user.session;
    const showManageSubscriptionButton = !!user.session && profile?.is_subscribed;
    return (
        <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
            {plans.map((plan) => (
                <Card key={plan.id}>
                    <CardHeader>
                        <CardTitle>{plan.name} Plan</CardTitle>
                        <CardDescription>{plan.billingCycle}</CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter className="align-rigth">
                        {showSubscribeButton && <SubscriptionBtn text={`${plan.price} ${plan.currency.toUpperCase()}`} planId={plan.id} />}
                        {showCreateAccountButton && <ServerBtn />}
                        {showManageSubscriptionButton && (
                            <Button className="font-bold text-lg"><Link href="/dashboard">サブスクリプションを管理する</Link></Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

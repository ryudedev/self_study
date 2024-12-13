import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSupabaseRoute, updateProfile } from "@/lib/supabase";
import { TablesUpdate } from "@/type";

export async function POST(req: NextRequest) {
    const supabase = await getSupabaseRoute();
    const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
    const signature = req.headers.get("stripe-signature");

    const reqBuffer = Buffer.from(await req.arrayBuffer());
    let event;

    try {
        event = stripe.webhooks.constructEvent(reqBuffer, signature!, endpointSecret!);
        switch (event.type) {
            case "customer.subscription.created":
                const customerSubscriptionCreated = event.data.object;
                await updateProfile({ customer: customerSubscriptionCreated.customer, is_subscribed: true, interval: customerSubscriptionCreated.items.data[0].plan.interval });
                break;
            case "customer.subscription.deleted":
                const customerSubscriptionDeleted = event.data.object;
                console.log("------------------------------------------")
                console.log(customerSubscriptionDeleted)
                await updateProfile({ customer: customerSubscriptionDeleted.customer, is_subscribed: false, interval: null });
                break;
            case "customer.subscription.updated":
                const customerSubscriptionUpdated = event.data.object;
                await updateProfile({ customer: customerSubscriptionUpdated.customer, is_subscribed: false, interval: null });
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (err: any) {
        return NextResponse.json({ message: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    return NextResponse.json({ received: true });
}

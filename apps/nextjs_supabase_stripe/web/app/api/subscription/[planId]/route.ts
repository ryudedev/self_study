import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSupabaseRoute } from "@/lib/supabase";

type ParamsProps = {
    params: {
        planId: string;
    }
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
    const supabase = await getSupabaseRoute();

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) return NextResponse.json("Unauthorized", { status: 401 });

    const { data: stripe_customer_data } = await supabase
        .from("profile")
        .select("stripe_customer")
        .eq("id", user?.id)
        .single();

    const planId = await params.planId;

    const session = await stripe.checkout.sessions.create({
        customer: stripe_customer_data?.stripe_customer,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price: planId,
                quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancelled`,
    })

    return NextResponse.json({ id: session.id })
}

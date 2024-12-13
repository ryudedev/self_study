import { stripe } from "@/lib/stripe";
import { getSupabaseRoute } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const supabase = await getSupabaseRoute();

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) return NextResponse.json("Unauthorized", { status: 401 });

    const { data: stripe_customer_data } = await supabase
        .from("profile")
        .select("stripe_customer")
        .eq("id", user?.id)
        .single();

    const session = await stripe.billingPortal.sessions.create({
        customer: stripe_customer_data?.stripe_customer,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
}

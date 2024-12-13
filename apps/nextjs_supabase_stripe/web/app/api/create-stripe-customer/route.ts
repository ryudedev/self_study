import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSupabaseRoute } from "@/lib/supabase";

export async function POST(request: NextRequest) {
    const supabase = await getSupabaseRoute();
    const query = request.nextUrl.searchParams.get("API_ROUTE_SECRET");

    if (query !== process.env.API_ROUTE_SECRET) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const { id, email } = data.record;
    console.log(id, email)

    const customer = await stripe.customers.create({
        email,
    })

    await supabase.from("profile").update({
        stripe_customer: customer.id
    }).eq("id", id);

    return NextResponse.json({
        message: `stripe customer created: ${customer.id}`
    })
}

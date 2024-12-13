import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseRoute } from "@/lib/supabase";

export async function GET(request: NextRequest) {
    console.log("request.url", request.url);
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
        const supabase = await getSupabaseRoute();
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(requestUrl.origin);
}

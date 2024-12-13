import { cookies } from 'next/headers';
import { createRouteHandlerClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from '@/type';
import Stripe from 'stripe';

// 非同期関数でcookiesを取得して返す
export const getSupabaseClient = async () => {
    // 非同期でCookieを取得
    const cookieStore = await cookies();

    // 同期的に返す形式にラップ
    return createServerComponentClient<Database>({
        cookies: () => cookieStore,
    });
};

export const getSupabaseRoute = async () => {
    // 非同期でCookieを取得
    const cookieStore = await cookies();

    // 同期的に返す形式にラップ
    return createRouteHandlerClient<Database>({
        cookies: () => cookieStore,
    });
}

export const getAllLessons = async () => {
    const supabase = await getSupabaseClient();  // 非同期処理
    const { data: lessons } = await supabase.from("lesson").select("*");
    return lessons;
}

export const getLessonById = async (lessonId: number) => {
    const supabase = await getSupabaseClient();  // 非同期処理
    const { data: lesson } = await supabase.from("lesson").select("*").eq("id", lessonId).single();
    return lesson;
}

export const getPremiumContentById = async (id: number) => {
    const supabase = await getSupabaseClient();  // 非同期処理
    const { data: video, error } = await supabase.from("premium_content").select("video_url").eq("id", id).single();
    return video;
}

export const getProfile = async () => {
    const supabase = await getSupabaseClient();  // 非同期処理
    const { data: profile } = await supabase.from("profile").select("*").single();
    return profile;
}

export const updateProfile = async ({ customer, is_subscribed, interval }: { customer: string | Stripe.Customer | Stripe.DeletedCustomer, is_subscribed: boolean, interval: Stripe.Plan.Interval | null }) => {
    const supabase = await getSupabaseRoute();
    const { error } = await supabase
        .from("profile")
        .update({
            is_subscribed,
            interval
        })
        .eq("stripe_customer", customer);
    console.log(error);
}

import SubscriptionManagementBtn from "@/components/custom/subscriptionManagementBtn";
import { getProfile, getSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const supabase = await getSupabaseClient();
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) return redirect("/")
    const profile = await getProfile();
    return (
        <div className="w-full max-w-3xl mx-auto py-16 px-8">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">ユーザ管理ダッシュボード</h1>
            <div>
                {profile?.is_subscribed ? (
                    <div>プラン契約中: {profile?.interval}</div>
                ) : (
                    <div>プラン未契約</div>
                )}
                <SubscriptionManagementBtn />
            </div>
        </div>
    )
}

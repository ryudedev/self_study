import { getSupabaseClient } from "@/lib/supabase";
import LoginBtn from "./loginBtn";

export default async function ServerBtn() {
    const supabase = await getSupabaseClient();
    const { data: user } = await supabase.auth.getSession();

    const session = user.session;
    return <LoginBtn session={session} />;
}

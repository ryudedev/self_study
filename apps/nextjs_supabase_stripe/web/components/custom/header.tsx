import Link from "next/link";
import { Button } from "../ui/button";
import LoginBtn from "./loginBtn";
import ServerBtn from "./serverBtn";
import { getProfile, getSupabaseClient } from "@/lib/supabase";

export default async function Header() {
    const supabase = await getSupabaseClient();
    const { data: user } = await supabase.auth.getSession();

    return (
        <div className="flex py-4 px-6 border-b border-gray-200">
            <Link href={"/"}>
                <Button variant="ghost">ホーム</Button>
            </Link>
            <Link href={"/pricing"} className="ml-4">
                <Button variant="ghost">価格</Button>
            </Link>
            {user.session && (
                <Link href={"/dashboard"} className="ml-4">
                    <Button variant="ghost">ダッシュボード</Button>
                </Link>
            )}
            <ServerBtn />
        </div>
    )
}

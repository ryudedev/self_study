"use client"
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type LoginBtnProps = {
    session: Session | null;
}

export default function LoginBtn({ session }: LoginBtnProps) {
    const supabase = createClientComponentClient();
    const router = useRouter();

    const handleSignIn = async () => {
        console.log(location.origin)
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options: { redirectTo: `${location.origin}/api/auth/callback` }
        });

    }

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return (
        <>
            {session ? (
                <Button className="ml-auto" onClick={handleSignOut}>ログアウト</Button>
            ) : (
                <Button className="ml-auto" onClick={handleSignIn}>サインイン</Button>
            )}
        </>
    )
}

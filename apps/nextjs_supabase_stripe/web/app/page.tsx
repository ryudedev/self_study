import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllLessons } from "@/lib/supabase";
import Link from "next/link";

// cookiesを使用するとSSRになる
export default async function Home() {
  const lessons = await getAllLessons();

  return (
    <main className="w-full max-w-3xl mx-auto my-16 px-2 flex flex-col gap-3">
      {lessons?.map((lesson) => (
        <Link href={`/${lesson.id}`} key={lesson.id}>
          <Card>
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{lesson.description}</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </main>
  );
}

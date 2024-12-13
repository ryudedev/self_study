import ContentTitle from "@/components/custom/contentTitle";
import GoBackBtn from "@/components/custom/goBackBtn";
import { getLessonById, getPremiumContentById } from "@/lib/supabase"
import { formatDate } from "@/lib/transformation";
import { YouTubeEmbed } from "@next/third-parties/google";

type LessonProps = {
    params: {
        lessonId: number
    }
}

export default async function LessonDetail({ params }: LessonProps) {
    const { lessonId } = await params;

    const [lesson, video] = await Promise.all([
        await getLessonById(lessonId),
        await getPremiumContentById(lessonId),
    ])
    const videoId = video?.video_url?.split("v=")[1] as string;

    return (
        <main className="w-full max-w-3xl mx-auto my-16 px-2 flex flex-col gap-3">
            {lesson ? (
                <>
                    <div className="flex items-end mb-6 justify-between">
                        <div className="flex gap-2 items-center">
                            <GoBackBtn />
                            <h1 className="text-3xl font-bold ">{lesson.title}</h1>
                        </div>
                        <p className="text-gray-400 text-sm">{formatDate(lesson.created_at)}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <ContentTitle title="コンテンツの内容" />
                        <p>{lesson.description}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <ContentTitle title="特典講座" />
                        <div className={`${!video && "blur-md"}`}>
                            <YouTubeEmbed height={400} videoid={videoId} />
                        </div>
                    </div>
                </>
            ) : <p>id: {params.lessonId} not found</p>}
        </main>
    )
}

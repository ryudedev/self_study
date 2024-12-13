type ContentTitleProps = {
    title: string
}

export default function ContentTitle({ title }: ContentTitleProps) {
    return (
        <div className="w-full flex items-center">
            <h2 className="text-xl font-bold mr-4">{title}</h2>
            <hr className="flex-1 border-t border-gray-300" />
        </div>
    )
}

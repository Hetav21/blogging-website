import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string,
    authorName: string;
    title: string;
    content: string;
    publishedDate: Date;
}

export function BlogCard({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) {


    return <Link to={`/blog/${id}`}><div className="p-4 border-solid border-b-2 border-slate-200 w-screen max-w-screen-md cursor-pointer">

    <div className="flex items-center gap-2">
        <BlogCardAvatar size="small" authorName={authorName}></BlogCardAvatar>

        <div className="font-medium text-sm">
            {authorName}
        </div>
        
        <Circle></Circle>

        <div className="text-sm font-light text-slate-700">
            <DateCal date={publishedDate.toString()}></DateCal>
        </div>

    </div>

    <div className="text-xl font-semibold pt-2">
        {title}
    </div>

    <div className="text-md font-light">
        {content.slice(0, 100) + "..."}
    </div>

    <div className="text-slate-500 text-sm font-light pt-2">
        {`${Math.ceil(content.length / 100)} min read`}
    </div>

</div></Link>

}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400">

    </div>
}

export function BlogCardAvatar({ authorName, size = "small" }: {
    authorName: string;
    size: "small" | "large";
}) {
    return <div className={`cursor-pointer relative inline-flex items-center justify-center ${size === "small" ? "w-8 h-8 " : "w-10 h-10 "} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size==="small" ? "text-sm " : "text-md "} font-medium text-gray-600 dark:text-gray-300`}>{authorName.split(" ").map((name) => name[0]).join("").toUpperCase()}</span>
    </div>
}

export function DateCal({date}: {date: String}){
    const d: Array<string> = date.split("-");
    let day = d[2].substring(0,2);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = months[parseInt(d[1])];
    const year = d[0];

    return <div>
        {`${day} of ${month}, ${year}`}
    </div>
}
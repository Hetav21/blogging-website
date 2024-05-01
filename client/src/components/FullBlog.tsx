import { blog } from "@hetav21/common-medium"
import { BlogCardAvatar, DateCal } from "./BlogCard"

export function FullBlog({ blog }: { blog: blog }) {
    return <div className="flex justify-center">
        <div className="grid lg: grid-cols-12 w-full px-10 pt-16 max-w-screen-xl gap-4">
            <div className="lg: col-span-8">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>

                <div className="inline-flex gap-1 items-center text-slate-400 pt-2">
                    Posted on <DateCal date={blog.publishedDate!.toString()}></DateCal>
                </div>

                <div className="pt-4 text-lg">
                    {blog.content}
                </div>
            </div>
            <div className="lg: col-span-4 max-w-screen-md">
                <div className="text-xl">Author</div>
                <div className="flex pt-4 gap-4 place-items-start">
                    <div className="">
                        <BlogCardAvatar size="large" authorName={`${blog.author?.name == null || undefined ? "Anonymous" : blog.author.name}`}></BlogCardAvatar>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{`${blog.author?.name == null || undefined ? "Anonymous" : blog.author.name}`}</div>

                        <div className="pt-2 text-slate-500 text-md">{blog.author?.description}</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
}
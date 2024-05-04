import { BlogCard } from "../components/BlogCard"
import { useProfileBlogs } from "../hooks/profileBlogs"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function MyBlogs() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/signin");
        }
    }, [])

    const { loading, blogs } = useProfileBlogs();

    if (loading) {
        return <div>
            {
                Array.from({ length: 10 }).map((_, index) => {
                    return <BlogSkeleton key={index}></BlogSkeleton>
                })
            }
        </div>
    }

    if (blogs.length === 0) {
        return <div>
            <div className="flex justify-center">
                <div className="flex h-screen flex-col justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800">No blogs yet</h1>
                        <p className="text-gray-500">You haven't published any blog yet</p>
                    </div>
                    <div className="mt-10">
                        <div className="flex flex-col items-center max-w-lg">
                            <div className="text-xl font-italics font-light">
                                <div>
                                    "A reader lives a thousand lives before he dies . . .
                                </div>
                                <div>
                                    The man who never reads lives only one."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    return <div className="transition duration-150 ease-in-out">
        <div className="flex justify-center">
            <div>
                {blogs.map((blog) => {
                    return <BlogCard id={blog.id} key={blog.id} authorName={`${blog.author?.name == null || undefined ? "Anonymous" : blog.author.name}`} content={blog.content} publishedDate={blog.publishedDate!} title={blog.title}></BlogCard>
                })}
            </div>
        </div>
    </div>
}
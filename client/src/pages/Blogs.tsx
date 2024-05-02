import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/blogs"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Blogs() {
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("token")) {
            navigate("/signin");
        }
    }, [])

    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            {
                Array.from({ length: 10 }).map((_, index) => {
                    return <BlogSkeleton key={index}></BlogSkeleton>
                })
            }
        </div>
    }

    return <div>
        <div className="flex justify-center">
            <div>
                {blogs.map((blog) => {
                    return <BlogCard id={blog.id} key={blog.id} authorName={`${blog.author?.name == null || undefined ? "Anonymous" : blog.author.name}`} content={blog.content} publishedDate={blog.publishedDate!} title={blog.title}></BlogCard>
                })}
            </div>
        </div>
    </div>
}
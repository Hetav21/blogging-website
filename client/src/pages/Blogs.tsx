import { BlogCard } from "../components/BlogCard"
import { AppBar } from "../components/AppBar"
import { useBlogs } from "../hooks/blogs"

export function Blogs() {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>Loading...</div>
    }

    return <div>
        <AppBar></AppBar>
        <div className="flex justify-center">
            <div>
                {blogs.map((blog) => {
                    console.log(blog);
                    return <BlogCard id={blog.id} key={blog.id} authorName={`${blog.author?.name == null || undefined ? "Anonymous" : blog.author.name}`} content={blog.content} publishedDate={blog.publishedDate!} title={blog.title}></BlogCard>
                })}
            </div>
        </div>
    </div>
}
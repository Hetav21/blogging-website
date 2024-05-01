import { useLocation } from "react-router-dom";
import { useBlog } from "../hooks/blog"
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";

export const Blog = () => { 
    const id = useLocation().pathname.substring(6);

    const {loading, blog} = useBlog({id});

    if(loading) {
        return <FullBlogSkeleton></FullBlogSkeleton>
    }

    return (
        <div>
            <FullBlog blog={blog!}></FullBlog>  
        </div>
    )
}
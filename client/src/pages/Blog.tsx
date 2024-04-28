import { useLocation } from "react-router-dom";
import { useBlog } from "../hooks/blog"
import { FullBlog } from "../components/FullBlog";
import { AppBar } from "../components/AppBar";

export const Blog = () => { 
    const id = useLocation().pathname.substring(6);

    const {loading, blog} = useBlog({id});

    if(loading) {
        return <div>Loading...</div>
    }

    console.log(blog);

    return (
        <div>
            <AppBar />
            <FullBlog blog={blog!}></FullBlog>
        </div>
    )
}
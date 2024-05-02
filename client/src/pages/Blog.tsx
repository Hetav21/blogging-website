import { useLocation, useNavigate } from "react-router-dom";
import { useBlog } from "../hooks/blog"
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";
import { useEffect } from "react";

export const Blog = () => { 
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("token")) {
            navigate("/signin");
        }
    }, [])

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
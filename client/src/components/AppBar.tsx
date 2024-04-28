import { Link } from "react-router-dom"
import { BlogCardAvatar } from "./BlogCard"

export function AppBar() {
    return <div className="border-b flex justify-between px-10 py-2 items-center"> 
        <Link to={"/blogs"} className="cursor-pointer text-3xl">Medium</Link>
        <BlogCardAvatar size="large" authorName="Hetav Shah"></BlogCardAvatar>
    </div>
}
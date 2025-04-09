import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";
import { useBlog } from "../hooks/blog";

export const Blog = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  const id = useLocation().pathname.substring(6);

  const { loading, blog } = useBlog({ id });

  if (loading) {
    return <FullBlogSkeleton></FullBlogSkeleton>;
  }

  return (
    <div>
      <FullBlog blog={blog!}></FullBlog>
    </div>
  );
};

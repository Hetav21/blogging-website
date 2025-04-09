import axios from "axios";
import { useState } from "react";
import { ApiResponse, blog } from "@hetav21/blogging-common";
import useAsyncEffect from "use-async-effect";

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);

  const [blog, setBlog] = useState<blog>();

  useAsyncEffect(async () => {
    const res = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );

    const data: ApiResponse = res.data;

    setBlog(data.blog as blog);

    setLoading(false);
  }, [id]);

  return {
    loading,
    blog,
  };
};

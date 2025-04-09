import axios from "axios";
import { useState } from "react";
import { ApiResponse, blog } from "@hetav21/blogging-common";
import useAsyncEffect from "use-async-effect";

export const useProfileBlogs = () => {
  const [loading, setLoading] = useState(true);

  const [blogs, setBlogs] = useState<blog[]>([]);

  useAsyncEffect(async () => {
    const res = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/profile`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );

    const data = res.data;

    setBlogs(data.blogs!);

    setLoading(false);
  }, []);

  return {
    loading,
    blogs,
  };
};

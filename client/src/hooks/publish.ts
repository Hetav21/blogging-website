import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ApiResponse } from "@hetav21/common-medium";
import useAsyncEffect from "use-async-effect";

export function usePublish({ title, content }: { title: string, content: string }) {    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [id , setId] = useState<string>("");

        useAsyncEffect(async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content,
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });      

            const data = response.data as ApiResponse

            setId(data.blog!.id);

            setLoading(false);
        } catch (e) {
            console.log(e);
            setError(true);
        }
        }, [])   

    return {
        loading,
        error,
        id
    }
}
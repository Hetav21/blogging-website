import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/blogs");
    } else {
      navigate("/signin");
    }
  }, []);

  return <div></div>;
}

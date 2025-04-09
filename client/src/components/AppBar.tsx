import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "./Dropdown";

export function AppBar() {
  const location = useLocation();

  if (location.pathname == "/signin" || location.pathname == "/signup") {
    return <div></div>;
  }

  return (
    <div className="border-b flex justify-between px-10 py-2 items-center">
      <Link to={"/blogs"} className="cursor-pointer text-3xl">
        Blog Site
      </Link>
      <div className="space-x-4">
        <Link to={"/publish"}>
          <button
            type="button"
            className=" text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Write
          </button>
        </Link>

        {/* <BlogCardAvatar size="large" authorName={localStorage.getItem("user") || "Annonymous"}></BlogCardAvatar> */}

        <div className="inline-flex">
          <Dropdown></Dropdown>
        </div>
      </div>
    </div>
  );
}

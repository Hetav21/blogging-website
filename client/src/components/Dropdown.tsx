import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
  TERipple,
} from "tw-elements-react";
import { BlogCardAvatar } from "./BlogCard";
import { useEffect } from "react";


export function Dropdown(): JSX.Element {

  function LogOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <TEDropdown className="flex justify-center">
      <TERipple rippleColor="light">
        <TEDropdownToggle className="flex items-center whitespace-nowrap rounded bg-primary text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 motion-reduce:transition-none">
          <BlogCardAvatar size="large" authorName={localStorage.getItem("user") || "Annonymous"}></BlogCardAvatar>
        </TEDropdownToggle>
      </TERipple>

      <TEDropdownMenu className="border border-slate-200 mt-4">
        <TEDropdownItem>
          <a href="#" className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
            My Blogs
          </a>
        </TEDropdownItem>
        <TEDropdownItem>
          <a href="#" className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
            Update Profile
          </a>
        </TEDropdownItem>
        <TEDropdownItem>
          <div className="border-t border-slate-200 block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-red-500 hover:text-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600" onClick={LogOut}>
            Sign Out
          </div>
        </TEDropdownItem>
      </TEDropdownMenu>
    </TEDropdown>
  );
}
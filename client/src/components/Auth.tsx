import { ApiResponse } from "@hetav21/blogging-common";
import { SignUpType } from "@hetav21/blogging-common/dist/schemas/User";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Auth({ type }: { type: "signup" | "signin" }) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/blogs");
    }
  }, []);

  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignUpType>({
    name: "",
    username: "",
    password: "",
    description: "",
  });

  async function sendRequest() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        postInputs,
      );
      const data: ApiResponse = res.data;

      if (data.success == false) {
        console.log(data);
        alert(data.message);
        return;
      }

      const jwt = data.userData!.token;

      localStorage.setItem("token", jwt);
      localStorage.setItem("user", data.userData!.name!);
      localStorage.setItem("username", data.userData!.username);
      localStorage.setItem("id", JSON.stringify(data.userData!.id));

      navigate("/blogs");
    } catch (e) {
      console.log(e);
      alert("Internal server error!");
      alert("Try again later.");
      return;
    }
  }

  return (
    <div className="h-screen flex justify-content flex-col">
      <div className="h-screen flex justify-center place-items-center">
        <div>
          <div className="px-10 mb-2">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
          {type === "signup" ? (
            <LabelledInput
              label="Name"
              placeholder="Donald Trump"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            ></LabelledInput>
          ) : null}
          <LabelledInput
            label="Email"
            placeholder="email@example.com"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                username: e.target.value,
              }));
            }}
          ></LabelledInput>
          <LabelledInput
            label="Password"
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          ></LabelledInput>
          {type === "signup" ? (
            <LabelledInput
              label="Description"
              placeholder="Description"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  description: e.target.value,
                }));
              }}
            ></LabelledInput>
          ) : null}
          <button
            onClick={sendRequest}
            type="button"
            className="w-full mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {type === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "password";
}) {
  return (
    <div className="place-items-start">
      <label className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}

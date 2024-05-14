"use client";
import { AUTH_API } from "@/apiConfig";
import Link from "next/link";
import { Suspense, useState } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formInputError, setFormInputError] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(AUTH_API.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        throw new Error(data.message);
      }
      if (!data.user) {
        setLoading(false);
        toast.error(data.message);
        throw new Error(data.message);
      }

      // localStorage.setItem("token", data?.user?.token);
      Cookies.set("token", data?.user?.token);
      Cookies.set("role", data?.user?.role?.name);
      Cookies.set("user", JSON.stringify(data?.user));
      setLoading(false);
      data?.user ? (window.location.href = "/") : null;
    } catch (error: any) {
      setLoading(false);
      setError(error?.message || "Invalid email or password");
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <Toaster />
        <h1 className="text-4xl text-center my-10 font-bold">Login</h1>
        <form
          className="flex flex-col justify-center items-center gap-4"
          onSubmit={handleSubmit}
        >
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              className="border-2 rounded-md p-2 shadow md:w-80 w-full focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              onInvalid={(e: any) => {
                // e.target.setCustomValidity("The Email must be Valid");
                setFormInputError({
                  ...formInputError,
                  email: e.target.validationMessage,
                });
              }}
              onInput={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  email: "",
                })
              }
            />
            <span style={{ color: "red" }} className="block">
              {formInputError.email}
            </span>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              className="border-2 rounded-md p-2 shadow md:w-80 w-full focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              onInvalid={(e: any) => {
                if (e.target.validity.tooShort) {
                  e.target.setCustomValidity(
                    "Password must be at least 8 characters"
                  );
                }
                setFormInputError({
                  ...formInputError,
                  password: e.target.validationMessage,
                });
              }}
              onInput={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  password: "",
                })
              }
            />
            <span style={{ color: "red" }} className="block">
              {formInputError.password}
            </span>
          </label>
          <div className="max-w-80 flex items-start md:w-80 w-full">
            <p>
              do you have any account?
              <Link href="/register" className="underline text-slate-700">
                {" "}
                Register
              </Link>
            </p>
          </div>
          <div className="max-w-80 md:w-80 w-full">
            <p className="text-right">
              <Link href="/forgot-password" className=" text-slate-700">
                {" "}
                Forgot Password?
              </Link>
            </p>
          </div>
          <button
            className="bg-sky-600 text-white text-lg py-2 px-16 rounded-md font-bold"
            type="submit"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </Suspense>
  );
};

export default Login;

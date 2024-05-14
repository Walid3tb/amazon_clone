"use client";
import React, { Suspense, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AUTH_API } from "@/apiConfig";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formInputError, setFormInputError] = useState({
    email: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(AUTH_API.SEND_RESET_PASS_LINK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        throw new Error(data.message);
      }
      if (!data.user) {
        setLoading(false);
        toast.success(data.message);
        throw new Error(data.message);
      }
      setLoading(false);
      window.location.href = "/login";
    } catch (error: any) {
      setLoading(false);
      setError(error?.message || "Invalid email");
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
          <button
            className="bg-sky-600 text-white text-lg py-2 px-16 rounded-md font-bold"
            type="submit"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </Suspense>
  );
};

export default ForgotPasswordPage;

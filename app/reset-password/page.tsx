"use client";
import React, { Suspense, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AUTH_API } from "@/apiConfig";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formInputError, setFormInputError] = useState({
    password: "",
    confirmPassword: "",
  });
  const searchParams = useSearchParams();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        toast.error("Confirm password is not matched!");
        throw new Error("Confirm password is not matched!");
      }
      const response = await fetch(
        AUTH_API.RESET_PASSWORD(
          searchParams.get("id") as string,
          searchParams.get("token") as string
        ),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, rePassword: confirmPassword }),
        }
      );
      const data = await response.json();

      setLoading(false);
      toast.success(data.message);
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
        <h1 className="text-4xl text-center my-10 font-bold">Reset Password</h1>
        <form
          className="flex flex-col justify-center items-center gap-4"
          onSubmit={handleSubmit}
        >
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              New Password
            </span>
            <input
              className="border-2 rounded-md p-2 shadow md:w-80 w-full focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onInvalid={(e: any) => {
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
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Confirm New Password
            </span>
            <input
              className="border-2 rounded-md p-2 shadow md:w-80 w-full focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400"
              type="password"
              placeholder="confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              onInvalid={(e: any) => {
                setFormInputError({
                  ...formInputError,
                  confirmPassword: e.target.validationMessage,
                });
              }}
              onInput={(e: any) =>
                setFormInputError({
                  ...formInputError,
                  confirmPassword: "",
                })
              }
            />
            <span style={{ color: "red" }} className="block">
              {formInputError.confirmPassword}
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

export default ResetPasswordPage;

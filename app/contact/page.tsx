"use client";
import { useState } from "react";
import services from "@/services";

type Props = {};

const ContactUs = (props: Props) => {
  const [error, setError] = useState("");
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    const formData = {
      fullName: fullName,
      email: e.target.email.value,
      message: e.target.message.value,
    };
    try {
      const response = await services.fetchContactUs(formData);
      console.log(response);

      if (!response) {
        throw new Error("Contact us failed");
      }
      if (response) {
        window.location.href = "/";
      }
    } catch (error) {
      setError("Contact us failed. Please try again.");
    }
  };
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="text-4xl text-center my-10 font-bold">Contact Us</h1>
      <form
        className="flex flex-col justify-center items-center gap-4 md:w-3/6 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              First Name
            </span>
            <input
              name="firstName"
              className="border-2 rounded-md p-2 shadow w-full focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400"
              type="text"
              placeholder="First name"
              required
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Last Name
            </span>
            <input
              name="lastName"
              className="border-2 rounded-md p-2 shadow w-full focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400"
              type="text"
              placeholder="Last name"
              required
            />
          </label>
        </div>
        <label className="block w-full">
          <span className="block text-sm font-medium text-slate-700">
            Email
          </span>
          <input
            name="email"
            className="border-2 rounded-md p-2 shadow w-full focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400"
            type="email"
            placeholder="Email"
            required
          />
        </label>
        {}
        <label className="block w-full">
          <span className="block text-sm font-medium text-slate-700">
            Message
          </span>
          <textarea
            name="message"
            rows={4}
            cols={50}
            className="border-2 rounded-md p-2 shadow w-full focus:ring-0 focus:ring-sky-400 focus:outline-none focus:border-sky-400 resize-none"
            placeholder="Message"
            required
          ></textarea>
        </label>
        <button
          className="bg-gray-900 text-white text-lg py-2 px-16 rounded-md font-bold my-5"
          type="submit"
        >
          Send
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ContactUs;

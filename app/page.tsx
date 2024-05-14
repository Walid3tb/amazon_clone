import Cookies from "js-cookie";
import Link from "next/link";

export default function Home() {
  const cookieUser = Cookies.get("user") || "{}";
  const authUser = JSON.parse(cookieUser);
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center">
        <h1 className="md:text-7xl text-3xl text-center mt-24 mb-4 font-bold">
          WELCOME TO WESELT
        </h1>
        <h1 className="md:text-7xl text-3xl text-center mb-8 font-bold">
          مرحبا بك في وصلت
        </h1>
        <p className="md:w-1/2 w-full text-center text-sm md:text-base">
          with WESELT we made it easier for you to pick up your kids from
          school. no more traffic, no more waiting.
        </p>
        <p className="md:w-1/4 w-full text-center mt-2 text-sm md:text-base">
          مع وصلت خليناها اسهل عليك تاخذ اطفالك من المدرسة انتظار اقل زحمة اقل
        </p>
        {authUser?.role?.name === "user" && (
          <Link
            href="/students"
            className="bg-gray-900 text-white text-base md:text-lg py-2 md:px-16 px-12 rounded-md font-bold my-5"
          >
            Pick Up
          </Link>
        )}
      </div>
    </div>
  );
}

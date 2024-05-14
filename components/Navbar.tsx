"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { CgMenu } from "react-icons/cg";
import { ImFacebook2 } from "react-icons/im";
import { SiGmail } from "react-icons/si";
import logo from "@/public/logo.jpg";
import Cookies from "js-cookie";

type Props = {};

const adminNavList = [
  { title: "Home", href: "/" },
  { title: "Admin Panel", href: "/admin" },
];
const securityNavList = [
  { title: "Home", href: "/" },
  { title: "My School", href: "/myschool" },
  { title: "Requests", href: "/request" },
  { title: "About Us", href: "/about" },
  { title: "Contact Us", href: "/contact" },
];
const userNavList = [
  { title: "Home", href: "/" },
  { title: "My Account", href: "/myaccount" },
  { title: "My Children", href: "/mychildren" },
  { title: "My Tracks", href: "/mytracks" },
  { title: "About Us", href: "/about" },
  { title: "Contact Us", href: "/contact" },
];

const Navbar = (props: Props) => {
  const userRole = Cookies.get("role");
  const token = Cookies.get("token");
  const cookieUser = Cookies.get("user") || "{}";
  const authUser = JSON.parse(cookieUser);

  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="bg-gray-50 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none sm:hidden"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              onClick={toggleMobileMenu}
            >
              <CgMenu />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xl uppercase font-bold md:block hidden"
            >
              <Image src={logo} alt="logo" height={80} width={120} />
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex gap-2 items-center justify-between w-full">
              {authUser?.role?.roleNumber === 800 && (
                <div>
                  <h4 className="font-bold text-xl pr-6">
                    Admin :{" "}
                    <span className="font-medium">{authUser?.school}</span>
                  </h4>
                </div>
              )}
              {authUser?.role?.roleNumber === 900
                ? adminNavList.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={`${
                        pathname === item.href ? "bg-gray-900 text-white" : ""
                      } text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                      aria-current="page"
                    >
                      {item.title}
                    </Link>
                  ))
                : authUser?.role?.roleNumber === 800
                ? securityNavList.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={`${
                        pathname === item.href ? "bg-gray-900 text-white" : ""
                      } text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                      aria-current="page"
                    >
                      {item.title}
                    </Link>
                  ))
                : userNavList.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={`${
                        pathname === item.href ? "bg-gray-900 text-white" : ""
                      } text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
                      aria-current="page"
                    >
                      {item.title}
                    </Link>
                  ))}
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href={"/login"}
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("role");
                window.location.href = "/login";
              }}
              className="text-black font-bold p-2 rounded-md"
            >
              {token ? "Logout" : "Login"}
            </Link>

            <Link href="/" className="text-white bg-sky-400 p-2 rounded-full">
              <BsTwitterX className="text-sm" />
            </Link>
            <Link href="/" className="text-white bg-sky-400 p-2 rounded-full">
              <ImFacebook2 className="text-sm" />
            </Link>
            <Link href="/" className="text-white bg-sky-400 p-2 rounded-full">
              <SiGmail className="text-sm" />
            </Link>
          </div>
        </div>
      </div>
      <div className={isMobileMenuOpen ? "" : "hidden"} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {userRole === "admin"
            ? adminNavList.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`${
                    pathname === item.href ? "bg-gray-900 text-white" : ""
                  } text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base block font-medium`}
                  aria-current="page"
                >
                  {item.title}
                </Link>
              ))
            : userRole === "security"
            ? securityNavList.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`${
                    pathname === item.href ? "bg-gray-900 text-white" : ""
                  } text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base block font-medium`}
                  aria-current="page"
                >
                  {item.title}
                </Link>
              ))
            : userNavList.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`${
                    pathname === item.href ? "bg-gray-900 text-white" : ""
                  } text-gray-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base block font-medium`}
                >
                  {item.title}
                </Link>
              ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

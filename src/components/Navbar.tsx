"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import ThemeToggle from "@/components/ThemeToggle";

const navbarLinks = [
  { path: "/", name: "home" },
  { path: "/project", name: "projects" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [phoneNav, setPhoneNav] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phoneNav ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phoneNav]);

  return (
    <nav
      className={`sticky top-0 z-50 px-6 text-xl text-darkBlue transition-all dark:text-liteLightBlue sm:px-16 ${
        scrolled ? "bg-lightBlue/90 py-5 backdrop-blur-sm dark:bg-blueCus/90" : "py-8"
      }`}
    >
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Desktop: >640px */}
        <div className="hidden items-center justify-between sm:flex">
          <ul className="flex items-center justify-center gap-x-5">
            {navbarLinks.map(({ path, name }) => (
              <li key={path} className="hover:text-gray-600 dark:hover:text-lightBlue">
                <Link href={path}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile: <=640px */}
        <div className="flex justify-end sm:hidden">
          <button
            type="button"
            onClick={() => setPhoneNav(!phoneNav)}
            aria-label={phoneNav ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={phoneNav}
            className="h-6 w-6"
          >
            <hr className="my-2 border-t-2 border-darkBlue dark:border-liteLightBlue" />
            <hr className="my-2 border-t-2 border-darkBlue dark:border-liteLightBlue" />
            <hr className="my-2 border-t-2 border-darkBlue dark:border-liteLightBlue" />
          </button>
          {phoneNav && (
            <div className="absolute top-20 z-50 flex w-72 max-w-[calc(100vw-3rem)] flex-wrap rounded-sm bg-lightBlue pb-2 dark:bg-blueCus">
              <ul className="ml-3 mt-3 flex w-32 flex-col space-y-2">
                {navbarLinks.map(({ path, name }) => (
                  <li key={path} className="hover:text-gray-800 dark:hover:text-lightBlue">
                    <Link onClick={() => setPhoneNav(false)} href={path}>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

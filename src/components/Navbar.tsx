import Link from "next/link";
import { useState, useEffect } from "react";

const navbarClick = {
  "#postservices": {
    name: "services",
  },
  "/contact": {
    name: "contact",
  },
};

interface INavbarParams {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth: number;
}

export default function Navbar({ isOn, setIsOn, windowWidth }: INavbarParams) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [phoneNav, setPhoneNav] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phoneNav ? "hidden" : "auto";
  }, [phoneNav]);

  const themeHandler = () => {
    setIsOn(!isOn);
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 px-16 text-xl backdrop-blur-sm transition-all ${
        scrolled ? "bg-lightBlue/90 py-5 dark:bg-blueCus/90" : "py-8"
      } text-darkBlue dark:text-liteLightBlue`}
    >
      {windowWidth > 640 && (
        <div className="flex items-center justify-between">
          <ul className="flex items-center justify-center gap-x-5">
            {Object.entries(navbarClick).map(([path, { name }]) => (
              <li key={path} className="hover:text-gray-800">
                <Link href={path}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
              </li>
            ))}
          </ul>
          {/* Button Theme */}
          <div className="flex items-center gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
            <button onClick={themeHandler} className="flex h-8 w-14 items-center rounded-full bg-darkBlue px-1 dark:bg-liteLightBlue">
              <div className={`block h-6 w-6 rounded-full bg-liteLightBlue transition-all dark:bg-darkBlue ${isOn ? "translate-x-6" : ""}`}></div>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </div>
        </div>
      )}
      {windowWidth <= 640 && (
        <div className={`flex justify-end`}>
          <button onClick={() => setPhoneNav(!phoneNav)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {phoneNav && (
            <div className="fixed left-0 top-0 z-50 h-screen w-full bg-lightBlue dark:bg-blueCus">
              <ul className="ml-3 mt-3 flex flex-col space-y-2 w-32">
                {Object.entries(navbarClick).map(([path, { name }]) => (
                  <li key={path} className="hover:text-gray-800">
                    <Link
                      onClick={() => setPhoneNav(!phoneNav)}
                      href={path}
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-5 absolute right-5 top-5">
                {/* Button Theme */}
                <div className="flex items-center gap-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                  <button onClick={themeHandler} className="flex h-8 w-14 items-center rounded-full bg-darkBlue px-1 dark:bg-liteLightBlue">
                    <div
                      className={`block h-6 w-6 rounded-full bg-liteLightBlue transition-all dark:bg-darkBlue ${isOn ? "translate-x-6" : ""}`}
                    ></div>
                  </button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                </div>
                <button
                  onClick={() => setPhoneNav(!phoneNav)}
                  className="rounded-md bg-liteLightBlue p-1 hover:shadow-lg dark:bg-darkBlue"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

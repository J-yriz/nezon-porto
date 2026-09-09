"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function ThemeToggle() {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement | null;
    if (!html) return;
    const themeCookie = Cookies.get("theme");

    if (themeCookie === "dark") {
      setIsOn(true);
      html.classList.add("dark");
    } else {
      setIsOn(false);
      html.classList.remove("dark");
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    const html = document.querySelector("html") as HTMLHtmlElement | null;
    if (!html) return;
    if (isOn) {
      html.classList.add("dark");
      Cookies.set("theme", "dark", { expires: 30 });
    } else {
      html.classList.remove("dark");
      Cookies.set("theme", "light", { expires: 30 });
    }
  }, [isOn, initialized]);

  return (
    <div className="flex items-center gap-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label="Toggle dark mode"
        onClick={() => setIsOn(!isOn)}
        className="flex h-8 w-14 items-center rounded-full bg-darkBlue px-1 dark:bg-liteLightBlue"
      >
        <span className={`block h-6 w-6 rounded-full bg-liteLightBlue transition-all dark:bg-darkBlue ${isOn ? "translate-x-6" : ""}`} />
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>
    </div>
  );
}

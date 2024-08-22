// Color Pallate: https://colorhunt.co/palette/1e03420e46a39ac8cde1f7f5
"use client";

import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";

import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import PostProduct from "@/components/postProduct";
import Contact from "@/components/Contact";
import ToTop from "@/components/ToTop";

export default function Home() {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowWidth]);

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;
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

    const html = document.querySelector("html") as HTMLHtmlElement;
    if (isOn) {
      html.classList.add("dark");
      Cookies.set("theme", "dark", { expires: 30 });
    } else {
      html.classList.remove("dark");
      Cookies.set("theme", "light", { expires: 30 });
    }
  }, [isOn, initialized]);

  return (
    <main className="container mx-auto">
      {windowWidth <= 1600 && (
        <>
          <Navbar isOn={isOn} setIsOn={setIsOn} windowWidth={windowWidth} />
          <Header windowWidth={windowWidth} />
          <PostProduct />
          <Contact />
          {/* ToTop button */}
          <ToTop />
        </>
      )}
      {windowWidth > 1600 && (
        <>
          <div className="flex h-screen items-center justify-center">
            <p className="text-6xl font-bold">Please resize your window to less than 1600px</p>
          </div>
        </>
      )}
    </main>
  );
}

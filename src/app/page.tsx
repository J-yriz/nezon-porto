// Color Pallate: https://colorhunt.co/palette/1e03420e46a39ac8cde1f7f5
"use client";

import { useEffect, useState, useRef } from "react";

import Header from "@/components/Header";
import PostProduct from "@/components/postProduct";
import Contact from "@/components/Contact";
import ToTop from "@/components/ToTop";

import useWindowWidth from '@/utils/windowWidth';

export default function Home() {
  const windowWidth = useWindowWidth();

  return (
    <main>
      {windowWidth <= 1600 && (
        <>
          <Header windowWidth={windowWidth}/>
          <PostProduct />
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

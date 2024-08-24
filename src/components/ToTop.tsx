import { useState, useEffect } from "react";

export default function ToTop() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`relative ${scrolled ? "" : "hidden"} z-40`}
      onClick={() => {
        window.scrollTo({ top: 0 });
      }}
    >
      <button className="fixed bottom-5 right-5 rounded bg-gray-300 dark:bg-gray-600 drop-shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="m-2 size-6 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

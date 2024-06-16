// ScrollContext.js
import React, { createContext, useState, useEffect } from "react";
import ScrollToTopButton from "../Components/Button/ScrollToTopButton";

const ScrollContext = createContext();

const ScrollProvider = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={isScrolled}>
      {children}
      <ScrollToTopButton />
    </ScrollContext.Provider>
  );
};

export { ScrollContext, ScrollProvider };

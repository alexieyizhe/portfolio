import { useState, useEffect } from "react";

export const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleWindowResize = () => {
    setWidth(typeof window !== "undefined" ? window.innerWidth : 0);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return width;
};

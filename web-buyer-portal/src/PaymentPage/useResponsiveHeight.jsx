import { useEffect, useState } from "react";

export default function useResponsiveHeight() {
  const getHeight = () => (window.innerWidth < 450 ? "46px" : "46px");
  const [height, setHeight] = useState(getHeight);

  useEffect(() => {
    const onResize = () => {
      setHeight(getHeight());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return height;
}

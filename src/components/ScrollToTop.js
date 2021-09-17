import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//when changing pathname is triggering scrollToTop
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

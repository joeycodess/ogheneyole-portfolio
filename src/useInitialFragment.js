import { useLayoutEffect } from "react";

export default function useInitialFragment() {
  useLayoutEffect(() => {
    const fragment = window.location.hash.slice(1);
    if (fragment && window.scrollY === 0) {
      document.getElementById(fragment)?.scrollIntoView();
    }
  }, []);
}

import { useEffect, useState } from "react";
import Shop from "./Shop.jsx";
import About from "./About.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  if (booting) {
    return (
      <LoadingSpinner
        variant="dots"
        size="large"
        fullscreen
        label="Loading LuxeCart"
      />
    );
  }

  if (window.location.pathname === "/about") {
    return <About />;
  }

  return <Shop />;
}

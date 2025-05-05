import { useState, useEffect } from "react";

// Custom React hook that returns the current window width and updates it in real-time when the window is resized.
function useWindowWidth() {
  // Initialize state with the current window width
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update width state when the window is resized
    const handleResize = () => setWidth(window.innerWidth);
    // Add event listener to window resize
    window.addEventListener("resize", handleResize);
    // Cleanup: remove event listener when component using this hook unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Return the current width so components can use it
  return width;
}

export default useWindowWidth;
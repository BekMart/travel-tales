import { useEffect, useRef, useState } from "react";

// Custom hook to toggle an expanded state and automatically close it when clicking outside the element
function useClickOutsideToggle() {
  // Controls whether the element is open/initial state set to false
  const [expanded, setExpanded] = useState(false);
  // Ref to the DOM element to detect outside clicks
  const ref = useRef(null);

  useEffect(() => {
    // Handler to detect clicks outside the element
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    // Listen for mouseup events on the whole document
    document.addEventListener("mouseup", handleClickOutside);
    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);
  // Return state, setter, and the ref to attach to the element
  return { expanded, setExpanded, ref };
}

export default useClickOutsideToggle;

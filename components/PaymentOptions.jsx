import { useEffect } from "react";

export const KoFiWidget = () => {
  useEffect(() => {
    // Load the Ko-fi widget script
    const script = document.createElement("script");
    script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Execute the Ko-fi widget code when the script is loaded
    script.onload = () => {
      if (typeof kofiWidgetOverlay !== "undefined") {
        kofiWidgetOverlay.draw("combostart", {
          type: "floating-chat",
          "floating-chat.donateButton.text": "Tip!",
          "floating-chat.donateButton.background-color": "#5263fa",
          "floating-chat.donateButton.text-color": "#ebebeb",
        });
      }
    };

    return () => {
      // Cleanup: Remove the script element when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return null; // Return null as this component doesn't render any visible elements
};

import { useEffect } from "react";

const GoogleAnalytics = () => {
  useEffect(() => {
    // This code will be executed when the component mounts
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-9BR6R08YJC");
  }, []);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;

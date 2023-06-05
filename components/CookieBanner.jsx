import { useState, useEffect } from "react";
import styles from "@/styles/CookieBanner.module.css";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem("cookieAccepted");
    if (cookieAccepted === "true") {
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieAccepted", "false");
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div className={styles.banner}>
          <p>
            We use cookies to enhance your experience and for analytic purposes,
            we do not sell any user data.
          </p>
          <div>
            <button className={styles.acceptButton} onClick={handleAccept}>
              Accept
            </button>
            <button className={styles.rejectButton} onClick={handleReject}>
              Reject
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;

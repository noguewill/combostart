import React, { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import styles from "@/styles/ComboHub.module.css";
import Navbar from "/components/Navbar";
import ComboGuideCard from "/components/ComboGuideCard";
import Footer from "/components/Footer";

const ComboHub = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={styles.mobileMessage}>
        <h3 style={{ fontSize: "2rem" }}>Hello!</h3>
        <p style={{ padding: "1rem" }}>
          The mobile version of this website is still in{" "}
          <strong>development</strong>, please access this website on your PC.
        </p>
        <img
          src="/logo.svg"
          alt="Combostart logo"
          width={50}
          height={50}
          style={{ marginTop: "2rem" }}
        />
      </div>
      {/* BUMP */}
      <div className={styles[`${theme}page_container`]}>
        <Navbar />
        <div className={styles.container}>
          <ComboGuideCard />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ComboHub;

import React from "react";
import styles from "@/styles/ComboPage.module.css";
import Search from "./Search";
import ThemedFooter from "./ThemedFooter";
import Navbar from "./Navbar";
import ComboCard from "./ComboCard";
import Image from "next/image";

const ComboPage = () => {
  return (
    <div className={styles.container}>
      <Image src="/graffitiBg.webp" alt="Pic" fill />
      <div className={styles.content_container}>
        <Navbar btnType={`themed`} loggedIn={true} />
        <Search btnType={`themed`} />

        <ComboCard />

        <ThemedFooter />
      </div>
    </div>
  );
};
export default ComboPage;

import React, { useState } from "react";
import styles from "@/styles/ComboGuides.module.css";
import Navbar from "./Navbar";
import Search from "./Search";
import ComboGuideCard from "./ComboGuideCard";

const ComboGuides = () => {
  const [dataFromChild, setDataFromChild] = useState("");

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  return (
    <div className={styles.bigboi}>
      <Navbar btnType={`classic`} />
      <Search btnType={`classic`} onData={handleDataFromChild} />
      <div className={styles.container}>
        <ComboGuideCard />
      </div>
    </div>
  );
};

export default ComboGuides;

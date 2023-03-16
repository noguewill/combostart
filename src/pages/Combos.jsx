import React from "react";
import styles from "@/styles/Combos.module.css";

function Combos() {
  return (
    <>
      <h4 className={styles.comboCard__title}>Ryu superless combo 5600</h4>
      <section className={styles.comboCard__container}>
        {/* Combocard upvotes */}
        <div className={styles.comboCard_upvote__container}>
          <a>arrow</a>
          <h7>469</h7>
        </div>
        {/* ComboCard */}
        <div className={styles.comboCard}>
          <section className={styles.comboCard_info__container}>
            <div className={styles.comboCard_charName}>RYU / master</div>
            <div className={styles.comboCard_super}>S</div>
            <div className={styles.comboCard_bars}>DRIVE</div>
            <div className={styles.comboCard_damage}>DAMAGE:5600</div>
            <div className={styles.comboCard_comboType}>Corner</div>
          </section>
          <section className={styles.comboCard_inputs__container}></section>
          <section className={styles.comboCard_patch__container}></section>
        </div>
      </section>
    </>
  );
}
export default Combos;

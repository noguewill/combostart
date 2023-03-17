import React from "react";
import styles from "@/styles/Combos.module.css";

function Combos() {
  return (
    <>
      <h4 className={styles.comboCard__title}>Ryu superless combo 5600</h4>
      <article className={styles.comboCard__container}>
        {/* Combocard upvotes */}
        <div className={styles.comboCard_upvote__container}>
          <a>arrow</a>
          <h7>469</h7>
        </div>

        {/* ComboCard */}
        <div className={styles.comboCard}>
          {/* Combo Information row */}
          <div className={styles.comboCard_info__container}>
            <div className={styles.comboCard_charName}>RYU / master</div>
            <div className={styles.comboCard_super}>S</div>
            <div className={styles.comboCard_bars}>DRIVE</div>
            <div className={styles.comboCard_damage}>DAMAGE:5600</div>
            <div className={styles.comboCard_comboType}>Corner</div>
          </div>

          {/* Inputs row */}
          <div className={styles.comboCard_inputs__container}>
            <div className={styles.input_container}>
              <svg className={styles.input_icon}></svg>
              <h6 className={styles.input_text}>S.MP</h6>
            </div>
          </div>

          {/* Patch version row */}
          <div className={styles.comboCard_patch__container}>
            <div className={styles.patch__text}>PATCH: v1.0.0</div>
            <div className={styles.expand_btn}>EXPAND</div>
          </div>
          {/* Bookmark, sharing, and other options section */}
        </div>
      </article>
      <div className={styles.comboCard_social__container}>
        <button className={styles.social_bookmark__btn}></button>
        <button className={styles.social_share__btn}></button>
        <button className={styles.social_more__btn}></button>
      </div>
    </>
  );
}
export default Combos;

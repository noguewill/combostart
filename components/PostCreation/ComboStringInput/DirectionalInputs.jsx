import React from "react";
import styles from "@/styles/NewPost_inputs_styles/ComboString_styles/Directional_inputs.module.css";
import Image from "next/image";

const DirectionalInputs = ({ theme, handleInputValue }) => {
  return (
    <div className={styles.directionals_section}>
      <div className={styles.directionals_container}>
        <div className={styles.directionals_column}>
          <Image
            id="upback"
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
            onClick={handleInputValue}
          />
          <Image
            id="back"
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
            onClick={handleInputValue}
          />
          <Image
            id="downback"
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
            onClick={handleInputValue}
          />
        </div>
        <div className={styles.directionals_column}>
          <Image
            id="up"
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
            onClick={handleInputValue}
          />
          <span className={styles.neutalDot}></span>
          <Image
            id="down"
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
            onClick={handleInputValue}
          />
        </div>
        <div className={styles.directionals_column}>
          <Image
            id="upforward"
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
            onClick={handleInputValue}
          />
          <Image
            id="forward"
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
            onClick={handleInputValue}
          />
          <Image
            id="downforward"
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
            onClick={handleInputValue}
          />
        </div>
      </div>

      <div className={styles.directionals_acronyms_container}>
        <div className={styles.directionals_aconyms_row}>
          <button
            id="QCF"
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={handleInputValue}
          >
            QCF
          </button>
          <button
            id="QCB"
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={handleInputValue}
          >
            QCB
          </button>
        </div>
        <div className={styles.directionals_aconyms_row}>
          <button
            id="HCF"
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={handleInputValue}
          >
            HCF
          </button>
          <button
            id="HCB"
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={handleInputValue}
          >
            HCB
          </button>
        </div>
      </div>
    </div>
  );
};
export default DirectionalInputs;

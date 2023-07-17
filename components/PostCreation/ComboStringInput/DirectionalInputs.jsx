import React, { useState } from "react";
import styles from "@/styles/NewPost_inputs_styles/ComboString_styles/Directional_inputs.module.css";
import Image from "next/image";

const DirectionalInputs = ({ theme }) => {
  return (
    <div className={styles.directionals_section}>
      <div className={styles.directionals_container}>
        <div className={styles.directionals_column}>
          <Image
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
          />
          <Image
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
          />
          <Image
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
          />
        </div>
        <div className={styles.directionals_column}>
          <Image
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
          />
          <span className={styles.neutalDot}></span>
          <Image
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
          />
        </div>
        <div className={styles.directionals_column}>
          <Image
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
          />
          <Image
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
          />
          <Image
            className={styles.directional_btn}
            src="/inputs/arrow_up.svg"
            width={42}
            height={42}
          />
        </div>
      </div>

      <div className={styles.directionals_acronyms_container}>
        <div className={styles.directionals_aconyms_row}>
          <button className={styles[`${theme}directional_acronym_btn`]}>
            QCF
          </button>
          <button className={styles[`${theme}directional_acronym_btn`]}>
            QCB
          </button>
        </div>
        <div className={styles.directionals_aconyms_row}>
          <button className={styles[`${theme}directional_acronym_btn`]}>
            HCF
          </button>
          <button className={styles[`${theme}directional_acronym_btn`]}>
            HCB
          </button>
        </div>
      </div>
    </div>
  );
};
export default DirectionalInputs;

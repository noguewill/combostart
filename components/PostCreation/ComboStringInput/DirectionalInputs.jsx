import React from "react";
import styles from "@/styles/NewPost_inputs_styles/ComboString_styles/Directional_inputs.module.css";
import Image from "next/image";

const DirectionalInputs = ({ theme, handleInputValue }) => {
  return (
    <div className={styles.directionals_section}>
      <div className={styles.directionals_container}>
        <div className={styles.directionals_column}>
          <Image
            className={styles.directional_btn}
            src="/inputs/UB.svg"
            width={40}
            height={40}
            onClick={() => handleInputValue("UB")}
          />
          <Image
            className={styles.directional_btn}
            src="/inputs/B.svg"
            width={42}
            height={42}
            onClick={() => handleInputValue("B")}
          />
          <Image
            className={styles.directional_btn}
            src="/inputs/DB.svg"
            width={40}
            height={40}
            onClick={() => handleInputValue("DB")}
          />
        </div>
        <div className={styles.directionals_column}>
          <Image
            className={styles.directional_btn}
            src="/inputs/UP.svg"
            width={42}
            height={42}
            onClick={() => handleInputValue("UP")}
          />
          <span className={styles.neutalDot}></span>
          <Image
            className={styles.directional_btn}
            src="/inputs/D.svg"
            width={42}
            height={42}
            onClick={() => handleInputValue("D")}
          />
        </div>
        <div className={styles.directionals_column}>
          <Image
            className={styles.directional_btn}
            src="/inputs/UF.svg"
            width={40}
            height={40}
            onClick={() => handleInputValue("UF")}
          />
          <Image
            className={styles.directional_btn}
            src="/inputs/F.svg"
            width={42}
            height={42}
            onClick={() => handleInputValue("F")}
          />
          <Image
            className={styles.directional_btn}
            src="/inputs/DF.svg"
            width={40}
            height={40}
            onClick={() => handleInputValue("DF")}
          />
        </div>
      </div>

      <div className={styles.directionals_acronyms_container}>
        <div className={styles.directionals_aconyms_row}>
          <button
            type="button"
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={() => handleInputValue("QCF")}
          >
            QCF
          </button>
          <button
            type="button"
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={() => handleInputValue("QCB")}
          >
            QCB
          </button>
        </div>
        <div className={styles.directionals_aconyms_row}>
          <button
            type="button"
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={() => handleInputValue("HCF")}
          >
            HCF
          </button>
          <button
            type="button"
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={() => handleInputValue("HCB")}
          >
            HCB
          </button>
        </div>
      </div>
      <div className={styles.directionals_aconyms_row}>
        <button
          type="button"
          className={styles[`${theme}dp_acronym_btn`]}
          onClick={() => handleInputValue("DP")}
        >
          DP
        </button>
      </div>
    </div>
  );
};
export default DirectionalInputs;

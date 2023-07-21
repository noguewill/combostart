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
            width={42}
            height={42}
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
            width={42}
            height={42}
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
            width={42}
            height={42}
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
            width={42}
            height={42}
            onClick={() => handleInputValue("DF")}
          />
        </div>
      </div>

      <div className={styles.directionals_acronyms_container}>
        <div className={styles.directionals_aconyms_row}>
          <button
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={() => handleInputValue("QCF")}
          >
            QCF
          </button>
          <button
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={() => handleInputValue("QCB")}
          >
            QCB
          </button>
        </div>
        <div className={styles.directionals_aconyms_row}>
          <button
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={() => handleInputValue("HCF")}
          >
            HCF
          </button>
          <button
            className={styles[`${theme}directional_acronym_btn`]}
            onClick={() => handleInputValue("HCB")}
          >
            HCB
          </button>
        </div>
      </div>
    </div>
  );
};
export default DirectionalInputs;

import React, { useState } from "react";
import styles from "@/styles/NewPost_inputs_styles/ComboString_styles/ComboStringSelectiveInput.module.css";
import Image from "next/image";
import DirectionalInputs from "./DirectionalInputs";

const ComboStringSelectiveInput = ({ theme }) => {
  return (
    <div className={styles[`${theme}container`]}>
      <div className={styles.header_container}>
        <button className={styles[`${theme}help_btn`]}>?</button>
        <h2 className={styles.header}>
          Click inputs to start building your combo
        </h2>
      </div>
      <main className={styles[`${theme}comboBtns_container`]}>
        <DirectionalInputs theme={theme} />
        <button className={styles.addInput_btn}>+</button>

        <div className={styles.buttonInputs_row_container}>
          <div className={styles.buttonInputs_row}>
            <div className={styles.buttonInput_container}>
              <Image
                src="/inputs/punchA.svg"
                width={32}
                height={32}
                className={styles.buttonInput}
              />
              <span>Punch</span>
            </div>
            <div className={styles.buttonInput_container}>
              <Image
                src="/inputs/punchA.svg"
                width={32}
                height={32}
                className={styles.buttonInput}
              />
              <span>Punch</span>
            </div>
            <div className={styles.buttonInput_container}>
              <Image
                src="/inputs/punchA.svg"
                width={32}
                height={32}
                className={styles.buttonInput}
              />
              <span>Punch</span>
            </div>
            <div className={styles.buttonInput_container}>
              <Image
                src="/inputs/punchA.svg"
                width={32}
                height={32}
                className={styles.buttonInput}
              />
              <span>Punch</span>
            </div>
            <div className={styles.buttonInput_container}>
              <Image
                src="/inputs/punchA.svg"
                width={32}
                height={32}
                className={styles.buttonInput}
              />
              <span>Punch</span>
            </div>
          </div>
          <div className={styles.buttonInputs_row}>
            <div className={styles.buttonInput_container}>
              <Image
                src="/inputs/punchA.svg"
                width={32}
                height={32}
                className={styles.buttonInput}
              />
              <span>Punch</span>
            </div>
            <div className={styles.buttonInput_container}>
              <Image
                src="/inputs/punchA.svg"
                width={32}
                height={32}
                className={styles.buttonInput}
              />
              <span>Punch</span>
            </div>
            <div className={styles.buttonInput_container}>
              <Image
                src="/inputs/punchA.svg"
                width={32}
                height={32}
                className={styles.buttonInput}
              />
              <span>Punch</span>
            </div>
            <div className={styles.buttonInput_container}>
              <Image
                src="/inputs/punchA.svg"
                width={32}
                height={32}
                className={styles.buttonInput}
              />
              <span>Punch</span>
            </div>
            <div className={styles.buttonInput_container}>
              <Image
                src="/inputs/punchA.svg"
                width={32}
                height={32}
                className={styles.buttonInput}
              />
              <span>Punch</span>
            </div>
          </div>
        </div>

        <div className={styles.mechanicsColumn_container}>
          <div className={styles.buttonInput_container}>
            <Image
              src="/inputs/punchA.svg"
              width={32}
              height={32}
              className={styles.buttonInput}
            />
            <span>Punch</span>
          </div>
          <div className={styles.buttonInput_container}>
            <Image
              src="/inputs/punchA.svg"
              width={32}
              height={32}
              className={styles.buttonInput}
            />
            <span>Punch</span>
          </div>
          <div className={styles.buttonInput_container}>
            <Image
              src="/inputs/punchA.svg"
              width={32}
              height={32}
              className={styles.buttonInput}
            />
            <span>Punch</span>
          </div>
        </div>
      </main>
      <button className={styles.addString_btn}>ADD STRING</button>
      <div className={styles.comboStrings_container}>{/* Mappping of the inputs that user clicked */}</div>
      <button className={styles.saveStrings_btn}>SAVE COMBO STRINGS</button>
    </div>
  );
};

export default ComboStringSelectiveInput;

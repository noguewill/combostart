import React from "react";
import styles from "@/styles/NewPost_inputs_styles/ComboString_styles/ComboStringSelectiveInput.module.css";
import Image from "next/image";

const SavedComboStrings = ({ comboStrings, setIsComboSaved }) => {
  return (
    <div className={styles.savedComboStrings_container}>
      <h2>COMBO STRINGS</h2>
      <div className={styles.comboStrings_container}>
        {comboStrings.map((subArray, outerIndex) => (
          <div key={outerIndex} className={styles.comboString_wrapper}>
            <div className={styles.string_item}>
              {subArray.map((item, innerIndex) => (
                <div key={innerIndex} className={styles.comboString}>
                  {item.type === "text" ? (
                    item.value
                  ) : (
                    <div
                      key={innerIndex}
                      className={styles.comboString_string_container}
                    >
                      <Image
                        src={`/inputs/${item.value}.svg`}
                        width={32}
                        height={32}
                        alt={item.value}
                      />
                      <span className={styles.comboString_text}>
                        {item.value}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.btn_container}>
        <button
          className={styles.edit_btn}
          onClick={() => setIsComboSaved(false)}
        >
          EDIT
        </button>
        <button className={styles.reset_btn}>RESET</button>
      </div>
    </div>
  );
};
export default SavedComboStrings;

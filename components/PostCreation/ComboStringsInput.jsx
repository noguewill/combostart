import React, { useState } from "react";
import styles from "@/styles/NewPost_inputs_styles/ComboStrings.module.css";
import { profanityCheck } from "components/ProfanityFilter";

const ComboStringsInput = ({
  theme,
  comboStrings,
  setComboStrings,
  removeString,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (comboStrings.includes(inputValue) || profanityCheck(inputValue)) {
        setInputValue("");
        return;
      }

      setComboStrings((prevStrings) => [...prevStrings, inputValue]);
      setInputValue("");
    }
  };

  const handleStringRemove = (string) => {
    setComboStrings((prevStrings) => prevStrings.filter((s) => s !== string));
    removeString(string);
  };

  return (
    <div className={styles[`${theme}stringsOptions_container`]}>
      <div className={styles.stringsOptions_comboStrings_wrapper}>
        <span>Combo strings</span>
        <div className={styles.stringInput_container}>
          {comboStrings.map((string) => (
            <span
              key={string}
              className={styles.stringItem}
              onClick={() => handleStringRemove(string)}
            >
              {string} &times;
            </span>
          ))}
          <input
            className={styles[`${theme}stringsOptions_comboStrings`]}
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="QCF + HK"
          />
        </div>
      </div>
    </div>
  );
};

export default ComboStringsInput;

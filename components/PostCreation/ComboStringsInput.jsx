import React, { useState } from "react";
import styles from "@/styles/NewPost_inputs_styles/ComboStrings.module.css";

const ComboStringsInput = ({
  theme,
  comboStrings,
  setComboStrings,
  removeString,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      let newString = inputValue.toUpperCase();

      const regexMappings = [
        [/DRAGON PUNCH/g, "DP"],
        [/LIGHT PUNCH/g, "LP"],
        [/MEDIUM PUNCH/g, "MP"],
        [/HEAVY PUNCH/g, "HP"],
        [/LIGHT KICK/g, "LK"],
        [/MEDIUM KICK/g, "MK"],
        [/HEAVY KICK/g, "HK"],
        [/(^|\s)DOWN(?:WARD|WARDS)?(?=\s|$)/gi, "$1D"],
        [/(^|\s)UP(?:WARD|WARDS)?(?=\s|$)/gi, "$1U"],
        [/LEFT/g, "B"],
        [/RIGHT/g, "F"],
        [/CROUCH(?:ING)?/g, "C"],
        [/STAND(?:ING)?/g, "S"],
        [/FORWARD/g, "F"],
        [/BACK(?:WARD)?/g, "B"],
        [/JUMP(?:ING)?/g, "J"],
        [/PUNCH(?:ES)?/g, "P"],
        [/KICK(?:S)?/g, "K"],
        [/OD P/g, "ODP"],
        [/OD K/g, "ODK"],
        [/CH/g, "CH"],
        [/DR/g, "DR"],
        [/DI/g, "DI"],
        [/PC/g, "PC"],
        [/COUNTER HIT/g, "CH"],
        [/PUNISH COUNTER/g, "PC"],
        [/DRIVE IMPACT/g, "DI"],
        [/DRIVE RUSH/g, "DR"],
        [/PARRY DRIVE RUSH/g, "PDR"],
        [/CANCEL DRIVE RUSH/g, "CDR"],
        [/PARRY INTO DRIVE RUSH/g, "PDR"],
        [/CANCEL INTO DRIVE RUSH/g, "CDR"],
        [/SUPER1/g, "LVL1"],
        [/SUPER2/g, "LVL2"],
        [/SUPER3/g, "LVL3"],
        [/SA1/g, "LV1"],
        [/SA2/g, "LVL2"],
        [/SA3/g, "LVL3"],
      ];

      regexMappings.forEach(([regex, replacement]) => {
        newString = newString.replace(regex, replacement);
      });

      const validComboStringPattern =
        /^(QCF|QCB|HCB|HCF|LP|MP|HP|LK|MK|HK|LEVEL 1|LVL1|LEVEL 2|LVL2|LEVEL 3|LVL3|UP|UPWARD|U|DOWN|DOWNWARD|D|DOWN BACKWARDS|DB|FORWARD|F|B|BACK|LEFT|C|DP|XX|CANCEL|HOLD|1|2|3|4|J|JUMP|P|K|PP|KK|OD P|OD K|CH|DR|DI|PC|COUNTER HIT|PUNISH COUNTER|DRIVE IMPACT|DRIVE RUSH|PARRY DRIVE RUSH|CANCEL DRIVE RUSH|PARRY INTO DRIVE RUSH|CANCEL INTO DRIVE RUSH|SUPER1|SUPER2|SUPER3|SA1|SA2|SA3|\.|,|\+)*$/i;

      if (validComboStringPattern.test(newString)) {
        setComboStrings((prevStrings) => [...prevStrings, newString]);
      }

      setInputValue("");
    }
  };

  const handleStringRemove = (index) => {
    setComboStrings((prevStrings) => prevStrings.filter((_, i) => i !== index));
    removeString(index);
  };

  return (
    <div className={styles[`${theme}stringsOptions_container`]}>
      <div className={styles.stringsOptions_comboStrings_wrapper}>
        <span>Combo strings</span>
        <div className={styles.stringInput_container}>
          {comboStrings.map((string, index) => (
            <span
              key={index}
              className={styles.stringItem}
              onClick={() => handleStringRemove(index)}
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
            placeholder="QCB + HK"
            maxLength={15}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ComboStringsInput;

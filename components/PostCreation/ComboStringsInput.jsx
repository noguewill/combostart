import React, { useState } from "react";
import styles from "@/styles/NewPost_inputs_styles/ComboStrings.module.css";
import { profanityCheck } from "../ProfanityFilter";

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

      const notationMappings = {
        "DRAGON PUNCH": "DP",
        "LIGHT PUNCH": "LP",
        "MEDIUM PUNCH": "MP",
        "HEAVY PUNCH": "HP",
        "LIGHT KICK": "LK",
        "MEDIUM KICK": "MK",
        "HEAVY KICK": "HK",
        DOWN: "D",
        DOWNWARD: "D",
        "DOWN BACKWARDS": "DB",
        UP: "U",
        UPWARD: "U",
        LEFT: "B",
        RIGHT: "F",
        CROUCH: "C",
        CROUCHING: "C",
        STAND: "S",
        STANDING: "S",
      };

      newString = newString.replace(
        /(DRAGON PUNCH|LIGHT PUNCH|MEDIUM PUNCH|HEAVY PUNCH|LIGHT KICK|MEDIUM KICK|HEAVY KICK|DOWN|DOWNWARD|DOWN BACKWARDS|UP|UPWARD|LEFT|RIGHT|CROUCH|CROUCHING|STAND|STANDING)|\+/g,
        (match) => notationMappings[match] || match
      );

      const validComboStringPattern =
        /^(QCF|QCB|HCB|HCF|LP|MP|HP|LK|MK|HK|LEVEL 1|LVL1|LEVEL 2|LVL2|LEVEL 3|LVL3|UP|UPWARD|U|DOWN|DOWNWARD|D|DOWN BACKWARDS|DB|FORWARD|F|B|BACK|LEFT|C|DP|XX|CANCEL|HOLD|1|2|3|4|J|JUMP|P|K|PP|KK|OD P|OD K|CH|DR|DI|PC|\/|\\|OR|COUNTER HIT|PUNISH COUNTER|DRIVE IMPACT|DRIVE RUSH|PARRY DRIVE RUSH|CANCEL DRIVE RUSH|PARRY INTO DRIVE RUSH|CANCEL INTO DRIVE RUSH|SUPER1|SUPER2|SUPER3|SA1|SA2|SA3|OD VERSION|OVERDRIVE VERSION|OVERDRIVE|ANY|\.\.\.|,|\+)*$/i;

      if (
        validComboStringPattern.test(newString) &&
        !profanityCheck(newString)
      ) {
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
          />
        </div>
      </div>
    </div>
  );
};

export default ComboStringsInput;

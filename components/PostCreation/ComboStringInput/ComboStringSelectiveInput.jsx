import React, { useState, useEffect, useCallback } from "react";
import styles from "@/styles/NewPost_inputs_styles/ComboString_styles/ComboStringSelectiveInput.module.css";
import Image from "next/image";
import DirectionalInputs from "./DirectionalInputs";

const ComboStringSelectiveInput = ({ theme }) => {
  const [inputValue, setInputValue] = useState([]);
  const [comboString, setComboString] = useState([]);
  const [isPlusOnly, setIsPlusOnly] = useState(false);

  const handleInputValue = (val) => {
    if (val === "+") {
      if (inputValue.length === 0) {
        setIsPlusOnly(true); // "+" is added alone, disable "ADD STRING" button
      } else {
        setIsPlusOnly(false); // Reset the isPlusOnly state when a non-"+" value is added
        setInputValue((prevInputValue) => [
          ...prevInputValue,
          { type: "text", value: val },
        ]);
      }
    } else {
      setIsPlusOnly(false); // Reset the isPlusOnly state when a non-"+" value is added
      setInputValue((prevInputValue) => [
        ...prevInputValue,
        { type: "image", value: val },
      ]);
    }
    // Prevent form submission
    event.preventDefault();
  };

  const handleAddString = useCallback(() => {
    const isPlusOnlyValue =
      inputValue.length === 1 && inputValue[0].value === "+";

    if (inputValue.length > 0 && !isPlusOnlyValue) {
      const newComboString = inputValue.map((item) => item.value).join(", ");
      setComboString((prevComboString) => [...prevComboString, inputValue]);
      setInputValue([]);
    }
    // Prevent form submission
    event.preventDefault();
  }, [inputValue]);

  const handleRemoveComboString = (index) => {
    setComboString((prevComboString) => {
      const updatedComboString = [...prevComboString];
      updatedComboString.splice(index, 1);
      return updatedComboString;
    });
    // Prevent form submission
    event.preventDefault();
  };

  useEffect(() => {
    // Check if the inputValue contains only the "+" sign
    const isPlusOnlyValue =
      inputValue.length === 1 && inputValue[0].value === "+";
    setIsPlusOnly(isPlusOnlyValue);
  }, [inputValue]);

  const handleRemoveInputValue = (index) => {
    setInputValue((prevInputValue) => {
      const updatedInputValue = [...prevInputValue];
      updatedInputValue.splice(index, 1);
      return updatedInputValue;
    });

    event.preventDefault();
  };

  const handleResetStrings = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all combo strings?"
    );
    if (confirmReset) {
      setInputValue([]);
      setComboString([]);
    }
    // Prevent form submission
    event.preventDefault();
  };

  return (
    <div className={styles[`${theme}container`]}>
      <div className={styles.header_container}>
        <button className={styles[`${theme}help_btn`]}>?</button>
        <h2 className={styles.header}>
          Click inputs to start building your combo
        </h2>
      </div>
      <main className={styles[`${theme}comboBtns_container`]}>
        <DirectionalInputs theme={theme} handleInputValue={handleInputValue} />

        <button
          className={styles.addInput_btn}
          onClick={() => handleInputValue("+")}
        >
          +
        </button>

        <div className={styles.buttonInputs_row_container}>
          <div className={styles.buttonInputs_row}>
            <div className={styles.buttonInput_container}>
              <button
                className={styles.buttonInput}
                onClick={() => handleInputValue("P")}
              >
                <Image
                  src="/inputs/P.svg"
                  width={32}
                  height={32}
                  alt="Any punch"
                />
              </button>
              <span className={styles.buttonInput_text}>ANY PUNCH</span>
            </div>
            <div className={styles.buttonInput_container}>
              <button
                className={styles.buttonInput}
                onClick={() => handleInputValue("LP")}
              >
                <Image
                  src="/inputs/LP.svg"
                  width={32}
                  height={32}
                  alt="Light Punch"
                />
              </button>
              <span className={styles.buttonInput_text}>LIGHT PUNCH</span>
            </div>
            <div className={styles.buttonInput_container}>
              <button
                className={styles.buttonInput}
                onClick={() => handleInputValue("MP")}
              >
                <Image
                  src="/inputs/MP.svg"
                  width={32}
                  height={32}
                  alt="Medium Punch"
                />
              </button>
              <span className={styles.buttonInput_text}>MEDIUM PUNCH</span>
            </div>
            <div className={styles.buttonInput_container}>
              <button
                className={styles.buttonInput}
                onClick={() => handleInputValue("HP")}
              >
                <Image
                  src="/inputs/HP.svg"
                  width={32}
                  height={32}
                  alt="Heavy Punch"
                />
              </button>
              <span className={styles.buttonInput_text}>HEAVY PUNCH</span>
            </div>
            <div className={styles.buttonInput_container}>
              <button
                className={styles.buttonInput}
                onClick={() => handleInputValue("oPunch")}
              >
                <Image
                  src="/inputs/Punch.svg"
                  width={32}
                  height={32}
                  alt="Overdrive Punch"
                />
              </button>
              <span className={styles.buttonInput_text}>OVERDRIVE PUNCH</span>
            </div>
          </div>
          <div className={styles.buttonInputs_row}>
            <div className={styles.buttonInput_container}>
              <button
                className={styles.buttonInput}
                onClick={() => handleInputValue("K")}
              >
                <Image
                  src="/inputs/K.svg"
                  width={32}
                  height={32}
                  alt="Any kick"
                />
              </button>
              <span className={styles.buttonInput_text}>ANY KICK</span>
            </div>
            <div className={styles.buttonInput_container}>
              <button
                className={styles.buttonInput}
                onClick={() => handleInputValue("LK")}
              >
                <Image
                  src="/inputs/LK.svg"
                  width={32}
                  height={32}
                  alt="Light Kick"
                />
              </button>
              <span className={styles.buttonInput_text}>LIGHT KICK</span>
            </div>
            <div className={styles.buttonInput_container}>
              <button
                className={styles.buttonInput}
                onClick={() => handleInputValue("MK")}
              >
                <Image
                  src="/inputs/MK.svg"
                  width={32}
                  height={32}
                  alt="Medium Kick"
                />
              </button>
              <span className={styles.buttonInput_text}>MEDIUM KICK</span>
            </div>
            <div className={styles.buttonInput_container}>
              <button
                className={styles.buttonInput}
                onClick={() => handleInputValue("HK")}
              >
                <Image
                  src="/inputs/HK.svg"
                  width={32}
                  height={32}
                  alt="Heavy Kick"
                />
              </button>
              <span className={styles.buttonInput_text}>HEAVY KICK</span>
            </div>
            <div className={styles.buttonInput_container}>
              <button
                className={styles.buttonInput}
                onClick={() => handleInputValue("okick")}
              >
                <Image
                  src="/inputs/Kick.svg"
                  width={32}
                  height={32}
                  alt="Overdrive Kick"
                />
              </button>
              <span className={styles.buttonInput_text}>OVERDRIVE KICK</span>
            </div>
          </div>
        </div>

        <div className={styles.mechanicsColumn_container}>
          <div className={styles.buttonInput_container}>
            <button
              className={styles.buttonInput}
              onClick={() => handleInputValue("cancel")}
            >
              <Image src="/inputs/P.svg" width={32} height={32} alt="cancel" />
            </button>
            <span className={styles.buttonInput_text}>CANCEL ( xx )</span>
          </div>
          <div className={styles.buttonInput_container}>
            <Image
              src="/inputs/PC.svg"
              width={32}
              height={32}
              className={styles.buttonInput}
              alt="Yeah"
            />
            <span>Punch</span>
          </div>
          <div className={styles.buttonInput_container}>
            <Image
              src="/inputs/DR.svg"
              width={32}
              height={32}
              className={styles.buttonInput}
              alt="Yeah"
            />
            <span>Punch</span>
          </div>
        </div>
      </main>
      <div className={styles.stringHandleBtn_container}>
        {!isPlusOnly && inputValue.length > 0 && (
          <button
            className={styles.addString_btn}
            onClick={(e) => {
              e.preventDefault();
              handleAddString();
            }}
          >
            ADD STRING
          </button>
        )}

        {comboString.length > 0 && (
          <button
            className={styles.resetStrings_btn}
            onClick={(e) => {
              e.preventDefault();
              handleResetStrings();
            }}
          >
            RESET STRINGS
          </button>
        )}
      </div>
      {(inputValue.length > 0 || comboString.length > 0) && (
        <div className={styles.comboStrings_container}>
          {comboString.map((subArray, outerIndex) => (
            <div key={outerIndex} className={styles.comboString_wrapper}>
              <input
                className={styles.comboString_input}
                type="text"
                placeholder="FULLY CHARGED"
              />
              <div
                key={outerIndex}
                className={styles.comboStringRow}
                onClick={() => handleRemoveComboString(outerIndex)}
              >
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

          {inputValue.map((item, index) => (
            <div key={index} className={styles.comboString}>
              {item.type === "text" ? (
                <div className={styles.comboString_string_container}>
                  <span>{item.value}</span>
                  <button
                    className={styles.removeInput_btn}
                    onClick={() => handleRemoveInputValue(index)}
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <div
                  key={index}
                  className={styles.comboString_string_container}
                >
                  <Image
                    src={`/inputs/${item.value}.svg`}
                    width={32}
                    height={32}
                    alt={item.value}
                  />
                  <button
                    className={styles.removeInput_btn}
                    onClick={() => handleRemoveInputValue(index)}
                  >
                    REMOVE
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {(inputValue.length > 0 || comboString.length > 0) && (
        <button className={styles.saveStrings_btn}>SAVE COMBO STRINGS</button>
      )}
    </div>
  );
};

export default ComboStringSelectiveInput;

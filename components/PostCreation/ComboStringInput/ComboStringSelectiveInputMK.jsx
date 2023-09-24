import React, { useState, useEffect, useCallback } from "react";
import styles from "@/styles/NewCombo_inputs_styles/ComboString_styles/ComboStringSelectiveInput.module.css";
import Image from "next/image";
import DirectionalInputs from "./DirectionalInputs";
import SavedComboStrings from "./SavedComboStrings";

const ComboStringSelectiveInputMK = ({
  theme,
  comboStrings,
  setComboStrings,
}) => {
  const [inputValue, setInputValue] = useState([]);
  const [isPlusOnly, setIsPlusOnly] = useState(false);
  const [isComboValid, setIsComboValid] = useState(false);
  const [isComboSaved, setIsComboSaved] = useState(false);

  useEffect(() => {
    // Check if the inputValue contains only the "+" sign
    const isPlusOnlyValue =
      inputValue.length === 1 && inputValue[0].value === "+";
    setIsPlusOnly(isPlusOnlyValue);

    setIsComboValid(comboStrings.length >= 3); // check if comboString length is greater than or equal to 3
  }, [inputValue, comboStrings]);

  const handleInputValue = (val, desc) => {
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
        { type: "image", value: val, alt: desc },
      ]);
    }
  };

  const handleAddString = useCallback(() => {
    const isPlusOnlyValue =
      inputValue.length === 1 && inputValue[0].value === "+";

    if (inputValue.length > 0 && !isPlusOnlyValue) {
      const newComboString = inputValue.reduce((acc, item) => {
        acc.push({ type: item.type, value: item.value, alt: item.alt });
        return acc;
      }, []);
      setComboStrings((prevComboStrings) => [
        ...prevComboStrings,
        newComboString,
      ]);
      setInputValue([]);
    }
  }, [inputValue]);

  // Modify handleRemoveComboString function to remove the object from comboStrings
  const handleRemoveComboString = (index) => {
    setComboStrings((prevComboStrings) => {
      const updatedComboStrings = [...prevComboStrings];
      updatedComboStrings.splice(index, 1);
      return updatedComboStrings;
    });
  };

  const handleRemoveInputValue = (index) => {
    setInputValue((prevInputValue) => {
      const updatedInputValue = [...prevInputValue];
      updatedInputValue.splice(index, 1);
      return updatedInputValue;
    });
  };

  const handleResetStrings = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all combo strings?"
    );
    if (confirmReset) {
      setInputValue([]);
      setComboStrings([]);
    }
  };

  return (
    <div className={styles[`${theme}container`]}>
      {!isComboSaved ? (
        <>
          <div className={styles.headerMK_container}>
            <h2 className={styles.header}>
              Click the inputs below to start building your combo
            </h2>
          </div>
          <main className={styles[`${theme}comboBtns_container`]}>
            <DirectionalInputs
              theme={theme}
              handleInputValue={handleInputValue}
            />

            <button
              type="button"
              className={styles.addInput_btn}
              onClick={() => handleInputValue("+", "+")}
            >
              +
            </button>

            <div className={styles.buttonInputs_row_container}>
              <div className={styles.buttonInputs_row}>
                <div className={styles.buttonInput_container}>
                  <button
                    type="button"
                    className={styles.buttonInput}
                    onClick={() => handleInputValue("square", "1")}
                  >
                    <Image
                      src="/inputs/square.svg"
                      width={32}
                      height={32}
                      alt="square"
                    />
                  </button>
                  <span className={styles[`${theme}buttonInput_text`]}>1</span>
                </div>

                <div className={styles.buttonInput_container}>
                  <button
                    type="button"
                    className={styles.buttonInput}
                    onClick={() => handleInputValue("triangle", "2")}
                  >
                    <Image
                      src="/inputs/triangle.svg"
                      width={32}
                      height={32}
                      alt="triangle"
                    />
                  </button>
                  <span className={styles[`${theme}buttonInput_text`]}>2</span>
                </div>
                <div className={styles.buttonInput_container}>
                  <button
                    type="button"
                    className={styles.buttonInput}
                    onClick={() => handleInputValue("cross", "3")}
                  >
                    <Image
                      src="/inputs/cross.svg"
                      width={32}
                      height={32}
                      alt="cross"
                    />
                  </button>
                  <span className={styles[`${theme}buttonInput_text`]}>3</span>
                </div>
                <div className={styles.buttonInput_container}>
                  <button
                    type="button"
                    className={styles.buttonInput}
                    onClick={() => handleInputValue("circle", "4")}
                  >
                    <Image
                      src="/inputs/circle.svg"
                      width={32}
                      height={32}
                      alt="circle"
                    />
                  </button>
                  <span className={styles[`${theme}buttonInput_text`]}>4</span>
                </div>

                <div className={styles.buttonInput_container}>
                  <button
                    type="button"
                    className={styles.buttonInput}
                    onClick={() => handleInputValue("EX", "Enhanced Move")}
                  >
                    <Image
                      src="/inputs/EX.svg"
                      width={32}
                      height={32}
                      alt="Enhanced Move"
                    />
                  </button>
                  <span className={styles[`${theme}buttonInput_text`]}>
                    ENHANCED MOVE
                  </span>
                </div>
              </div>
              <div className={styles.buttonInputs_row}>
                <div className={styles.buttonInput_container}>
                  <button
                    type="button"
                    className={styles.buttonInput}
                    onClick={() => handleInputValue("L1", "L1")}
                  >
                    <Image
                      src="/inputs/L1.svg"
                      width={32}
                      height={32}
                      alt="L1"
                    />
                  </button>
                  <span className={styles[`${theme}buttonInput_text`]}>L1</span>
                </div>
                <div className={styles.buttonInput_container}>
                  <button
                    type="button"
                    className={styles.buttonInput}
                    onClick={() => handleInputValue("hold", "hold")}
                  >
                    <Image
                      src="/inputs/hold.svg"
                      width={32}
                      height={32}
                      alt="R1 HOLD"
                    />
                  </button>
                  <span className={styles[`${theme}buttonInput_text`]}>
                    R1 hold
                  </span>
                </div>
                <div className={styles.buttonInput_container}>
                  <button
                    type="button"
                    className={styles.buttonInput}
                    onClick={() => handleInputValue("R1", "R1")}
                  >
                    <Image
                      src="/inputs/R1.svg"
                      width={32}
                      height={32}
                      alt="R1"
                    />
                  </button>
                  <span className={styles[`${theme}buttonInput_text`]}>R1</span>
                </div>
                <div className={styles.buttonInput_container}>
                  <button
                    type="button"
                    className={styles.buttonInput}
                    onClick={() => handleInputValue("THROW", "THROW")}
                  >
                    <Image
                      src="/inputs/throw.svg"
                      width={32}
                      height={32}
                      alt="THROW"
                    />
                  </button>
                  <span className={styles[`${theme}buttonInput_text`]}>
                    THROW
                  </span>
                </div>
                <div className={styles.buttonInput_container}>
                  <button
                    type="button"
                    className={styles.buttonInput}
                    onClick={() => handleInputValue("cancel", "cancel(xx)")}
                  >
                    <Image
                      src="/inputs/cancel.svg"
                      width={42}
                      height={42}
                      alt="cancel"
                    />
                  </button>
                  <span className={styles[`${theme}buttonInput_text`]}>
                    CANCEL xx
                  </span>
                </div>
              </div>
            </div>
          </main>
          <div className={styles.stringHandleBtn_container}>
            {!isPlusOnly && inputValue.length > 0 && (
              <button
                type="button"
                className={styles.addString_btn}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddString();
                }}
              >
                ADD STRING
              </button>
            )}

            {comboStrings.length > 0 && (
              <button
                type="button"
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
          {(inputValue.length > 0 || comboStrings.length > 0) && (
            <div className={styles[`${theme}comboStrings_container`]}>
              {comboStrings.map((comboString, outerIndex) => (
                <div key={outerIndex} className={styles.comboString_wrapper}>
                  <div
                    key={outerIndex}
                    className={styles.comboStringRow}
                    onClick={() => handleRemoveComboString(outerIndex)}
                  >
                    {Object.entries(comboString).map(
                      ([itemKey, itemValue], innerIndex) => (
                        <div key={innerIndex} className={styles.comboString}>
                          {itemValue.type === "text" ? (
                            itemValue.value
                          ) : (
                            <div
                              key={innerIndex}
                              className={styles.comboString_string_container}
                            >
                              <Image
                                src={`/inputs/${itemValue.value}.svg`}
                                width={32}
                                height={32}
                                alt={itemValue.value}
                              />
                              <span className={styles.comboString_text}>
                                {itemValue.value}
                              </span>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}

              {inputValue.map((item, index) => (
                <div key={index} className={styles.comboString}>
                  {item.type === "text" ? (
                    <div className={styles.comboString_string_container}>
                      <span>{item.value}</span>
                      <button
                        type="button"
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
                        type="button"
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

          {(inputValue.length > 0 || comboStrings.length > 0) && (
            <button
              type="button"
              className={styles.saveStrings_btn}
              disabled={!isComboValid}
              onClick={() => setIsComboSaved(true)}
            >
              SAVE COMBO STRINGS
            </button>
          )}
        </>
      ) : (
        <SavedComboStrings
          comboStrings={comboStrings}
          setIsComboSaved={setIsComboSaved}
          setComboStrings={setComboStrings}
          setInputValue={setInputValue}
          setInitialState={setInitialState}
        />
      )}
    </div>
  );
};

export default ComboStringSelectiveInputMK;

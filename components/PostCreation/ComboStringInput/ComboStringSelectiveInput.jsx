import React, { useState, useEffect, useCallback } from "react";
import styles from "@/styles/NewPost_inputs_styles/ComboString_styles/ComboStringSelectiveInput.module.css";
import Image from "next/image";
import DirectionalInputs from "./DirectionalInputs";
import SavedComboStrings from "./SavedComboStrings";

const ComboStringSelectiveInput = ({
  theme,
  comboStrings,
  setComboStrings,
  handleInitialState,
  initialState,
  setInitialState,
}) => {
  const [inputValue, setInputValue] = useState([]);
  const [isPlusOnly, setIsPlusOnly] = useState(false);
  const [askInitialState, setAskInitialState] = useState(true);
  const [isComboValid, setIsComboValid] = useState(false);
  const [isComboSaved, setIsComboSaved] = useState(false);

  useEffect(() => {
    initialState !== "" ? setAskInitialState(false) : setAskInitialState(true);

    // Check if the inputValue contains only the "+" sign
    const isPlusOnlyValue =
      inputValue.length === 1 && inputValue[0].value === "+";
    setIsPlusOnly(isPlusOnlyValue);
    console.log(inputValue);
    setIsComboValid(comboStrings.length >= 3); // check if comboString length is greater than or equal to 3
  }, [inputValue, initialState, comboStrings]);

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
      console.log("ComboStrings:", comboStrings);
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
          {askInitialState ? (
            <div className={styles[`${theme}initialState_container`]}>
              <h2 className={styles.inititialState_header}>
                What is the initial state the combo needs to start at?
              </h2>
              <div className={styles[`${theme}initialState_btn_wrapper`]}>
                <button
                  type="button"
                  className={styles.inititialState_btn}
                  onClick={() => handleInitialState("NONE")}
                >
                  <span className={styles.inititialState_btn_text}>NONE</span>
                </button>
                {/* COUNTER HIT */}
                <button
                  type="button"
                  className={styles.inititialState_btn}
                  onClick={() => handleInitialState("CH")}
                >
                  <Image
                    src="/inputs/CH.svg"
                    width={36}
                    height={36}
                    alt="initial state image"
                  />
                  <span className={styles.inititialState_btn_text}>
                    COUNTER HIT
                  </span>
                </button>
                {/* PUNISH COUNTER */}
                <button
                  type="button"
                  className={styles.inititialState_btn}
                  onClick={() => handleInitialState("PC")}
                >
                  <Image
                    src="/inputs/PC.svg"
                    width={36}
                    height={36}
                    alt="initial state image"
                  />
                  <span className={styles.inititialState_btn_text}>
                    PUNISH COUNTER
                  </span>
                </button>
                {/* DRIVE IMPACT */}
                <button
                  type="button"
                  className={styles.inititialState_btn}
                  onClick={() => handleInitialState("DI")}
                >
                  <Image
                    src="/inputs/DI.svg"
                    width={26}
                    height={26}
                    alt="initial state image"
                  />
                  <span className={styles.inititialState_btn_text}>
                    DRIVE IMPACT
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.header_container}>
                <h2 className={styles.header}>
                  <button
                    type="button"
                    className={styles.back_btn}
                    onClick={() => setAskInitialState(true)}
                  >
                    BACK
                  </button>
                </h2>
                <h2 className={styles.header}>
                  <button type="button" className={styles[`${theme}help_btn`]}>
                    ?
                  </button>
                  Click the inputs below to start building your combo
                </h2>
                <h2 className={styles.initialState_header}>
                  Initial state:
                  <Image
                    style={{ marginLeft: "0.5rem" }}
                    src={`/inputs/${initialState}.svg`}
                    width={26}
                    height={26}
                    alt="Initial state necessary to start combo"
                  />
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
                        onClick={() => handleInputValue("P", "Any punch")}
                      >
                        <Image
                          src="/inputs/P.svg"
                          width={32}
                          height={32}
                          alt="Any punch"
                        />
                      </button>
                      <span className={styles[`${theme}buttonInput_text`]}>
                        ANY PUNCH
                      </span>
                    </div>
                    <div className={styles.buttonInput_container}>
                      <button
                        type="button"
                        className={styles.buttonInput}
                        onClick={() => handleInputValue("LP", "Light Punch")}
                      >
                        <Image
                          src="/inputs/LP.svg"
                          width={32}
                          height={32}
                          alt="Light Punch"
                        />
                      </button>
                      <span className={styles[`${theme}buttonInput_text`]}>
                        LIGHT PUNCH
                      </span>
                    </div>
                    <div className={styles.buttonInput_container}>
                      <button
                        type="button"
                        className={styles.buttonInput}
                        onClick={() => handleInputValue("MP", "Medium Punch")}
                      >
                        <Image
                          src="/inputs/MP.svg"
                          width={32}
                          height={32}
                          alt="Medium Punch"
                        />
                      </button>
                      <span className={styles[`${theme}buttonInput_text`]}>
                        MEDIUM PUNCH
                      </span>
                    </div>
                    <div className={styles.buttonInput_container}>
                      <button
                        type="button"
                        className={styles.buttonInput}
                        onClick={() => handleInputValue("HP", "Heavy Punch")}
                      >
                        <Image
                          src="/inputs/HP.svg"
                          width={32}
                          height={32}
                          alt="Heavy Punch"
                        />
                      </button>
                      <span className={styles[`${theme}buttonInput_text`]}>
                        HEAVY PUNCH
                      </span>
                    </div>
                    <div className={styles.buttonInput_container}>
                      <button
                        type="button"
                        className={styles.buttonInput}
                        onClick={() =>
                          handleInputValue("PP", "Overdrive Punch")
                        }
                      >
                        <Image
                          src="/inputs/PP.svg"
                          width={32}
                          height={32}
                          alt="Overdrive Punch"
                        />
                      </button>
                      <span className={styles[`${theme}buttonInput_text`]}>
                        OVERDRIVE PUNCH
                      </span>
                    </div>
                  </div>
                  <div className={styles.buttonInputs_row}>
                    <div className={styles.buttonInput_container}>
                      <button
                        type="button"
                        className={styles.buttonInput}
                        onClick={() => handleInputValue("K", "Any kick")}
                      >
                        <Image
                          src="/inputs/K.svg"
                          width={32}
                          height={32}
                          alt="Any kick"
                        />
                      </button>
                      <span className={styles[`${theme}buttonInput_text`]}>
                        ANY KICK
                      </span>
                    </div>
                    <div className={styles.buttonInput_container}>
                      <button
                        type="button"
                        className={styles.buttonInput}
                        onClick={() => handleInputValue("LK", "Light Kick")}
                      >
                        <Image
                          src="/inputs/LK.svg"
                          width={32}
                          height={32}
                          alt="Light Kick"
                        />
                      </button>
                      <span className={styles[`${theme}buttonInput_text`]}>
                        LIGHT KICK
                      </span>
                    </div>
                    <div className={styles.buttonInput_container}>
                      <button
                        type="button"
                        className={styles.buttonInput}
                        onClick={() => handleInputValue("MK", "Medium Kick")}
                      >
                        <Image
                          src="/inputs/MK.svg"
                          width={32}
                          height={32}
                          alt="Medium Kick"
                        />
                      </button>
                      <span className={styles[`${theme}buttonInput_text`]}>
                        MEDIUM KICK
                      </span>
                    </div>
                    <div className={styles.buttonInput_container}>
                      <button
                        type="button"
                        className={styles.buttonInput}
                        onClick={() => handleInputValue("HK", "Heavy Kick")}
                      >
                        <Image
                          src="/inputs/HK.svg"
                          width={32}
                          height={32}
                          alt="Heavy Kick"
                        />
                      </button>
                      <span className={styles[`${theme}buttonInput_text`]}>
                        HEAVY KICK
                      </span>
                    </div>
                    <div className={styles.buttonInput_container}>
                      <button
                        type="button"
                        className={styles.buttonInput}
                        onClick={() => handleInputValue("KK", "Overdrive Kick")}
                      >
                        <Image
                          src="/inputs/KK.svg"
                          width={32}
                          height={32}
                          alt="Overdrive Kick"
                        />
                      </button>
                      <span className={styles[`${theme}buttonInput_text`]}>
                        OVERDRIVE KICK
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.mechanicsColumn_container}>
                  <div className={styles.buttonInput_container}>
                    <button
                      type="button"
                      className={styles.mechanicButtonInput}
                      onClick={() => handleInputValue("cancel", "cancel")}
                    >
                      <Image
                        src="/inputs/cancel.svg"
                        width={50}
                        height={50}
                        alt="Cancel"
                      />
                    </button>
                    <span className={styles[`${theme}mechanicButton_text`]}>
                      CANCEL ( xx )
                    </span>
                  </div>
                  <div className={styles.buttonInput_container}>
                    <button
                      type="button"
                      className={styles.mechanicButtonInput}
                      onClick={() =>
                        handleInputValue("PDR", "PARRY INTO DRIVE RUSH")
                      }
                    >
                      <Image
                        src="/inputs/PDR.svg"
                        width={50}
                        height={50}
                        alt="PARRY INTO DRIVE RUSH"
                      />
                    </button>
                    <span className={styles[`${theme}mechanicButton_text`]}>
                      PARRY INTO DRIVE RUSH
                    </span>
                  </div>
                  <div className={styles.buttonInput_container}>
                    <button
                      type="button"
                      className={styles.mechanicButtonInput}
                      onClick={() => handleInputValue("DR", "Drive Rush")}
                    >
                      <Image
                        src="/inputs/DR.svg"
                        width={42}
                        height={42}
                        alt="Drive Rush"
                      />
                    </button>
                    <span className={styles[`${theme}mechanicButton_text`]}>
                      DRIVE RUSH
                    </span>
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
                    <div
                      key={outerIndex}
                      className={styles.comboString_wrapper}
                    >
                      <input
                        className={styles.comboString_input}
                        type="text"
                        placeholder="FULLY CHARGED"
                        maxLength={15}
                        value={""}
                        onChange={(e) => e.target.value}
                      />
                      <div
                        key={outerIndex}
                        className={styles.comboStringRow}
                        onClick={() => handleRemoveComboString(outerIndex)}
                      >
                        {Object.entries(comboString).map(
                          ([itemKey, itemValue], innerIndex) => (
                            <div
                              key={innerIndex}
                              className={styles.comboString}
                            >
                              {itemValue.type === "text" ? (
                                itemValue.value
                              ) : (
                                <div
                                  key={innerIndex}
                                  className={
                                    styles.comboString_string_container
                                  }
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

export default ComboStringSelectiveInput;

import React, { useState } from "react";
import styles from "@/styles/Dropdown.module.css";

function Dropdown({
  options,
  defaultOption,
  onOptionSelect,
  classStyle,
  menuStyle,
}) {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [showOptions, setShowOptions] = useState(false);

  function handleOptionClick(option) {
    setSelectedOption(option);
    setShowOptions(false);
    onOptionSelect(option);
  }

  return (
    <div className={classStyle}>
      <button onClick={() => setShowOptions(!showOptions)}>
        {selectedOption}
        <span
          className={`dropdown-arrow ${showOptions ? "up" : "down"}`}
        ></span>
      </button>
      {showOptions && (
        <ul className={styles.dropdown_menu}>
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

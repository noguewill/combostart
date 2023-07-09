import React, { useState } from "react";
import styles from "@/styles/Newpost.module.css";
import { profanityCheck } from "components/ProfanityFilter";

const TagInput = ({ theme, tags, setTags, removeTag }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (tags.includes(inputValue) || profanityCheck(inputValue)) {
        setInputValue("");
        return;
      }

      // Limit the number of tags to 8
      if (tags.length >= 8) {
        setInputValue("");
        return;
      }

      // Input validation: Allow only letters
      if (!/^[A-Za-z]+$/.test(inputValue)) {
        setInputValue("");
        return;
      }

      setTags((prevTags) => [...prevTags, inputValue]);
      setInputValue("");
    }
  };

  const handleTagRemove = (tag) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
    removeTag(tag);
  };

  const isLimitReached = tags.length >= 8; // Check if the number of tags has reached the limit

  return (
    <div className={styles[`${theme}stringsOptions_container`]}>
      <div className={styles.stringsOptions_stringType_wrapper}>
        {isLimitReached ? ( // Render the limit reached message
          <h3>Limit of tags reached</h3>
        ) : (
          <>
            <span>
              Tags
              <span className={styles[`${theme}tagTextOptional`]}>
                ( optional )
              </span>
            </span>

            <input
              className={styles[`${theme}tagInput`]}
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleInputKeyDown}
              maxLength={10}
              placeholder="BnB"
            />
          </>
        )}
        <div className={styles.tagInput_container}>
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={() => handleTagRemove(tag)}
              className={styles.tagItem}
            >
              {tag} &times;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagInput;
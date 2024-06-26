import React from "react";
import styles from "@/styles/NewCombo.module.css";

const PostTitle = ({ postTitle, handlePostTitleChange, theme }) => {
  return (
    <div className={styles.gameTitle_wrapper}>
      <span>Title</span>
      <input
        className={styles[`${theme}gameTitle_input`]}
        type="text"
        placeholder="Ryu superless 11hits combo"
        value={postTitle}
        onChange={handlePostTitleChange}
        required
      />
    </div>
  );
};

export default PostTitle;

import React from "react";
import styles from "@/styles/Newpost.module.css";
import Image from "next/image";
import Navbar from "/components/Navbar";
import ClassicFooter from "/components/ClassicFooter";

const NewPost = () => {
  return (
    <div style={{ backgroundColor: "#d6d6d6" }}>
      <Navbar btnType="classic" />
      <main className={styles.content_container}>
        <div className={styles.authorPost_info_container}>
          <h2>
            Posting as{" "}
            <span className={styles.authorPost_who_info}>combostart</span>
          </h2>
          <h3 className={styles.authorPost_draft_notice}>Draft saved</h3>
        </div>
        <form className={styles.form_container}>
          <div className={styles.gameInfo_input_container}>
            {/* Input to select the game */}
            <div className={styles.gameInfo_input_wrapper}>
              <span className={styles.gameInfo_input_title}>Game</span>
              <input
                style={{ width: "8rem" }}
                className={styles.gameInfo_input}
                placeholder="Street Fighter 6"
              />
            </div>

            {/* Input for where the combo is performed on the screen */}
            <div className={styles.gameInfo_input_wrapper}>
              <span className={styles.gameInfo_input_title}>
                Screen position
              </span>
              <input
                className={styles.gameInfo_input}
                placeholder="Mid-screen"
              />
            </div>

            {/* Input to select the character that performs this combo */}
            <div className={styles.gameInfo_input_wrapper}>
              <span className={styles.gameInfo_input_title}>Character</span>
              <input className={styles.gameInfo_input} placeholder="Ryu" />
            </div>
          </div>

          {/* Input for the title of the post */}
          <div className={styles.gameTitle_wrapper}>
            <span>Post title</span>
            <input
              className={styles.gameTitle_input}
              type="text"
              placeholder="Ryu superless 11hits combo"
            />
          </div>

          <div className={styles.stringsOptions_container}>
            {/* Input for selecting the type the way the strings are displayed for the viewer of the post */}
            <div className={styles.stringsOptions_stringType_wrapper}>
              <span>String input type</span>
              <input
                style={{ width: "5.5rem" }}
                className={styles.stringsOptions_stringType}
                type="text"
                placeholder="Text"
              />
            </div>

            {/* Input for the OP to set the combo strings */}
            <div className={styles.stringsOptions_comboStrings_wrapper}>
              <span>Combo strings</span>
              <input
                className={styles.stringsOptions_comboStrings}
                type="text"
                placeholder="asdasdasdasdasdasd"
              />
            </div>
          </div>

          {/* Combo parameters info section */}
          <div className={styles.gameInfo_input_container}>
            {/* Input to select the game */}
            <div className={styles.gameInfo_input_wrapper}>
              <span className={styles.gameInfo_input_title}>Damage</span>
              <input
                style={{ width: "4rem" }}
                className={styles.gameInfo_input}
                placeholder="5600"
              />
            </div>

            {/* Input for where the combo is performed on the screen */}
            <div className={styles.gameInfo_input_wrapper}>
              <span className={styles.gameInfo_input_title}>Hits</span>
              <input
                style={{ width: "3rem" }}
                className={styles.gameInfo_input}
                placeholder="11"
              />
            </div>

            {/* Input to select the character that performs this combo */}
            <div className={styles.gameInfo_input_wrapper}>
              <span className={styles.gameInfo_input_title}>
                Health Percentage
              </span>
              <div>
                <input
                  style={{ width: "3rem" }}
                  className={styles.gameInfo_input}
                  placeholder="50"
                />
                <span style={{ marginLeft: "0.1rem" }}>%</span>
              </div>
            </div>
          </div>

          {/* Combo tags section */}
          <div className={styles.stringsOptions_container}>
            {/* Input for selecting the type the way the strings are displayed for the viewer of the post */}
            <div className={styles.stringsOptions_stringType_wrapper}>
              <span>Tags</span>
              <input
                style={{ width: "7rem" }}
                className={styles.stringsOptions_stringType}
                type="text"
                placeholder="Mixup"
              />
            </div>
          </div>
          <button className={styles.submitPost_btn}>SUBMIT POST</button>
        </form>
      </main>
      <ClassicFooter />
    </div>
  );
};

export default NewPost;

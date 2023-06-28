import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import styles from "@/styles/Newpost.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const NewPost = () => {
  const { theme } = useContext(ThemeContext);
  const [damage, setDamage] = useState("");
  const [hits, setHits] = useState("");
  const [game, setGame] = useState("Street Fighter 6");
  const [screenPosition, setScreenPosition] = useState("");
  const [character, setCharacter] = useState("");
  const [stringType, setStringType] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      game !== "" &&
        screenPosition !== "" &&
        character !== "" &&
        damage !== "" &&
        hits !== ""
    );
  }, [game, screenPosition, character, damage, hits]);

  const handleDamageChange = (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, ""); // Remove non-numeric characters
    input = input.slice(0, 5); // Limit input to 5 characters
    const newDamage = input === "" ? null : parseInt(input);

    if (newDamage !== null && newDamage > 10000) {
      setDamage(10000);
    } else {
      setDamage(newDamage);
    }
  };

  const handleHitsChange = (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, ""); // Remove non-numeric characters
    input = input.slice(0, 2); // Limit input to 2 characters
    setHits(input);
  };

  const handleGameChange = (event) => {
    setGame(event.target.value);
  };

  const handleScreenPositionChange = (event) => {
    setScreenPosition(event.target.value);
  };

  const handleCharacterChange = (event) => {
    setCharacter(event.target.value);
  };

  const handleStringTypeChange = (event) => {
    setStringType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form submission logic here

    // Reset form fields after submission
    setDamage("");
    setHits("");
    setGame("");
    setScreenPosition("");
    setCharacter("");
    setStringType("");
    setIsFormValid(false);
  };

  return (
    <div className={styles[`${theme}post_parent`]}>
      <Navbar />
      <main className={styles.content_container}>
        <div className={styles.authorPost_info_container}>
          <h2>
            Posting as
            <span className={styles.authorPost_who_info}></span>
          </h2>
          <h3 className={styles.authorPost_draft_notice}>Draft saved</h3>
        </div>
        <form
          className={styles[`${theme}form_container`]}
          onSubmit={handleSubmit}
        >
          <div className={styles.gameInfo_input_container}>
            <div className={styles[`${theme}gameInfo_input_wrapper`]}>
              <span className={styles[`${theme}gameInfo_input_title`]}>
                Game
              </span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <input
                  style={{ width: "6rem", color: "gray" }}
                  value={game}
                  onChange={handleGameChange}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  disabled
                />
              </div>
            </div>

            <div className={styles[`${theme}gameInfo_input_wrapper`]}>
              <span className={styles[`${theme}gameInfo_input_title`]}>
                Screen position
              </span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <select
                  value={screenPosition}
                  onChange={handleScreenPositionChange}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Anywhere">Anywhere</option>
                  <option value="Mid-screen">Mid-screen</option>
                  <option value="Corner">Corner</option>
                </select>
              </div>
            </div>

            <div className={styles[`${theme}gameInfo_input_wrapper`]}>
              <span className={styles[`${theme}gameInfo_input_title`]}>
                Character
              </span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <select
                  value={character}
                  onChange={handleCharacterChange}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Blanka">Blanka</option>
                  <option value="Cammy">Cammy</option>
                  <option value="Chun-Li">Chun Li</option>
                  <option value="Dee Jay">Dee Jay</option>
                  <option value="Dhalsim">Dhalsim</option>
                  <option value="E-Honda">E-Honda</option>
                  <option value="Guile">Guile</option>
                  <option value="Jamie">Jamie</option>
                  <option value="JP">JP</option>
                  <option value="Juri">Juri</option>
                  <option value="Ken">Ken</option>
                  <option value="Kimberly">Kimberly</option>
                  <option value="Lily">Lily</option>
                  <option value="Luke">Luke</option>
                  <option value="Manon">Manon</option>
                  <option value="Marisa">Marisa</option>
                  <option value="Ryu">Ryu</option>
                  <option value="Zangief">Zangief</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.gameTitle_wrapper}>
            <span>Post title</span>
            <input
              className={styles[`${theme}gameTitle_input`]}
              type="text"
              placeholder="Ryu superless 11hits combo"
              required
            />
          </div>

          <div className={styles[`${theme}stringsOptions_container`]}>
            <div className={styles.stringsOptions_stringType_wrapper}>
              <span>Combo input</span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <select
                  value={stringType}
                  onChange={handleStringTypeChange}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Text">Text</option>
                  <option value="Selectable">Selectable</option>
                </select>
              </div>
            </div>

            <div className={styles.stringsOptions_comboStrings_wrapper}>
              <span>Combo strings</span>
              <input
                className={styles[`${theme}stringsOptions_comboStrings`]}
                type="text"
                placeholder="asdasdasdasdasdasd"
                required
              />
            </div>
          </div>

          <div className={styles.comboInfo_input_container}>
            <div className={styles.stringsOptions_stringType_wrapper}>
              <span>Combo has super?</span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <select
                  value={stringType}
                  onChange={handleStringTypeChange}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className={styles.stringsOptions_stringType_wrapper}>
              <span>Drive Rush bars</span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <select
                  value={stringType}
                  onChange={handleStringTypeChange}
                  className={styles[`${theme}stringsOptions_stringType`]}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>

            <div className={styles[`${theme}gameInfo_input_wrapper`]}>
              <span className={styles[`${theme}gameInfo_input_title`]}>
                Damage
              </span>
              <input
                value={damage}
                onChange={handleDamageChange}
                className={styles[`${theme}gameInfo_input`]}
                placeholder="5600"
                required
              />
            </div>

            <div className={styles[`${theme}gameInfo_input_wrapper`]}>
              <span className={styles[`${theme}gameInfo_input_title`]}>
                Hits
              </span>
              <input
                value={hits}
                onChange={handleHitsChange}
                className={styles[`${theme}gameInfo_input`]}
                placeholder="11"
                required
              />
            </div>
          </div>

          <div className={styles[`${theme}stringsOptions_container`]}>
            <div className={styles.stringsOptions_stringType_wrapper}>
              <span>Tags</span>
              <div className={styles[`${theme}selectDropdownContainer`]}>
                <input
                  className={styles[`${theme}stringsOptions_stringType`]}
                  type="text"
                  placeholder="Mixup"
                  required
                />
              </div>
            </div>
          </div>
          <button className={styles.submitPost_btn} disabled={!isFormValid}>
            SUBMIT POST
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default NewPost;

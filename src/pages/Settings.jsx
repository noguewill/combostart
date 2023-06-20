import React, { useContext } from "react";
import styles from "@/styles/Settings.module.css";
import Navbar from "/components/Navbar";
import ClassicFooter from "/components/ClassicFooter";

const Settings = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: "#292929" }}>
      <Navbar />
      <div className={styles.modal_parent}>
        <h3>COMBOSTART</h3>
        <button>STANDARD</button>
        <div className={styles.modal_container}>
          <div className={styles.settingsRow}>
            <div className={styles.settingTitle_container}>
              <span className={styles.settingOption_text}>Display Name</span>
              <h3 className={styles.settingsOption}>COMBOSTART</h3>
            </div>
            <button className={styles.settingBtn}>Edit</button>
          </div>
          <div className={styles.settingsRow}>
            <div className={styles.settingTitle_container}>
              <span className={styles.settingOption_text}>E-mail</span>
              <h3 className={styles.settingsOption}>anemailgmail.com</h3>
            </div>
            <button className={styles.settingBtn}>Edit</button>
          </div>
          <div className={styles.settingsRow}>
            <div className={styles.settingTitle_container}>
              <span className={styles.settingOption_text}>Password</span>
              <h3 className={styles.settingsOption}>****************</h3>
            </div>
            <button className={styles.settingBtn}>Change</button>
          </div>
        </div>
        <div className={styles.subscriptionSection}>
          <div className={styles.settingsRow}>
            <div className={styles.settingTitle_container}>
              <span className={styles.settingOption_text}>Subscription</span>
              <h3 className={styles.settingsOption}>Standard</h3>
            </div>
            <button className={styles.settingBtn}>Upgrade to Premium</button>
          </div>
        </div>
        <button className={styles.signOut_btn}>Sign Out</button>
      </div>
      <ClassicFooter />
    </div>
  );
};
export default Settings;

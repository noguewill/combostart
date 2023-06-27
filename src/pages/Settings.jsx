import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import styles from "@/styles/Settings.module.css";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import { Auth } from "aws-amplify";
import { awsmobile } from "components/Authentication/amplifyHandler";

const Settings = () => {
  const { theme } = useContext(ThemeContext);
  const [userAttributes, setUserAttributes] = useState(null);

  useEffect(() => {
    awsmobile;
    const fetchUserAttributes = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserAttributes(user);
      } catch (error) {
        // Handle error or redirect to the sign-in page
        console.log(error);
      }
    };

    fetchUserAttributes();
  }, []);

  return (
    <div style={{ backgroundColor: "#292929" }}>
      <Navbar />
      <div className={styles.modal_parent}>
        {/*         <h3>COMBOSTART</h3>
        <button>STANDARD</button> */}
        <div className={styles.modal_container}>
          <div className={styles.settingsRow}>
            <div className={styles.settingTitle_container}>
              <span className={styles.settingOption_text}>Display Name</span>
              <h3 className={styles.settingsOption}>
                {userAttributes && userAttributes.username}
              </h3>
            </div>
            <button className={styles.settingBtn}>Edit</button>
          </div>
          <div className={styles.settingsRow}>
            <div className={styles.settingTitle_container}>
              <span className={styles.settingOption_text}>E-mail</span>
              <h3 className={styles.settingsOption}>
                {userAttributes && userAttributes.attributes["email"]}
              </h3>
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
      <Footer />
    </div>
  );
};

export default Settings;

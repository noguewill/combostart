import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import styles from "@/styles/Settings.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { Auth } from "aws-amplify";
import VerificationModal from "components/Authentication/VerificationModal";
import { useRouter } from "next/router";
import Image from "next/image";

const Settings = () => {
  const { theme } = useContext(ThemeContext);
  const [notificationText, setNotificationText] = useState("");
  const [userAttributes, setUserAttributes] = useState(null);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [usernameEditMode, setUsernameEditMode] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Password states */
  const [changePassword, setChangePassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
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

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      router.push("/ComboHub");
      setNotificationText(success.message);
      // Perform any additional clean-up or redirect
    } catch (error) {
      setNotificationText(error.message);
      // Handle sign-out error
      console.log(error);
    }
  };

  const handleChangePassword = async () => {
    try {
      setLoading(true); // Show the loading icon
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
      console.log("Password changed successfully");
      // Reset the password fields
      setOldPassword("");
      setNewPassword("");
      setNotificationText("Password changed successfully");
    } catch (error) {
      // Handle error while changing the password
      console.log(error);
      if (error.code === "InvalidParameterException") {
        setNotificationText(
          "Password not accepted: Must have at least 6 characters, no space between characters"
        );
      } else if (error.code === "LimitExceededException") {
        setNotificationText("Limit of attempts reached, try again later");
      }
    } finally {
      setChangePassword(false);
      setLoading(false); // Hide the loading icon
    }
  };

  const handleEditEmail = () => {
    setEmailEditMode(true);
    setNewEmail(userAttributes.attributes.email);
  };

  const handleSaveEmail = async () => {
    try {
      setLoading(true); // Show the loading icon
      await Auth.updateUserAttributes(userAttributes, {
        email: newEmail,
      });
      setEmailEditMode(false);
      setShowVerificationModal(true); // Show the verification modal
    } catch (error) {
      // Handle error while updating email
      console.log(error);
    } finally {
      setLoading(false); // Hide the loading icon
    }
  };

  const handleVerificationCodeConfirmation = async (verificationCode) => {
    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", verificationCode);
      setShowVerificationModal(false); // Hide the verification modal
      setUserAttributes({
        ...userAttributes,
        attributes: {
          ...userAttributes.attributes,
          email: newEmail,
        },
      });
    } catch (error) {
      // Handle verification code confirmation error
      console.log(error);
    }
  };

  const handleEditUsername = () => {
    setUsernameEditMode(true);
    setNewUsername(userAttributes.username);
  };

  const handleSaveUsername = async () => {
    try {
      await Auth.updateUserAttributes(userAttributes, {
        preferred_username: newUsername,
      });
      setUsernameEditMode(false);
      setUserAttributes({ ...userAttributes, username: newUsername });
    } catch (error) {
      // Handle error while updating username
      console.log(error);
    }
  };

  return (
    <div className={styles[`${theme}settings_container`]}>
      {showVerificationModal && (
        <VerificationModal
          onVerificationCodeConfirmation={handleVerificationCodeConfirmation}
          onCancel={() => setShowVerificationModal(false)}
        />
      )}
      <Navbar />
      <div className={styles.modal_parent}>
        <div
          className={styles.notificationMessage_container}
          style={
            notificationText === ""
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
        >
          <h4 className={styles.notificationMessage}>{notificationText}</h4>
        </div>
        <div className={styles.modal_container}>
          <div className={styles[`${theme}settingsRow`]}>
            <div className={styles.settingTitle_container}>
              <span className={styles.settingOption_text}>USERNAME</span>
              <h3 className={styles.settingsOption}>
                {userAttributes && userAttributes.username}
              </h3>
            </div>
            <button className={styles.settingBtn} onClick={handleEditUsername}>
              Edit Username
            </button>
          </div>
          <div className={styles[`${theme}settingsRow`]}>
            {emailEditMode ? (
              <>
                <input
                  type="email"
                  className={styles.emailInput}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                {loading ? (
                  <div className={styles.loadingIcon}>Loading...</div> // Render the loading icon
                ) : (
                  <button className={styles.saveBtn} onClick={handleSaveEmail}>
                    SAVE
                  </button>
                )}
              </>
            ) : (
              <div className={styles.settingTitle_container}>
                <span className={styles.settingOption_text}>E-MAIL</span>
                <h3 className={styles.settingsOption}>
                  {userAttributes && userAttributes.attributes["email"]}
                </h3>
              </div>
            )}
            <button className={styles.settingBtn} onClick={handleEditEmail}>
              Change E-mail
            </button>
          </div>

          <div className={styles[`${theme}settingsRow`]}>
            <div className={styles.settingTitle_container}>
              {!changePassword ? (
                <>
                  <span className={styles.settingOption_text}>PASSWORD</span>
                  <h3 className={styles.settingsOption}>****************</h3>
                </>
              ) : (
                <div>
                  <span className={styles.settingOption_text}>
                    CHANGE PASSWORD
                  </span>
                  {/* Input for the old password */}
                  <div className={styles.password_container}>
                    <label htmlFor="password" className={styles.password_label}>
                      {/* Input for the old password */}
                      <input
                        type={showOldPassword ? "text" : "password"}
                        name="oldPassword"
                        required
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={styles.password_input}
                        placeholder="Current Password"
                        maxLength={16}
                      />
                    </label>
                    <button
                      className={styles.passwordEye_btn}
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      <Image
                        className={styles.eye_icon}
                        src={
                          showOldPassword
                            ? "/signUpPasswordEye.svg"
                            : "/signUpPasswordClosedEye.svg"
                        }
                        alt="eye"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>

                  {/* Input for the new password */}

                  <div className={styles.password_container}>
                    <label htmlFor="password" className={styles.password_label}>
                      {/* Input for the new password */}
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        required
                        className={styles.password_input}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        maxLength={16}
                      />
                    </label>
                    <button
                      className={styles.passwordEye_btn}
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      <Image
                        className={styles.eye_icon}
                        src={
                          showNewPassword
                            ? "/signUpPasswordEye.svg"
                            : "/signUpPasswordClosedEye.svg"
                        }
                        alt="eye"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                  {/* Save button */}
                  <button
                    className={styles.saveBtn}
                    onClick={handleChangePassword}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
            <button
              className={
                changePassword ? styles.settingBtn_cancel : styles.settingBtn
              }
              onClick={() => setChangePassword(!changePassword)}
            >
              {changePassword ? "Cancel" : "Change Password"}
            </button>
          </div>
        </div>
        <div className={styles.subscriptionSection} style={{ display: "none" }}>
          <div className={styles[`${theme}settingsRow`]}>
            <div className={styles.settingTitle_container}>
              <span className={styles.settingOption_text}>Subscription</span>
              <h3 className={styles.settingsOption}>Standard</h3>
            </div>
            <button className={styles.settingBtn}>Upgrade to Premium</button>
          </div>
        </div>
        <button
          className={styles.signOut_btn}
          style={{ marginTop: "1rem" }}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;

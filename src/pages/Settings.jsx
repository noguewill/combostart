import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import styles from "@/styles/Settings.module.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { Auth } from "aws-amplify";
import VerificationModal from "components/Authentication/VerificationModal";
import { useRouter } from "next/router";
import Image from "next/image";

// Import necessary dependencies and components

const Settings = () => {
  const { theme } = useContext(ThemeContext);
  const [notificationText, setNotificationText] = useState("");
  const [userAttributes, setUserAttributes] = useState(null);
  const [newEmail, setNewEmail] = useState("");

  /* State changes */
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [displaynameEditMode, setDisplaynameEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  /* Name properties */
  const [currentUserName, setCurrentUserName] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");

  // Password states
  const [changePassword, setChangePassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); // Add verificationCode state

  const router = useRouter();

  useEffect(() => {
    const fetchUserAttributes = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        const userInfo = await Auth.currentUserInfo();

        setCurrentUserName(userInfo.username);
        setUserAttributes(userInfo);
      } catch (error) {
        // Handle error or redirect to the sign-in page
        console.log(error);
      }
    };

    fetchUserAttributes();
  }, []);

  async function updateUserDisplayName() {
    const user = await Auth.currentAuthenticatedUser();

    await Auth.updateUserAttributes(user, {
      "custom:DisplayName": newDisplayName,
    })
      .then(() => {
        setDisplaynameEditMode(false);
        console.log("Display name updated successfully");
        setNotificationText("Display name updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error updating display name:", error);
        if (
          error.message ===
          "user.custom:DisplayName: String must be no longer than 10 characters"
        ) {
          setNotificationText(
            "Your Display name must be no longer than 10 characters"
          );
        } else {
          setNotificationText("Error: Invalid display name");
        }
      });
  }

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

  async function updateUserEmail() {
    const user = await Auth.currentAuthenticatedUser();

    await Auth.updateUserAttributes(user, {
      email: newEmail,
    })
      .then(() => {
        console.log("a verification code is sent");
        setNotificationText("a verification code is sent");
        setShowVerificationModal(true);
      })
      .catch((e) => {
        console.log("failed with error", e);
        setNotificationText("Error", error.message);
      });
  }

  return (
    <div className={styles[`${theme}settings_container`]}>
      <Navbar />
      {showVerificationModal && (
        <VerificationModal
          newEmail={newEmail}
          emailEditMode={emailEditMode}
          currentUserName={currentUserName}
          setNotificationText={setNotificationText}
        />
      )}
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
            {userAttributes && (
              <>
                {displaynameEditMode ? (
                  <>
                    <input
                      type="text"
                      className={styles.usernameInput}
                      value={newDisplayName}
                      maxLength={10}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                    />
                    <button
                      className={styles.saveBtn}
                      onClick={updateUserDisplayName}
                    >
                      SAVE
                    </button>
                  </>
                ) : (
                  <div className={styles.settingTitle_container}>
                    <span className={styles.settingOption_text}>
                      DISPLAY NAME
                    </span>
                    <h3 className={styles.settingsOption}>
                      {userAttributes.attributes["custom:DisplayName"]}
                    </h3>
                  </div>
                )}
                <button
                  className={styles.settingBtn}
                  onClick={() => setDisplaynameEditMode(true)}
                >
                  Edit Display Name
                </button>
              </>
            )}
          </div>

          {/* E-mail section */}
          <div className={styles[`${theme}settingsRow`]}>
            {emailEditMode ? (
              <>
                <input
                  type="email"
                  className={styles.emailInput}
                  value={newEmail.toString()} // Convert the value to a string
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                {loading ? (
                  <div className={styles.loadingIcon}>Loading...</div> // Render the loading icon
                ) : (
                  <button className={styles.saveBtn} onClick={updateUserEmail}>
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
            <button
              className={styles.settingBtn}
              onClick={() => setEmailEditMode(true)}
            >
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
                      <span
                        className={
                          showOldPassword
                            ? styles.password_icon_show
                            : styles.password_icon_hide
                        }
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        <Image
                          src={
                            showOldPassword
                              ? "/icons/hide_password.svg"
                              : "/icons/show_password.svg"
                          }
                          alt={
                            showOldPassword ? "Hide password" : "Show password"
                          }
                          width={20}
                          height={20}
                        />
                      </span>
                    </label>
                  </div>
                  {/* Input for the new password */}
                  <div className={styles.password_container}>
                    <label htmlFor="password" className={styles.password_label}>
                      {/* Input for the new password */}
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={styles.password_input}
                        placeholder="New Password"
                        maxLength={16}
                      />
                      <span
                        className={
                          showNewPassword
                            ? styles.password_icon_show
                            : styles.password_icon_hide
                        }
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        <Image
                          src={
                            showNewPassword
                              ? "/icons/hide_password.svg"
                              : "/icons/show_password.svg"
                          }
                          alt={
                            showNewPassword ? "Hide password" : "Show password"
                          }
                          width={20}
                          height={20}
                        />
                      </span>
                    </label>
                  </div>
                  {/* Input for the verification code */}
                  <div className={styles.password_container}>
                    <label
                      htmlFor="verificationCode"
                      className={styles.password_label}
                    >
                      <input
                        type="text"
                        name="verificationCode"
                        required
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className={styles.password_input}
                        placeholder="Verification Code"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
            <button
              className={styles.settingBtn}
              onClick={() => setChangePassword(!changePassword)}
            >
              {changePassword ? "Cancel" : "Change Password"}
            </button>
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

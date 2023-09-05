import React from "react";
import styles from "@/styles/NotificationModal.module.css";

export const NotificationModal = ({ notificationText }) => {
  return (
    <>
      {notificationText === "" ? (
        ""
      ) : (
        <div className={styles.notificationMessage_container}>
          <h4 className={styles.notificationMessage}>{notificationText}</h4>
        </div>
      )}
    </>
  );
};

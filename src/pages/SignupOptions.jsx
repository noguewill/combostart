import React from "react";
import styles from "@/styles/SignupOptions.module.css";
import Image from "next/image";

const SignupOptions = ({ setShowSignupForm }) => {
  const signUpOptionsData = [
    {
      text: "Sign Up with E-mail",
      icon: "/logo.png",
      color: "#0e0e0e",
      textColor: "white",
    },
    {
      text: "Sign Up with Google",
      icon: "/googleIcon.svg",
      color: "white",
      textColor: "#1a1a1a",
    },
    {
      text: "Sign Up with Steam",
      icon: "/steamIcon.svg",
      color: "rgb(43, 108, 154)",
      textColor: "white",
    },
    {
      text: "Sign Up with Discord",
      icon: "/discordIcon.svg",
      color: "#7289DA",
      textColor: "white",
    },
    {
      text: "Sign Up with Xbox Live",
      icon: "/xboxIcon.svg",
      color: "green",
      textColor: "white",
    },
    {
      text: "Sign Up with Playstation Network",
      icon: "/playstationIcon.svg",
      color: "#003087",
      textColor: "white",
    },
  ];

  return (
    <>
      <h3 className={styles.signUp_message}>Sign up and join us!</h3>
      <div className={styles.signOption_wrapper}>
        {signUpOptionsData.map((option, index) => (
          <button
            key={index}
            className={styles.signOption_btn}
            style={{ backgroundColor: option.color, color: option.textColor }}
            onClick={() => setShowSignupForm(true)}
          >
            <span>{option.text}</span>
            <div
              className={styles.signOptionIcon}
              style={{ backgroundColor: option.color }}
            >
              <Image
                src={option.icon}
                alt={option.text}
                width={26}
                height={26}
              />
            </div>
          </button>
        ))}
        <span style={{ fontSize: "0.7rem" }}>OR</span>
      </div>
    </>
  );
};
export default SignupOptions;

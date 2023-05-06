import React from "react";
import styles from "@/styles/SignupOptions.module.css";
import Image from "next/image";

const SignupOptions = ({ setShowSignupForm, showSignupForm, signIn }) => {
  const signUpOptionsData = [
    {
      text: "Sign Up with E-mail",
      textSignIn: "Sign In withh E-mail",
      icon: "/logo.svg",
      color: "#0e0e0e",
      textColor: "white",
    },
    {
      text: "Sign Up with Google",
      textSignIn: "Sign In with Google",
      icon: "/googleIcon.svg",
      color: "white",
      textColor: "#1a1a1a",
    },
    {
      text: "Sign Up with Steam",
      textSignIn: "Sign In with Steam",
      icon: "/steamIcon.svg",
      color: "rgb(43, 108, 154)",
      textColor: "white",
    },
    {
      text: "Sign Up with Discord",
      textSignIn: "Sign In with Discord",
      icon: "/discordIcon.svg",
      color: "#7289DA",
      textColor: "white",
    },
    {
      text: "Sign Up with Xbox Live",
      textSignIn: "Sign In with Xbox Live",
      icon: "/xboxIcon.svg",
      color: "green",
      textColor: "white",
    },
    {
      text: "Sign Up with Playstation Network",
      textSignIn: "Sign In with Playstation Network",
      icon: "/playstationIcon.svg",
      color: "#003087",
      textColor: "white",
    },
  ];

  return (
    <>
      <h3 className={styles.signUp_message}>
        {signIn ? "Welcome back!" : "Sign up and join us!"}
      </h3>
      <div className={styles.signOption_wrapper}>
        {signUpOptionsData.map((option, index) => (
          <button
            key={index}
            className={styles.signOption_btn}
            style={{ backgroundColor: option.color, color: option.textColor }}
            onClick={() => setShowSignupForm(!showSignupForm)}
          >
            <span>{signIn ? option.textSignIn : option.text}</span>
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

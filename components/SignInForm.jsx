import styles from "@/styles/Form.module.css";
import Image from "next/image";

const SignInForm = ({ showSignupForm, showPassword, setShowPassword }) => {
  return (
    <form
      className={`${styles.signUp_form} ${
        showSignupForm ? styles.show : styles.hide
      }`}
      onSubmit={handleSubmit}
    >
      <div className={styles.label_wrapper}>
        <div>
          <span> USERNAME</span>
          <span
            className={styles.required_asterisk}
            style={{ visibility: "hidden" }}
          >
            *
          </span>
        </div>
        <label className={styles.username_label} htmlFor="username">
          <input
            id={"signIn_username_input"}
            className={styles.username_input}
            type="text"
            name="username"
            required
          />
        </label>
      </div>

      <div className={styles.label_wrapper}>
        <div>
          <span>PASSWORD</span>
        </div>

        {showPassword ? (
          <>
            <label
              id={"signIn_password_input"}
              htmlFor="password"
              className={styles.password_label}
            >
              <input
                type="password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className={styles.password_input}
              />
            </label>
          </>
        ) : (
          <>
            <label htmlFor="password" className={styles.password_label}>
              <input
                type="password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className={styles.password_input}
              />
            </label>
          </>
        )}

        <button
          className={styles.passwordEye_btn}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Image
            className={styles.exclamation_icon}
            src={
              showPassword
                ? "/signUpPasswordEye.svg"
                : "/signUpPasswordClosedEye.svg"
            }
            alt="eye"
            width={20}
            height={20}
          />
        </button>
      </div>

      <button type="submit" className={styles.submit_btn}>
        SUBMIT
      </button>
    </form>
  );
};
export default SignInForm;

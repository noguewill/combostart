import styles from "@/styles/ComboHub.module.css";
import Navbar from "/components/Navbar";
import ComboGuideCard from "/components/ComboGuideCard";
import ClassicFooter from "/components/ClassicFooter";

const ComboHub = () => {
  return (
    <>
      <div className={styles.mobileMessage}>
        <h3 style={{ fontSize: "2rem" }}>Hello!</h3>
        <p style={{ padding: "1rem" }}>
          The mobile version of this website is still in{" "}
          <strong>development</strong>, please access this website on your PC.
        </p>
        <img
          src="/logo.svg"
          alt="Combostart logo"
          width={50}
          height={50}
          style={{ marginTop: "2rem" }}
        />
      </div>
      {/* BUMP */}
      <div className={styles.page_container}>
        <Navbar btnType={`classic`} />
        {/*  <Search btnType={`classic`} onData={handleDataFromChild} /> */}
        <div className={styles.container}>
          <ComboGuideCard />
        </div>
        <ClassicFooter />
      </div>
    </>
  );
};

export default ComboHub;

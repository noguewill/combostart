import styles from "@/styles/ComboHub.module.css";
import Navbar from "/components/Navbar";
import ComboGuideCard from "/components/ComboGuideCard";
import ClassicFooter from "/components/ClassicFooter";

const ComboHub = () => {
  return (
    <div className={styles.bigboi}>
      <Navbar btnType={`classic`} />
      {/*  <Search btnType={`classic`} onData={handleDataFromChild} /> */}
      <div className={styles.container}>
        <ComboGuideCard />
      </div>
      <ClassicFooter />
    </div>
  );
};

export default ComboHub;

import styles from "@/styles/ComboGuides.module.css";
import Navbar from "./Navbar";
import ComboGuideCard from "./ComboGuideCard";
import ClassicFooter from "./ClassicFooter";

const ComboGuides = () => {
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

export default ComboGuides;

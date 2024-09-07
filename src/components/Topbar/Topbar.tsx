import styles from "./Topbar.module.scss";
import smartBusinessLogo from "../../assets/smart_business_logo.webp";
import myPhoto from "../../assets/david_mastalski.webp";
import CenterContainer from "../CenterContainer/CenterContainer";

const Topbar: React.FC = () => {
  return (
    <div className={styles.topBar}>
      <CenterContainer>
        <div className={styles.container}>
          <img
            className={styles.logo}
            src={smartBusinessLogo}
            alt="Smart Business"
          />

          <div className={styles.myData}>
            <img src={myPhoto} />
            Dawid Mastalski
          </div>
        </div>
      </CenterContainer>
    </div>
  );
};

export default Topbar;

import { ReactNode } from "react";
import styles from "./CenterContainer.module.scss";

interface CenterContainerProps {
  children: ReactNode;
}

const CenterContainer: React.FC<CenterContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default CenterContainer;

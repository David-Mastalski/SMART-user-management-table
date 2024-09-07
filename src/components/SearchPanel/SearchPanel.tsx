import styles from "./SearchPanel.module.scss";
import CenterContainer from "../CenterContainer/CenterContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { selectFilters, setFilters } from "../../features/users/userSlice";

const SearchPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => selectFilters(state));

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFilters({ ...filters, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <CenterContainer>
        <p className={styles.title}>Users</p>
        <div className={styles.panel}>
          <div className={styles.inputContainer}>
            <span>Name</span>
            <input
              type="text"
              name="name"
              placeholder="Search for name"
              onChange={handleFilterChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>Username</span>
            <input
              type="text"
              name="username"
              placeholder="Search for username"
              onChange={handleFilterChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>E-mail</span>
            <input
              type="text"
              name="email"
              placeholder="Search for email"
              onChange={handleFilterChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>Phone</span>
            <input
              type="text"
              name="phone"
              placeholder="Search for phone"
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </CenterContainer>
    </div>
  );
};

export default SearchPanel;

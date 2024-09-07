import { useDispatch, useSelector } from "react-redux";
import styles from "./UserTable.module.scss";
import { AppDispatch } from "../../app/store";
import {
  fetchData,
  selectError,
  selectLoading,
  selectFilteredUsers,
} from "../../features/users/userSlice";
import { useEffect } from "react";
import CenterContainer from "../CenterContainer/CenterContainer";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector(selectFilteredUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <LoadingAnimation />;

  return (
    <CenterContainer>
      {error ? (
        <div className={styles.errorContainer}>
          <span>Unable to download data</span>
        </div>
      ) : (
        <div className={styles.container}>
          <table className={styles.usersTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, username, email, phone }) => (
                <tr key={id}>
                  <td style={{ fontWeight: "800" }}>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CenterContainer>
  );
};

export default UserTable;

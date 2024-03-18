import { FC } from "react";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";

const CHeader: FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authSlice.isLoggedIn
  );
  const handleResetSesstion = () => {
    axios.get("http://localhost/rest/clearSession.asp").then(({ data }) => {
      console.log("done");
    });
  };
  return (
    <div
      className={`fixed w-full shadow-md px-20 md:py-3 lg:py-5 grid grid-cols-12 justify-center items-center ${styles["header-gradient"]} ${styles["header-items-white"]}`}
    >
      <span>אודות</span>
      <span>צור קשר</span>
      {isLoggedIn && <Link to={ROUTES.ORDERS}>רכבים</Link>}
      <span className="col-start-11 col-end-12 text-end">LOGO</span>
      <button onClick={handleResetSesstion}>reset</button>
    </div>
  );
};
export default CHeader;

import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../store/index";
import ROUTES from "../routes/ROUTES";

interface IProps {
  children: ReactNode;
}

const AuthGuard: FC<IProps> = ({ children }) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authSlice.isLoggedIn
  );
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to={ROUTES.HOME} />;
  }
};

export default AuthGuard;

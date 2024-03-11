import { FC, ReactNode } from "react";
import CHeader from "./header/Header.component";
import CFooter from "./footer/Footer.component";

interface IProps {
  children: ReactNode;
}

const CLayout: FC<IProps> = ({ children }) => {
  return (
    <div>
      <CHeader />
      {children}
      <CFooter />
    </div>
  );
};

export default CLayout;

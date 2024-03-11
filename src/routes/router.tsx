import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/Home/Home.page";
import OrdersPage from "../pages/Orders/Orders.page";
import AuthGuard from "../guards/AuthGuard";

const Router: FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route
        path={ROUTES.ORDERS}
        element={
          <AuthGuard>
            <OrdersPage />
          </AuthGuard>
        }
      />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;

import React, { useContext } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import "./index.css";
import "./chart.css";
import "./step.css";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./layouts/nav";
import ScrollToTop from "./layouts/ScrollToTop";
import Error403 from "./pages/Error403";

import { ThemeContext } from "../context/ThemeContext";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import DepositHistory from "./components/Dashboard/DepositHistory";
import CommissionSettings from "./components/AdminScreen/CommissionSettings";
import BuyRequests from "./components/AdminScreen/BuyRequests";
import SellRequests from "./components/AdminScreen/SellRequests";
import Profile from "./components/Profile/Profile";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./components/Dashboard/UserList";
import UserRewards from "./components/Dashboard/UserRewards";

const AdminIndex = () => {
  const dispatch = useDispatch();
  const coinReducer = useSelector((store) => store.coinReducer);
  let { coin } = useParams();
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    { url: "admin-dashboard", component: AdminDashboard },
    { url: "profile", component: Profile },
    { url: "buy-requests", component: BuyRequests },
    { url: "sell-requests", component: SellRequests },
    { url: "users", component: UserList },
    { url: "rewards", component: UserRewards },
    { url: "deposit-history", component: DepositHistory },
    { url: "commission-settings", component: CommissionSettings },
    { url: "*", component: Error403 },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      {coinReducer.isLoading && (
        <div className="loader">
          <RotatingLines
            strokeColor="#3eacff"
            strokeWidth="5"
            animationDuration="0.75"
            width="70"
            visible={true}
          />
        </div>
      )}

      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "vh-100"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </>
  );
};

export default AdminIndex;

import React, { useContext, lazy } from "react";
/// React router dom
import { Switch, Route, useParams } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./layouts/nav";
import ScrollToTop from "./layouts/ScrollToTop";
import Home from "./components/Dashboard/Home";
import Deposit from "./components/Deposit/Deposit";

/// Charts
// import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

import Error404 from "./pages/Error404";

// import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import DepositHistory from "./components/Dashboard/DepositHistory";
import Withdrawl from "./components/Withdrawl/Withdrawl";
import CommissionSettings from "./components/AdminScreen/CommissionSettings";

import DepositRequest from "./components/AdminScreen/DepositRequest";
import WithdrawalRequests from "./components/AdminScreen/WithdrawalRequests";
import BuyRequests from "./components/AdminScreen/BuyRequests";
import SellRequests from "./components/AdminScreen/SellRequests";
import TransactionHistoryScreen from "./components/Transaction history Screen/TransactionHistoryScreen";
import Exchange from "./components/Exchange/Exchange";
import History from "./components/History/History";
import Buy from "./components/Buy/Buy";
import Sell from "./components/Sell/Sell";
import Profile from "./components/Profile/Profile";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Rewards from "./components/Rewards/Rewards";
import UserList from "./components/Dashboard/UserList";
const SignUp = lazy(() => import("../jsx/pages/Registration"));

const Markup = () => {
  const dispatch = useDispatch();
  const coinReducer = useSelector((store) => store.coinReducer);
  const userReducer = useSelector((store) => store.userReducer);
  let { coin } = useParams();
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    { url: "/", component: Home },
    { url: "deposit", component: Deposit },
    { url: "withdrawl", component: Withdrawl },
    { url: "transaction-history", component: TransactionHistoryScreen },
    { url: "page-register/:id", component: SignUp },
    { url: "page-register", component: SignUp },
    { url: "sell", component: Sell },
    { url: "buy", component: Buy },
    { url: "exchange", component: Exchange },
    { url: "page-login", component: Login },
    { url: "rewards", component: Rewards },
    { url: "history", component: History },
    { url: "profile", component: Profile },
    { url: "*", component: Error404 },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath =
    path.split("-").includes("page") ||
    window.location.pathname.includes("page-register")
      ? true
      : false;
  
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

export default Markup;

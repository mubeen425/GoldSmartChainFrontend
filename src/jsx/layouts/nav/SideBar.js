/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import HomeIcon from "@mui/icons-material/Home";
import {
  AttachMoney,
  CurrencyBitcoin,
  CurrencyExchange,
  Money,
  Payments,
  Settings,
} from "@mui/icons-material";
import { FaCoins } from "react-icons/fa";
import HistoryIcon from "@mui/icons-material/History";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");
    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }
    handleheartBlast.addEventListener("click", heartBlast);
  }, []);

  // For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  //let scrollPosition = useScrollPosition();

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
      "",
      "dashboard-dark",
      "kanban",
      "clients",
      "project-details",
      "messages",
      "latest-activity",
      "task",
    ],
    app = [
      "app-profile",
      "post-details",
      "app-calender",
      "email-compose",
      "email-inbox",
      "email-read",
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "post-details",
      "ecom-product-detail",
    ],
    deposit = ["deposit"],
    portfolio = ["portfolio"],
    withdrawl = ["withdrawl"],
    discover = ["discover"],
    buy = ["buy"],
    sell = ["sell"],
    exchange = ["exchange"],
    history = ["history"],
    rewards = ["rewards"],
    settings = ["settings"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];
  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <MM className="metismenu" id="menu">
          <ul>
            <li>
              <Link
                className={`${path === "/" ? "mm-active" : ""}`}
                to="/admin-dashboard"
              >
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "dashboard-dark" ? "mm-active" : ""}`}
                to="/dashboard-dark"
              >
                Dashboard Dark
              </Link>
            </li>
          </ul>
        
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/">
              <div className="d-flex align-items-center">
                <HomeIcon style={{ minWidth: "30px" }}  />
                <div className="nav-text">Dashboard</div>
              </div>
            </Link>
          </li>

          <li className={`${buy.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/buy">
              <div className="d-flex align-items-center">
                <FaCoins style={{ minWidth: "30px" }} />
                <div className="nav-text">Buy</div>
              </div>
            </Link>
          </li>

          <li className={`${sell.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/sell">
              <div className="d-flex align-items-center">
                <Money color="white" style={{ minWidth: "30px" }} />
                <div className="nav-text">Sell</div>
              </div>
            </Link>
          </li>

          <li className={`${deposit.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/deposit">
              <div className="d-flex align-items-center">
                <AttachMoney color={"#FFFFFF"} style={{ minWidth: "30px" }} />
                <div className="nav-text">Deposit</div>
              </div>
            </Link>
          </li>
          <li className={`${withdrawl.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/withdrawl">
              <div className="d-flex align-items-center">
                <Payments style={{ minWidth: "30px" }} />
                <div className="nav-text">Withdrawal</div>
              </div>
            </Link>
          </li>
          <li className={`${exchange.includes(path) ? "mm-active" : ""}`}>
            <Link to="/exchange" className="ai-icon">
              <div className="d-flex align-items-center">
                <CurrencyExchange
                  color={"secondary"}
                  style={{ minWidth: "30px" }}
                />
                <div className="nav-text">Exchange</div>
              </div>
            </Link>
          </li>
          <li className={`${history.includes(path) ? "mm-active" : ""}`}>
            <Link to="/history" className="ai-icon">
              <div className="d-flex align-items-center">
                <HistoryIcon color={"secondary"} style={{ minWidth: "30px" }} />
                <div className="nav-text">History</div>
              </div>
            </Link>
          </li>
          <li className={`${rewards.includes(path) ? "mm-active" : ""}`}>
            <Link to="/rewards" className="ai-icon">
              <div className="d-flex align-items-center">
                <EmojiEventsTwoToneIcon
                  color={"secondary"}
                  style={{ minWidth: "30px" }}
                />
                <div className="nav-text">Rewards</div>
              </div>
            </Link>
          </li>
        </MM>
        <div className="plus-box">
          <div className="text-center"></div>
        </div>
        <div className="copyright">
          <div>GSC Dashboard </div>
          <div>© {new Date().getFullYear()} All Rights Reserved</div>
          <p className="fs-12">
            <span className="heart" style={{ display: "none" }}></span>
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;

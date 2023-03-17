/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import { Home, LocalAtm, Paid, Settings } from "@mui/icons-material";
// import watchListIcon from "../../../icons/sidebar/watchlist.png";

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

const AdminSideBar = () => {
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
  let deshBoard = ["dashboard"],
    withdrawalRequests = ["withdrawal-requests"],
    buyRequests = ["buy-requests"],
    sellRequests = ["sell-requests"],
    rewardRequests = ["rewards"],
    depositRequests = ["deposit-requests"],
    deposit = ["deposit"],
    userManagement = ["user-management"],
    commissionSettings = ["commission-settings"],
    plManagement = ["pl-management"],
    manageCoins = ["manage-coins"],
    portfolio = ["portfolio"],
    shop = ["ecom-product-detail"],
    pages = ["page-register"];

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
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon " to="admin-dashboard">
              {/* <i className="fas fa-home"></i> */}
              <Home />
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          {/* <ul>
          
          </ul> */}
          {/* <li className={`${userManagement.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon " to="/user-management">
              <i className="fas fa-users"></i>
              <span className="nav-text">User Managment</span>
            </Link>
          </li>
          <ul>
          
          </ul> */}

          {/* <li className={`${manageCoins.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon " to="/manage-coins">
              <i class="fas fa-coins"></i>
              <span className="nav-text">Manage Coins</span>
            </Link>
          </li>
          <ul>
          
            <li className={`${shop.includes(path) ? "mm-active" : ""}`}>
            
              <ul className={`${shop.includes(path) ? "mm-show" : ""}`}>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-grid" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-grid"
                  >
                    Product Grid
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-list" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-list"
                  >
                    Product List
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-detail" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-detail"
                  >
                    Product Details
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-order" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-order"
                  >
                    Order
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${path === "ecom-checkout" ? "mm-active" : ""}`}
                    to="/ecom-checkout"
                  >
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${path === "ecom-invoice" ? "mm-active" : ""}`}
                    to="/ecom-invoice"
                  >
                    Invoice
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-customers" ? "mm-active" : ""
                    }`}
                    to="/ecom-customers"
                  >
                    Customers
                  </Link>
                </li>
              </ul>
            </li>
          </ul> */}

          {/* <li
            className={`${depositRequests.includes(path) ? "mm-active" : ""}`}
          >
            <Link className="ai-icon " to="/deposit-requests">
              <Paid />
              <span className="nav-text">Deposit Requests</span>
            </Link>
          </li> */}

          {/* </li> */}

          {/* li for Watchlist */}
          {/* <li
            className={`${
              withdrawalRequests.includes(path) ? "mm-active" : ""
            }`}
          >
            <Link className="ai-icon" to="/withdrawal-requests">
              <LocalAtm />
              <span className="nav-text">Withdrawal Requests</span>
            </Link>
          </li> */}
          <li className={`${buyRequests.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/buy-requests">
              {/* <i className="fas fa-dollar-sign"></i> */}
              <LocalAtm />
              <span className="nav-text">Buy Requests</span>
            </Link>
          </li>
          <li className={`${sellRequests.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/sell-requests">
              {/* <i className="fas fa-dollar-sign"></i> */}
              <LocalAtm />
              <span className="nav-text">Sell Requests</span>
            </Link>
          </li>
          <li className={`${rewardRequests.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon" to="/rewards">
              {/* <i className="fas fa-dollar-sign"></i> */}
              <LocalAtm />
              <span className="nav-text">Rewards</span>
            </Link>
          </li>
          {/* <li className={`${plManagement.includes(path) ? "mm-active" : ""}`}>
            <Link to="pl-management" className="ai-icon ">
              <span className="nav-text">P/L Management</span>
            </Link>
          </li> */}
          <li
            className={`${
              commissionSettings.includes(path) ? "mm-active" : ""
            }`}
          >
            <Link className="ai-icon " to="/commission-settings">
              <Settings />
              <span className="nav-text">Settings</span>
            </Link>
          </li>
        </MM>
        <div className="plus-box">
          <div className="text-center">
            {/* <h4 className="fs-18 font-w600 mb-3">
              Enable Workload Automation System
            </h4> */}
          </div>
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

export default AdminSideBar;

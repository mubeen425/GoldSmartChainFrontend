import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Image
import profile from "../../../images/user.jpg";
import avatar from "../../../images/avatar/1.jpg";
import { Dropdown } from "react-bootstrap";
import LogoutPage from "./Logout";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ onNote }) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store?.userReducer);

  const [searchBut, setSearchBut] = useState(false);
  const [user, setUser] = useState(null);
  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;

  useEffect(async () => {
    const usr = await localStorage.getItem("user");
    setUser(JSON.parse(usr));
  }, []);

  var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
    ? filterName.filter((f) => f !== "ui")
    : filterName.includes("uc")
    ? filterName.filter((f) => f !== "uc")
    : filterName.includes("basic")
    ? filterName.filter((f) => f !== "basic")
    : filterName.includes("jquery")
    ? filterName.filter((f) => f !== "jquery")
    : filterName.includes("table")
    ? filterName.filter((f) => f !== "table")
    : filterName.includes("page")
    ? filterName.filter((f) => f !== "page")
    : filterName.includes("email")
    ? filterName.filter((f) => f !== "email")
    : filterName.includes("ecom")
    ? filterName.filter((f) => f !== "ecom")
    : filterName.includes("chart")
    ? filterName.filter((f) => f !== "chart")
    : filterName.includes("editor")
    ? filterName.filter((f) => f !== "editor")
    : filterName;
  return (
    <div className="header border-bottom">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left"></div>
            <div className="header-mid"></div>
            <ul className="navbar-nav header-right w-90">
              <li className="nav-item d-flex align-items-center"></li>
              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link i-false c-pointer"
                  role="button"
                  data-toggle="dropdown"
                >
                  <Avatar
                    src={userReducer.currentUser?.user_name}
                    alt={userReducer.currentUser?.user_name}
                  />
                  <div className="header-info ms-3">
                    <span className="fs-18 font-w500 mb-2">
                      {userReducer?.currentUser?.user_name}
                    </span>
                    <small className="fs-12 font-w400">
                      {userReducer.currentUser?.email}
                    </small>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="right"
                  className="mt-3  mt-lg-0 dropdown-menu dropdown-menu-end"
                >
                  <Link to="/profile" className="dropdown-item ai-icon">
                    <svg
                      id="icon-user1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary me-1"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    <span className="ms-2">Profile</span>
                  </Link>
                  <LogoutPage />
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;

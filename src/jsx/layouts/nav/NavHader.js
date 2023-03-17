import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
// import logo from "../../../images/logo-full.png";
// import logo from "../../../images/logo.jpeg";
import logo from "../../../images/logo2.png";
import logo2 from "../../../images/faviconcopy.png";

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } =
    useContext(ThemeContext);
  return (
    <div className="nav-header">
      <Link to="/" className="brand-logo">
        <Fragment>
          {!toggle ? (
            <>
              <img
                src={logo}
                className="logo-abbr center m-auto display_class"
                style={{ maxWidth: "10rem" }}
              />
              <img
                src={logo2}
                className="logo-abbr center m-auto hide_class"
                style={{ maxWidth: "4rem" }}
              />
            </>
          ) : (
            <img
              src={logo2}
              className="logo-abbr center m-auto"
              style={{ maxWidth: "4rem" }}
            ></img>
          )}
        </Fragment>
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PageTitle = ({ motherMenu, activeMenu, pageContent }) => {
  const store = useSelector((store) => store.userReducer);
  let path = "/" + window.location.pathname.split("/");

  return (
    <div className="row page-titles mx-0">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active">
          <Link to={store.currentUser.is_admin ? `/admin-dashboard` : `/`}>
            {motherMenu}
          </Link>
        </li>
        <li className="breadcrumb-item">{activeMenu}</li>
      </ol>
    </div>
  );
};

export default PageTitle;

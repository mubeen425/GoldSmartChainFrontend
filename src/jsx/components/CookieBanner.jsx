import React, { useState } from "react";
import Cookies from "universal-cookie";
import styles from "../../css/CookieBanner.module.css";

const cookies = new Cookies();

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(!cookies.get("cookieConsent"));

  const handleConsent = () => {
    cookies.set("cookieConsent", true);
    setShowBanner(false);
  };

  return (
    <div
      className={`${styles["cookie-banner"]} ${
        showBanner ? styles.visible : ""
      }`}
      style={{ display: showBanner ? "flex" : "none" }}
    >
      <span className="class_tab">
        Your reflink has been saved in a cookie, which helps us to keep you logged
        in and provide you with a better user experience.
      </span>
      <div onClick={handleConsent} className="button_style">
        Ok
      </div>
    </div>
  );
}

export default CookieBanner;

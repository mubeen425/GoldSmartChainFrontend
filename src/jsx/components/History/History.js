import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import TransactionHistory from "../AppsMenu/AppProfile/TransactionHistory";
import WitdrawlByCryptoHistory from "../AppsMenu/AppProfile/WitdrawlByCryptoHistory";
import SolidCoinHistory from "../AppsMenu/AppProfile/SolidCoinHistory";
import ExchangeCoinHistory from "../AppsMenu/AppProfile/ExchangeCoinHistory";
import DepositeByCryptoHistory from "../AppsMenu/AppProfile/DepositeByCryptoHistory";

const History = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [active, setActive] = useState("WBCTH");
  return (
    <div className="row">
      <Tabs
        defaultActiveKey="WBCTH"
        id="justify-tab-example"
        className="mb-3 main_tab_class"
        justify
        onSelect={(e) => setActive(e)}
        active={active}
        // variant="pills"
      >
        {/* <Tab
          eventKey="TH"
          title="Transaction History"
          tabClassName={active === "TH" ? "tabs_color" : "tab_styles"}
        >
          <div className="col-xl-12 col-md-12">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 ">
                <TransactionHistory />
              </div>
            </div>
          </div>
        </Tab> */}
        <Tab
          eventKey="WBCTH"
          title="Withdrawal By Crypto History"
          tabClassName={active === "WBCTH" ? "tabs_color" : "tab_styles"}
        >
          <div className="col-xl-12 col-md-12">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 ">
                <WitdrawlByCryptoHistory />
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="DCTH"
          title="Deposit By Crypto History"
          tabClassName={active === "DCTH" ? "tabs_color" : "tab_styles"}
        >
          <div className="col-xl-12 col-md-12">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 ">
                <DepositeByCryptoHistory />
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="SCTH"
          title="Buy & Sell History"
          tabClassName={active === "SCTH" ? "tabs_color" : "tab_styles"}
        >
          <div className="col-xl-12 col-md-12">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 ">
                <SolidCoinHistory />
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="EH"
          title="Exchange History"
          tabClassName={active === "EH" ? "tabs_color" : "tab_styles"}
        >
          <div className="col-xl-12 col-md-12">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 ">
                <ExchangeCoinHistory />
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default History;

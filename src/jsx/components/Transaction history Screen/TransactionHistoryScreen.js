import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
// import icon from "../../../icons/coins/";
import { Button, Dropdown } from "react-bootstrap";
import { baseURL, tradeAPI, tradeHistoryAPI } from "../../../Strings/Strings";
import moment from "moment";
import TransactionHistory from "../AppsMenu/AppProfile/TransactionHistory";

const sort = 10;
let perArr = [];
function TransactionHistoryScreen(props) {
  const [historyData, setHistoryData] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  let usr = localStorage.getItem("user");
  usr = JSON.parse(usr);

  const activePag = useRef(0);
  const chageData = (frist, sec) => {
    for (var i = 0; i < historyData?.length; ++i) {
      if (i >= frist && i < sec) {
        historyData[i]?.classList?.remove("d-none");
      } else {
        historyData[i]?.classList?.add("d-none");
      }
    }
  };

  activePag.current === 0 && chageData(0, sort);
  let paggination = Array(Math.ceil(historyData?.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const onClick = (i) => {
    activePag.current = i;
    setStart(activePag.current * sort);
    setEnd((activePag.current + 1) * sort);
  };

  return (
    <>
      <PageTitle activeMenu="Transcation History" motherMenu="Home" />

      <TransactionHistory />
    </>
  );
}

export default TransactionHistoryScreen;

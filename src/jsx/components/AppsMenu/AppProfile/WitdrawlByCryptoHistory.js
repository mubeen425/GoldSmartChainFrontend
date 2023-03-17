import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Badge, Card, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import sortArray from "../../../../utils/sort";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserWithdraw,
  getUserDeposits,
  witdrawlByCryptoH,
  depositeByCrypto,
} from "../../../../Redux/coins";
import TabelComponent from "../../../layouts/TabelComponent";
import { valueFormatter } from "../../../../services/valueFormatter";

const cookies = new Cookies();

function WitdrawlByCryptoHistory() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [fullData, setfullData] = useState([]);
  const [order, setorder] = useState("ASC");

  useEffect(() => {
    dispatch(witdrawlByCryptoH(store?.userReducer?.currentUser?.id));
    dispatch(depositeByCrypto(store?.userReducer?.currentUser?.id));
  }, []);
  useEffect(() => {
    setfullData(store?.coinReducer?.witdrawlByCryptoH);
  }, [store?.coinReducer?.witdrawlByCryptoH]);

  // const sortDATA = (arr, elem, type, order) => {
  //   setfullData(sortArray(arr, elem, type, order));
  //   order == "ASC" ? setorder("DESC") : setorder("ASC");
  // };
  const renderTable = () => {
    return [
      {
        title: "S.No",
        render: (rowData) => {
          return <span>{rowData?.count}</span>;
        },
      },
      {
        title: "Time",
        render: (rowData) => {
          return (
            <span>
              {rowData?.status == "Pending"
                ? moment(rowData?.requested_at).format("YYYY-MM-DD hh:mm a")
                : moment(rowData?.requested_at).format("YYYY-MM-DD hh:mm a")}
            </span>
          );
        },
      },
      {
        title: "Wallet Address",
        render: (rowData) => {
          return <span>{rowData?.wallet_address}</span>;
        },
      },
      {
        title: "Currency",
        render: (rowData) => {
          return (
            <span className="text-capitalize">
              {rowData?.token_name?.toUpperCase()}
            </span>
          );
        },
      },
      {
        title: "Amount",
        render: (rowData) => {
          return (
            <span>
              <CurrencyFormat
                value={valueFormatter(rowData?.amount)}
                displayType={"text"}
                // decimalSeparator={true}
                // decimalScale={2}
                thousandSeparator={true}
                // prefix={"$"}
                fixedDecimalScale={true}
                renderText={(value) => <span>{value} </span>}
              />
            </span>
          );
        },
      },
    ];
  };

  return (
    <div>
      <Col lg={12}>
        <TabelComponent
          cols={renderTable()}
          data={fullData?.map((obj, index) => {
            return {
              ...obj,
              count: index + 1,
            };
          })}
          tabeltitle={"Withdrawal By Crypto History"}
          itemsPerPage={8}
        />
      </Col>
    </div>
  );
}

export default WitdrawlByCryptoHistory;

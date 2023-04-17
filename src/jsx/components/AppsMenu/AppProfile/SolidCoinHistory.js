import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Badge, Card, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import sortArray from "../../../../utils/sort";
import { useDispatch, useSelector } from "react-redux";
import { solidCoinTH } from "../../../../Redux/coins";
import TabelComponent from "../../../layouts/TabelComponent";
import { valueFormatter } from "../../../../services/valueFormatter";
import { symbol } from "../../../../utils/message";

const cookies = new Cookies();

function SolidCoinHistory() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [fullData, setfullData] = useState([]);
  const [order, setorder] = useState("ASC");

  useEffect(() => {
    dispatch(solidCoinTH(store?.userReducer?.currentUser?.id));
  }, []);
  useEffect(() => {
    let combineData = store?.coinReducer;
    setfullData([...combineData?.solidCoinTH]);
  }, [store?.coinReducer?.solidCoinTH]);

  // const sortDATA = (arr, elem, type, order) => {
  //   setfullData(sortArray(arr, elem, type, order));
  //   order == "ASC" ? setorder("DESC") : setorder("ASC");
  // };
  const renderTable = () => {
    return [
      {
        title: "S.No",
        render: (rowData) => {
          return <span>{rowData.count}</span>;
        },
      },
      {
        title: "Time",
        render: (rowData) => {
          return (
            <span>
              {moment(rowData?.updatedAt).format("YYYY-MM-DD hh:mm a")}
            </span>
          );
        },
      },
      {
        title: "Status",
        render: (rowData) => {
          return (
            <span>
              <Badge
                variant={`${
                  rowData.status === "canceled"
                    ? "danger light"
                    : rowData.status === "accepted"
                    ? "success light"
                    : "warning light"
                }`}
                style={{ width: 80 }}
              >
                {rowData?.status?.slice(0, 1)?.toUpperCase() +
                  rowData.status?.slice(1)}
              </Badge>
            </span>
          );
        },
      },
      {
        title: "Type",
        render: (rowData) => {
          return <span>{rowData?.type?.toUpperCase()}</span>;
        },
      },
      {
        title: "SOLID Amount",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={
                rowData?.solid_coin ? valueFormatter(rowData?.solid_coin) : 0
              }
              displayType={"text"}
              // decimalScale={2}
              thousandSeparator={true}
              // prefix={"$"}
              fixedDecimalScale={true}
              renderText={(value) => <span>{value} </span>}
            />
          );
        },
      },
      {
        title: "Payment",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={
                rowData.type === "Sell"
                  ? rowData?.invest_amount - rowData?.invest_amount * 0.18
                  : rowData?.invest_amount
                // rowData?.solid_coin ? valueFormatter(rowData?.solid_coin) : 0
              }
              displayType={"text"}
              // decimalScale={2}
              thousandSeparator={true}
              prefix={symbol[rowData?.currecytype] + " "}
              fixedDecimalScale={true}
              renderText={(value) => <span>{value} </span>}
            />
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
          data={fullData}
          tabeltitle={"Buy & Sell History"}
          itemsPerPage={8}
        />
      </Col>
    </div>
  );
}

export default SolidCoinHistory;

import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Badge, Card, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import sortArray from "../../../../utils/sort";
import { useDispatch, useSelector } from "react-redux";
import { exchangeCoinTH } from "../../../../Redux/coins";
import TabelComponent from "../../../layouts/TabelComponent";
import { valueFormatter } from "../../../../services/valueFormatter";

const cookies = new Cookies();

function ExchangeCoinHistory() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [fullData, setfullData] = useState([]);
  const [order, setorder] = useState("ASC");

  useEffect(() => {
    dispatch(exchangeCoinTH(store?.userReducer?.currentUser?.id));
  }, []);
  useEffect(() => {
    setfullData(store?.coinReducer?.exchangeCoinTH);
  }, [store?.coinReducer?.exchangeCoinTH]);

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
              {moment(rowData?.updatedAt).format("YYYY-MM-DD hh:mm a")}
            </span>
          );
        },
      },
      {
        title: "From",
        render: (rowData) => {
          return <span >{rowData?.from.toUpperCase()}</span>;
        },
      },
      {
        title: "To",
        render: (rowData) => {
          return <span >{rowData?.to.toUpperCase()}</span>;
        },
      },
      {
        title: "SOLID Amount",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={valueFormatter(rowData?.solid)}
              displayType={"text"}
              // decimalScale={2}
              thousandSeparator={true}
              fixedDecimalScale={true}
              renderText={(value) => <span>{value} </span>}
            />
          );
        },
      },
      {
        title: "STAND Amount",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={valueFormatter(rowData?.stand)}
              displayType={"text"}
              // decimalScale={2}
              thousandSeparator={true}
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
          tabeltitle={"Exchange History"}
          itemsPerPage={8}
        />
      </Col>
    </div>
  );
}

export default ExchangeCoinHistory;

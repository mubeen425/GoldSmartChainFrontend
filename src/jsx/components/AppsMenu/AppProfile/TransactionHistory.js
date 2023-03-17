import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Badge, Card, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import sortArray from "../../../../utils/sort";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithdraw, getUserDeposits } from "../../../../Redux/coins";
import TabelComponent from "../../../layouts/TabelComponent";

const cookies = new Cookies();

function TransactionHistory() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [fullData, setfullData] = useState([]);
  const [order, setorder] = useState("ASC");

  useEffect(() => {
    dispatch(getUserWithdraw(store?.userReducer?.currentUser?.id));
    dispatch(getUserDeposits(store?.userReducer?.currentUser?.id));
  }, []);
  useEffect(() => {
    let combineData = store?.coinReducer;
    setfullData([...combineData?.userWithDraw, ...combineData?.userDeposite]);
  }, [store?.coinReducer?.userWithDraw, store?.coinReducer?.userDeposite]);

  // const sortDATA = (arr, elem, type, order) => {
  //   setfullData(sortArray(arr, elem, type, order));
  //   order == "ASC" ? setorder("DESC") : setorder("ASC");
  // };
  const renderTable = () => {
    return [
      {
        title: "S.No",
        render: (rowData) => {
          return <span>{rowData.id}</span>;
        },
      },
      {
        title: "Time",
        render: (rowData) => {
          return (
            <span>
              {
                moment(rowData?.requested_at).format("YYYY-MM-DD hh:mm a")
              }
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
                    : rowData.status === "approved"
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
          return <span>{rowData?.type.toUpperCase()}</span>;
        },
      },
      {
        title: "Amount",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={
                rowData?.type === "Withdraw"
                  ? rowData?.amount * 0.83
                  : rowData?.amount
              }
              displayType={"text"}
              decimalScale={2}
              thousandSeparator={true}
              prefix={"$"}
              fixedDecimalScale={true}
              renderText={(value) => <span>{value} </span>}
            />
          );
        },
      },
      // {
      //   title: "DATE",
      //   render: (rowData) => {
      //     return (
      //       <span>
      //         {moment(rowData?.createdAt).format("YYYY-MM-DD hh:mm a")}
      //       </span>
      //     );
      //   },
      // },
      // {
      //   title: "STATUS",
      //   render: (rowData) => {
      //     return (s
      //       <Badge
      //         variant={`${
      //           rowData?.type === "canceled"
      //             ? "danger light"
      //             : rowData?.type === "approved"
      //             ? "success light"
      //             : "warning light"
      //         }`}
      //       >
      //         {rowData?.type.slice(0, 1).toUpperCase() + rowData?.type.slice(1)}
      //       </Badge>
      //     );
      //   },
      // },
    ];
  };
  return (
    <div>
      <Col lg={12}>
        <TabelComponent
          cols={renderTable()}
          data={fullData}
          tabeltitle={"Transaction History"}
          itemsPerPage={8}
        />
      </Col>
    </div>
  );
}

export default TransactionHistory;

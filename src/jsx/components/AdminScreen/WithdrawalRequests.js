import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../services/AxiosInstance";
import moment from "moment";
import { Badge, Button, Col, Dropdown, Modal } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

import { withdrawRequests } from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";
import TabelComponent from "../../layouts/TabelComponent";

function WithdrawalRequests(props) {
  const [modalCentered, setModalCentered] = useState(false);
  const [data, setData] = useState([]);
  const [activeId, setActiveId] = useState(0);
  const [reason, setReason] = useState("");

  const usr = JSON.parse(localStorage.getItem("user"));
  useEffect(async () => {

    if (!usr.is_admin) {
      props.history.push("/");
    }
  }, [usr]);

  useEffect(() => {
    axiosInstance.get(`${withdrawRequests}`).then((res) => {
   
      setData(res.data);
    });
  }, []);

  const getWithdrawRequests = () => {
    axiosInstance.get(`${withdrawRequests}`).then((res) => {
    
      setData(res.data);
    });
  };

  const changeStatus = (id, status) => {
    const postData = {
      // id: id ? id : activeId,
      status: status,
      status_description: reason,
    };
    axiosInstance
      .put(`api/withdraw/${id}`, postData)
      .then((res) => {

        setModalCentered(false);
        getWithdrawRequests();
      })
      .catch((err) => {

      });
  };
  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );
  const withdrawlTablePending = () => {
    return [
      {
        title: "#",
        render: (rowData) => {
          return <span>{rowData.id}</span>;
        },
      },
      {
        title: "USERNAME",
        render: (rowData) => {
          return <span>{rowData.user?.user_name}</span>;
        },
      },
      {
        title: "WITHDRAWL AMOUNT",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={rowData?.amount}
              displayType={"text"}
              decimalScale={2}
              thousandSeparator={true}
              prefix={"$"}
              fixedDecimalScale={true}
              renderText={(value) => <p className="mb-0">{value}</p>}
            />
          );
        },
      },
      {
        title: "NET AMOUNT",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={rowData?.amount * 0.83}
              displayType={"text"}
              decimalScale={2}
              thousandSeparator={true}
              prefix={"$"}
              fixedDecimalScale={true}
              renderText={(value) => <p className="mb-0">{value}</p>}
            />
          );
        },
      },
      {
        title: "TIME",
        render: (rowData) => {
          return (
            <span>
              {rowData?.status == "pending"
                ? moment(rowData?.requested_at).format("YYYY-MM-DD hh:mm a")
                : moment(rowData?.updated_at).format("YYYY-MM-DD hh:mm a")}
            </span>
          );
        },
      },
      {
        title: "STATUS",
        render: (rowData) => {
          return (
            <Badge
              variant={`${
                rowData?.status === "canceled"
                  ? "danger light"
                  : rowData?.status === "approved"
                  ? "success light"
                  : "warning light"
              }`}
            >
              {rowData?.status.slice(0, 1).toUpperCase() +
                rowData?.status.slice(1)}
            </Badge>
          );
        },
      },
      {
        title: "Action",
        render: (rowData) => {
          return (
            <>
              {rowData?.status === "pending" && (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="primary"
                    className="light sharp i-false"
                  >
                    {svg1}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => changeStatus(rowData?.id, "accepted")}
                    >
                      Approve
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setActiveId(rowData?.id);
                        setModalCentered(true);
                      }}
                    >
                      Reject
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {rowData?.status === "Rejected" && rowData?.status_description}
            </>
          );
        },
      },
    ];
  };
  const withdrawlTableApprovedCancel = () => {
    return [
      {
        title: "#",
        render: (rowData) => {
          return <span>{rowData.id}</span>;
        },
      },
      {
        title: "USERNAME",
        render: (rowData) => {
          return <span>{rowData.user?.user_name}</span>;
        },
      },
      {
        title: "WITHDRAWL AMOUNT",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={rowData?.amount}
              displayType={"text"}
              decimalScale={2}
              thousandSeparator={true}
              prefix={"$"}
              fixedDecimalScale={true}
              renderText={(value) => <p className="mb-0">{value}</p>}
            />
          );
        },
      },
      {
        title: "NET AMOUNT",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={rowData?.amount * 0.83}
              displayType={"text"}
              decimalScale={2}
              thousandSeparator={true}
              prefix={"$"}
              fixedDecimalScale={true}
              renderText={(value) => <p className="mb-0">{value}</p>}
            />
          );
        },
      },
      {
        title: "TIME",
        render: (rowData) => {
          return (
            <span>
              {rowData?.status == "pending"
                ? moment(rowData?.requested_at).format("YYYY-MM-DD hh:mm a")
                : moment(rowData?.updated_at).format("YYYY-MM-DD hh:mm a")}
            </span>
          );
        },
      },
      {
        title: "STATUS",
        render: (rowData) => {
          return (
            <Badge
              variant={`${
                rowData.status === "canceled"
                  ? "danger light"
                  : rowData.status === "accepted"
                  ? "primary light"
                  : "warning light"
              }`}
            >
              {rowData?.status}
            </Badge>
          );
        },
      },
    ];
  };
  return (
    <div>
      <PageTitle motherMenu="Admin" activeMenu="Withdrawal Request" />
      <Col lg={12}>
        <TabelComponent
          cols={withdrawlTablePending()}
          data={data
            .filter((d) => d.status === "pending")
            .map((obj, index) => {
              return {
                ...obj,
                count: index + 1,
              };
            })}
          tabeltitle={"Withdrawal Request"}
          itemsPerPage={8}
        />
        <TabelComponent
          cols={withdrawlTableApprovedCancel()}
          data={data
            .filter((d) => d.status !== "pending")
            .map((obj, index) => {
              return {
                ...obj,
                count: index + 1,
              };
            })}
          tabeltitle={"Withdrawal Request"}
          itemsPerPage={8}
        />
      </Col>
      <Modal className="fade" show={modalCentered} centered>
        <Modal.Header>
          <Modal.Title className="w-100">
            <h2 className="text-center w-100">Reason</h2>
          </Modal.Title>
          <Button
            onClick={() => setModalCentered(false)}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Reject Reason</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => {
                setReason(e.target.value);
              }}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setModalCentered(false)}
            variant="danger light"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => changeStatus(activeId, "canceled")}
          >
            Reject Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WithdrawalRequests;

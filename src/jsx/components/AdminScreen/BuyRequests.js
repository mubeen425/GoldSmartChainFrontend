import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../services/AxiosInstance";
import moment from "moment";
import { Badge, Button, Col, Dropdown, Modal } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { withdrawRequests } from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";
import TabelComponent from "../../layouts/TabelComponent";
import { valueFormatter } from "../../../services/valueFormatter";
import { errorMessage, symbol } from "../../../utils/message";

function BuyRequests(props) {
  const [modalCentered, setModalCentered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingId, setLoadingId] = useState();
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
    axiosInstance.get(`api/solidhistory/getall`).then((res) => {
      setData(res.data.filter((d) => d.type === "Buy"));
    });
  }, []);

  const getBuyRequests = () => {
    axiosInstance.get(`api/solidhistory/getall`).then((res) => {
      setData(res.data.filter((d) => d.type === "Buy"));
    });
  };

  const changeStatus = (data, status) => {
    setLoadingId(data.id);
    setIsLoading(true);
    const postData = {
      status: status,
      invest_amount: data.invest_amount,
      solid_coin: data.solid_coin,
      user_id: data.user_id,
    };
    axiosInstance
      .put(`api/solidcoin/buyUpdate/${data.id}`, postData)
      .then((res) => {
        setModalCentered(false);
        getBuyRequests();
        setIsLoading(false);
      })
      .catch((err) => {
        errorMessage(err.response.data || err.message);
        setIsLoading(false);
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
  const buyTablePending = () => {
    return [
      {
        title: "#",
        render: (rowData) => {
          return <span>{rowData?.count}</span>;
        },
      },
      {
        title: "USERNAME",
        render: (rowData) => {
          return <span>{rowData.user?.user_name}</span>;
        },
      },
      {
        title: "SOLID",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={valueFormatter(rowData?.solid_coin)}
              displayType={"text"}
              // decimalScale={2}
              thousandSeparator={true}
              // prefix={"$"}
              fixedDecimalScale={true}
              renderText={(value) => <span className="mb-0">{value}</span>}
            />
          );
        },
      },
      {
        title: "AMOUNT",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={valueFormatter(rowData?.invest_amount)}
              displayType={"text"}
              // decimalScale={2}
              thousandSeparator={true}
              prefix={symbol[rowData?.currecytype]}
              fixedDecimalScale={true}
              renderText={(value) => <span className="mb-0">{value}</span>}
            />
          );
        },
      },
      // {
      //   title: "NET AMOUNT",
      //   render: (rowData) => {
      //     return (
      //       <CurrencyFormat
      //         value={rowData?.invest_amount * 0.82}
      //         displayType={"text"}
      //         decimalScale={2}
      //         thousandSeparator={true}
      //         prefix={"$"}
      //         fixedDecimalScale={true}
      //         renderText={(value) => <p className="mb-0">{value}</p>}
      //       />
      //     );
      //   },
      // },
      {
        title: "TIME",
        render: (rowData) => {
          return (
            <span>
              {moment(rowData?.createdAt).format("YYYY-MM-DD hh:mm a")}
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
              {isLoading && rowData.id === loadingId ? (
                <span>
                  <RotatingLines
                    strokeColor="#3eacff"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="30"
                    visible={true}
                  />
                </span>
              ) : (
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
                          onClick={() => changeStatus(rowData, "accepted")}
                        >
                          Approve
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setActiveId(rowData);
                            setModalCentered(true);
                          }}
                        >
                          Reject
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                  {rowData?.status === "Rejected" &&
                    rowData?.status_description}
                </>
              )}
            </>
          );
        },
      },
    ];
  };
  const buyTableApprovedCancel = () => {
    return [
      {
        title: "#",
        render: (rowData) => {
          return <span>{rowData.count}</span>;
        },
      },
      {
        title: "USERNAME",
        render: (rowData) => {
          return <span>{rowData.user?.user_name}</span>;
        },
      },
      {
        title: "SOLID",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={valueFormatter(rowData?.solid_coin)}
              displayType={"text"}
              // decimalScale={2}
              thousandSeparator={true}
              // prefix={"$"}
              fixedDecimalScale={true}
              renderText={(value) => <span className="mb-0">{value}</span>}
            />
          );
        },
      },
      {
        title: "AMOUNT",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={valueFormatter(rowData?.invest_amount)}
              displayType={"text"}
              // decimalScale={2}
              thousandSeparator={true}
              prefix={symbol[rowData?.currecytype]}
              fixedDecimalScale={true}
              renderText={(value) => <span className="mb-0">{value}</span>}
            />
          );
        },
      },
      // {
      //   title: "NET AMOUNT",
      //   render: (rowData) => {
      //     return (
      //       <CurrencyFormat
      //         value={rowData?.invest_amount * 0.82}
      //         displayType={"text"}
      //         decimalScale={2}
      //         thousandSeparator={true}
      //         prefix={"$"}
      //         fixedDecimalScale={true}
      //         renderText={(value) => <p className="mb-0">{value}</p>}
      //       />
      //     );
      //   },
      // },
      {
        title: "TIME",
        render: (rowData) => {
          return (
            <span>
              {moment(rowData?.createdAt).format("YYYY-MM-DD hh:mm a")}
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
                  : rowData?.status === "accepted"
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
    ];
  };
  return (
    <div>
      <PageTitle motherMenu="Admin" activeMenu="Buy Request" />
      <Col lg={12}>
        <TabelComponent
          cols={buyTablePending()}
          data={data
            .filter((d) => d.status === "pending")
            .map((obj, index) => {
              return {
                ...obj,
                count: index + 1,
              };
            })}
          tabeltitle={"Buy Request"}
          itemsPerPage={8}
        />
        <TabelComponent
          cols={buyTableApprovedCancel()}
          data={data
            .filter((d) => d.status !== "pending")
            .map((obj, index) => {
              return {
                ...obj,
                count: index + 1,
              };
            })}
          tabeltitle={"Buy Request"}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default BuyRequests;

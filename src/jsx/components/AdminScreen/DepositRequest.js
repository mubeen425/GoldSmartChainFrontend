import axiosInstance from "../../../services/AxiosInstance";
import Cookies from "universal-cookie";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Col, Dropdown, Modal } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { depositRequests } from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";
import TabelComponent from "../../layouts/TabelComponent";
const cookies = new Cookies();

function DepositRequest(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [modalCentered, setModalCentered] = useState(false);
  const [pendingData, setPendingData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [activeId, setActiveId] = useState(0);
  const [reason, setReason] = useState("");

  const usr = store?.userReducer?.currentUser;
  useEffect(async () => {
    if (!usr.is_admin) {
      props.history.push("/");
    }
  }, [usr]);

  useEffect(() => {
    axiosInstance
      .get(`${depositRequests}`)
      .then((res) => {
        const pendindData = res.data.filter((x) => x.status === "pending");
        const otherData = res.data.filter((x) => x.status !== "pending");

        setPendingData(pendindData);
        setOtherData(otherData);
      })
      .catch((error) => {});
  }, []);

  const getDepositRequests = () => {
    axiosInstance.get(`${depositRequests}`).then((res) => {
      const pendindData = res.data.filter((x) => x.status === "pending");
      const otherData = res.data.filter((x) => x.status !== "pending");
      setPendingData(pendindData);
      setOtherData(otherData);
    });
  };

  const changeStatus = (id, status) => {
    let token = cookies.get("reflink");
    let usr = store?.userReducer?.currentUser;

    const postData = {
      status: status,
      // status_description: reason,
      status_description: "accepted",
    };

    axiosInstance
      .put(`api/deposit/${id}`, postData)
      .then((res) => {
        setModalCentered(false);
        getDepositRequests();
      })
      .catch((err) => {});
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

  const depositeTablePending = () => {
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
        title: "DEPOSIT AMOUNT",
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
                      onClick={() => changeStatus(rowData?.id, "approved")}
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
  const depositeTableApproved = () => {
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
        title: "DEPOSIT AMOUNT",
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
    ];
  };

  return (
    <div>
      <PageTitle motherMenu="Admin" activeMenu="Deposit Request" />
      <Col lg={12}>
        <TabelComponent
          cols={depositeTablePending()}
          data={pendingData.reverse().map((obj, index) => {
            return {
              ...obj,
              count: index + 1,
            };
          })}
          tabeltitle={"Deposit Request"}
          itemsPerPage={8}
        />
        <TabelComponent
          cols={depositeTableApproved()}
          data={otherData.reverse().map((obj, index) => {
            return {
              ...obj,
              count: index + 1,
            };
          })}
          tabeltitle={"Deposit Request"}
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

export default DepositRequest;

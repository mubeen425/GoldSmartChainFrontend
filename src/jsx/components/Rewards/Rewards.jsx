import React, { useState, useRef, useEffect } from "react";
import "../../../css/style-sheet.css";
import { Badge } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../layouts/PageTitle";
import { successMessage, errorMessage } from "../../../utils/message";
import { ToastContainer } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import {
  addReferalCode,
  getUserRewards,
  getUserLevelRewards,
  getAdminDefaultPer,
} from "../../../Redux/user";
import TabelComponent from "../../layouts/TabelComponent";
import moment from "moment";
import { valueFormatter } from "../../../services/valueFormatter";

const Rewards = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const userReducer = useSelector((store) => store.userReducer);
  const [referalCode, setReferalCode] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getUserRewards(userReducer?.currentUser.user_name));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    dispatch(getUserLevelRewards(userReducer?.currentUser?.id));
    dispatch(getAdminDefaultPer());
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    if (referalCode === userReducer?.currentUser?.referal_code) {
      errorMessage("Please enter other's referal code");
      return;
    }
    dispatch(
      addReferalCode({
        user_id: userReducer?.currentUser?.id,
        reference: referalCode,
      })
    );
  };

  const rewardsTable = () => {
    return [
      {
        title: "#",
        render: (rowData) => {
          return <span>{rowData.id}</span>;
        },
      },
      {
        title: "REFERRAL",
        render: (rowData) => {
          return <span>{rowData?.refered_to}</span>;
        },
      },
      {
        title: "LEVEL 1 REWARD",
        render: (rowData) => {
          return (
            <CurrencyFormat
              value={
                rowData?.refer1 === userReducer.currentUser.user_name
                  ? valueFormatter(rowData?.reward1)
                  : 0
              }
              displayType={"text"}
              thousandSeparator={true}
              fixedDecimalScale={true}
              renderText={(value) => <span className="mb-0">{value}</span>}
            />
          );
        },
      },
      {
        title: userReducer.currentUser.level === 2 ? "LEVEL 2 REWARD" : "",
        render:
          userReducer.currentUser.level === 2
            ? (rowData) => {
                return (
                  <CurrencyFormat
                    value={
                      rowData?.refer2 === userReducer.currentUser.user_name
                        ? valueFormatter(rowData?.reward2)
                        : 0
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    fixedDecimalScale={true}
                    renderText={(value) => (
                      <span className="mb-0">{value}</span>
                    )}
                  />
                );
              }
            : () => {},
      },
      {
        title: (
          <div>
            TIME
            <span className="mx-1" style={{ fontSize: "12px" }}>
              (issue at)
            </span>
          </div>
        ),
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
                rowData?.type === "canceled"
                  ? "danger light"
                  : rowData?.type === "approved"
                  ? "success light"
                  : "warning light"
              }`}
            >
              {rowData?.type.slice(0, 1).toUpperCase() + rowData?.type.slice(1)}
            </Badge>
          );
        },
      },
    ];
  };
  console.log(" window.location.origin", window.location.origin);
  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Rewards" />
      <h2 className="text-center">
        Refer & Earn{" "}
        {userReducer?.getUserLevelRewards?.level1_reward
          ? userReducer?.getUserLevelRewards?.level1_reward
          : userReducer?.getAdminDefaultPer?.level1_reward}
        % Commission
      </h2>
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Rewards</h4>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <Overlay target={target.current} show={show} placement="bottom">
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      Coppied !
                    </Tooltip>
                  )}
                </Overlay>

                <div
                  ref={target}
                  className="d-flex align-items-center justify-content-center mt-3"
                  onClick={() => {
                    setShow(true);
                    setTimeout(() => {
                      setShow(false);
                    }, 1000);
                  }}
                >
                  <CopyToClipboard
                    text={
                      // "Goldsmartchain.com/#" +
                      window.location.origin +
                      "/#" +
                      "/page-register/" +
                      userReducer?.currentUser?.referal_code
                    }
                  >
                    <div className="copy_clip">
                      <div className="copy_clip_text">
                        <span className="mx-1">Copy Your referral link :</span>
                        {
                          // "Goldsmartchain.com/#" +
                          window.location.origin +
                            "/#" +
                            "/page-register/" +
                            userReducer?.currentUser?.referal_code
                        }
                      </div>
                      <ContentCopyIcon
                        style={{ marginLeft: "10px", height: "18px" }}
                      />
                    </div>
                  </CopyToClipboard>
                </div>
              </form>
            </div>
          </div>

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
      </div>
      <TabelComponent
        cols={rewardsTable()}
        data={[...userReducer?.getUserRewards]?.map((obj, index) => {
          return {
            ...obj,
            count: index + 1,
          };
        })}
        tabeltitle={"User Rewards"}
        itemsPerPage={8}
      />
    </>
  );
};

export default Rewards;

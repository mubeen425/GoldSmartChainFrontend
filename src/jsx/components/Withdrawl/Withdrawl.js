import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { ToastContainer } from "react-toastify";
import { successMessage, errorMessage } from "../../../utils/message";
import PageTitle from "../../layouts/PageTitle";
import standCoinImage from "../../../images/stand.png";
import solidTokenImage from "../../../images/solid.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  depositeAmount,
  widthDrawByCrypto,
  widthDrawByFait,
  getSolidValue,
  getSolidCoin,
  getUserWallet,
  sellSolidCoin,
  getStandCoin,
} from "../../../Redux/coins";

import { valueFormatter } from "../../../services/valueFormatter";

function Withdrawl(props) {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);
  const coinReducer = useSelector((store) => store.coinReducer);
  const [active, setActive] = useState("ByFiat");
  const [withdraw, setWithdraw] = useState({
    amount: 0,
    address: "",
    coinType: "",
  });
  const [amount, setAmount] = useState(0);

  const handelChange = (e) => {
    setWithdraw({ ...withdraw, [e.target.name]: e.target.value });
  };

  const widthDrawByCrypto2 = async (e) => {
    e.preventDefault();
    if (withdraw.coinType === "solid" && withdraw.amount < 0.0001) {
      errorMessage("❌ Minimum  withdraw amount required 0.0001");
      return;
    }
    if (withdraw.coinType === "stand" && withdraw.amount < 0.1) {
      errorMessage("❌  Minimum  withdraw amount required 0.1)");
      return;
    }
    if (withdraw.address === "") {
      errorMessage("❌ Please add  wallet address");
      return;
    }
    if (withdraw.amount <= 0) {
      errorMessage("❌ Plese enter valid amount");
      return;
    }
    if (withdraw.coinType === "") {
      errorMessage("❌ Plese select a valid coin type");
      return;
    }
    let res = await dispatch(
      widthDrawByCrypto({
        wallet_address: withdraw.address,
        token_name: withdraw.coinType,
        amount: withdraw.amount,
        user_id: userReducer?.currentUser?.id,
      })
    );
    dispatch(getSolidCoin(userReducer?.currentUser?.id));
    dispatch(getStandCoin(userReducer?.currentUser?.id));
    if (res.payload) {
      props.history.push("/");
    }
  };
  const widthDrawByFait2 = async (e) => {
    e.preventDefault();
    if (withdraw.coinType === "stand") {
      let a = coinReducer?.standCoin?.exchange_coin_amount;
      let b = a <= 1 ? 0 : a - 1;
      if (withdraw.amount > b) {
        errorMessage("❌ Please enter valid amount");
      }
    }

    if (amount <= 0) {
      errorMessage("❌ Please enter valid amount");
      return;
    }

    let res = await dispatch(
      widthDrawByFait({
        amount: amount,
        user_id: userReducer?.currentUser?.id,
      })
    );
    if (res.payload) {
      props.history.push("/");
    }
  };

  useEffect(() => {
    if (userReducer?.currentUser) {
      dispatch(getSolidValue(userReducer?.currentUser?.id));
      dispatch(getSolidCoin(userReducer?.currentUser?.id));
      dispatch(getStandCoin(userReducer?.currentUser?.id));
      dispatch(getUserWallet(userReducer?.currentUser?.id));
    }
  }, []);
  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Withdrawal" />
      {/* <Tabs
        defaultActiveKey="ByFiat"
        id="justify-tab-example"
        className="mb-3"
        justify
        onSelect={(e) => setActive(e)}
        active={active}
      > */}
      {/* <Tab
          eventKey="ByFiat"
          title="By Fiat"
          tabClassName={active === "ByFiat" ? "tabs_color" : "tab_styles"}
        > */}
      {/* <div className="d-flex align-items-center justify-content-center">
            <div className="col-xl-8 col-lg-8" style={{ marginTop: "2%" }}>
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Withdrawal</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="d-flex  align-items-center justify-content-center">
                      <label>Enter Amount</label>
                      <div
                        className="input-group mb-3"
                        style={{ marginLeft: "1rem" }}
                      >
                        <span className="input-group-text">$</span>
                        <input
                          value={amount}
                          type="number"
                          className="form-control"
                          onChange={(e) => setAmount(e.target.value)}
                          onWheel={(e) => e.target.blur()}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div style={{ width: "130px" }}>
                        <div>Commission:</div>
                        <div>Total:</div>
                      </div>
                      <div>
                        <div>{parseFloat(amount * 0.17).toFixed(2)}</div>
                        <div>{parseFloat(amount * 0.83).toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="d-flex  justify-content-center">
                      <button
                        className="btn btn-primary mt-5"
                        style={{ width: "120px" }}
                        onClick={(e) => widthDrawByFait2(e)}
                      >
                        Withdraw
                      </button>
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
          </div> */}
      {/* </Tab> */}
      {/* <Tab
          eventKey="ByCrypto"
          title="By Crypto"
          tabClassName={active === "ByCrypto" ? "tabs_color" : "tab_styles"}
        > */}
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8" style={{ marginTop: "2%" }}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Withdrawal</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row flex-column justify-content-center">
                  <div className="d-flex  align-items-center justify-content-center ">
                    <div className="w_50 d-flex  align-items-center">
                      <label style={{ flex: 2 }}>Wallet Address</label>
                      <div style={{ flex: 8 }} className="input-group mb-3">
                        <input
                          style={{ marginLeft: "1rem" }}
                          value={withdraw.address}
                          type="text"
                          name="address"
                          className="form-control"
                          onChange={(e) => handelChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex  align-items-center justify-content-center ">
                    <div className="w_50 d-flex  align-items-center">
                      <label style={{ flex: 2 }}>Amount</label>
                      <div
                        className="input-group mb-3"
                        style={{
                          marginLeft: "1rem",
                          flex: 8,
                          flexWrap: "nowrap",
                          width: "100%",
                        }}
                      >
                        <span className="input-group-text">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant=""
                              id="dropdown-basic"
                              // className="bg-light-blue"
                              style={{ padding: "0px", fontSize: "12px" }}
                            >
                              {withdraw.coinType === "" && "Select Currency"}

                              {withdraw.coinType === "solid" && (
                                <>
                                  <img
                                    src={solidTokenImage}
                                    width="15px"
                                    height="15px"
                                    style={{
                                      objectFit: "contain",
                                      marginRight: "5px",
                                    }}
                                  />
                                  <span style={{ fontSize: "12px" }}>
                                    SOLID
                                  </span>
                                </>
                              )}

                              {withdraw.coinType === "stand" && (
                                <>
                                  <img
                                    src={standCoinImage}
                                    width="15px"
                                    height="15px"
                                    style={{
                                      objectFit: "contain",
                                      marginRight: "5px",
                                    }}
                                  />
                                  <span style={{ fontSize: "12px" }}>
                                    STAND
                                  </span>
                                </>
                              )}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                // href="#/action-2"
                                onClick={(e) =>
                                  setWithdraw({
                                    ...withdraw,
                                    ["coinType"]: "solid",
                                  })
                                }
                              >
                                <img
                                  src={solidTokenImage}
                                  width="15px"
                                  height="15px"
                                  style={{
                                    objectFit: "contain",
                                    marginRight: "5px",
                                  }}
                                />
                                SOLID
                              </Dropdown.Item>
                              <Dropdown.Item
                                // href="#/action-3"
                                onClick={(e) =>
                                  setWithdraw({
                                    ...withdraw,
                                    ["coinType"]: "stand",
                                  })
                                }
                              >
                                <img
                                  src={standCoinImage}
                                  width="15px"
                                  height="15px"
                                  style={{
                                    objectFit: "contain",
                                    marginRight: "5px",
                                  }}
                                />
                                STAND
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </span>
                        <input
                          value={withdraw.amount}
                          type="number"
                          name="amount"
                          style={{ minWidth: "8rem" }}
                          className="form-control"
                          onChange={(e) => handelChange(e)}
                          onWheel={(e) => e.target.blur()}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex  align-items-center justify-content-center">
                    <span>Available :</span>

                    <span className="mx-1">
                      {withdraw.coinType === "solid" &&
                        coinReducer?.solidCoin?.solid_coin}
                      {withdraw.coinType === "stand" &&
                        (coinReducer?.standCoin?.exchange_coin_amount <= 1
                          ? 0
                          : valueFormatter(
                              coinReducer?.standCoin?.exchange_coin_amount - 1
                            ))}
                      {withdraw.coinType === "" && "0.00"}
                    </span>
                    {withdraw.coinType === "solid" && (
                      <>
                        <img
                          src={solidTokenImage}
                          width="15px"
                          height="15px"
                          style={{
                            objectFit: "contain",
                            marginRight: "10px",
                          }}
                        />
                      </>
                    )}

                    {withdraw.coinType === "stand" && (
                      <div>
                        <img
                          src={standCoinImage}
                          width="15px"
                          height="15px"
                          style={{
                            objectFit: "contain",
                            marginRight: "10px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center my-2">
                    <span className="mx-1">Commission : 0.001</span>
                    <img
                      src={standCoinImage}
                      width="15px"
                      height="15px"
                      style={{
                        objectFit: "contain",
                        marginRight: "10px",
                        marginTop: "2px",
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary mt-4"
                      style={{ width: "120px" }}
                      onClick={(e) => widthDrawByCrypto2(e)}
                    >
                      Withdraw
                    </button>
                  </div>
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
      {/* </Tab>
      </Tabs> */}
    </>
  );
}

export default Withdrawl;

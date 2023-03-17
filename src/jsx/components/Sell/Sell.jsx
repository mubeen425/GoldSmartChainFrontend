import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";
import { successMessage, errorMessage } from "../../../utils/message";
import PageTitle from "../../layouts/PageTitle";
import standCoin from "../../../images/stand.png";
import solidToken from "../../../images/solid.png";
import styles from "./Sell.module.scss";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import {
  getSolidValue,
  getSolidCoin,
  getUserWallet,
  sellSolidCoin,
  getStandCoin,
} from "../../../Redux/coins";
import { valueFormatter } from "../../../services/valueFormatter";

const cookies = new Cookies();

function Sell(props) {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store?.userReducer);
  const coinReducer = useSelector((store) => store?.coinReducer);
  const [buyAmount, setBuyAmount] = useState({ usd: 70, solid: 1 });

  const changeAmountUsd = (e) => {
    setBuyAmount({
      ...buyAmount,
      usd: e.target.value,
      solid: e.target.value / coinReducer?.solidValue,
    });
  };
  const changeAmountSolid = (e) => {
    setBuyAmount({
      ...buyAmount,
      solid: e.target.value,
      usd: e.target.value * coinReducer?.solidValue,
    });
  };

  const notifyTopRight = async (e) => {
    e.preventDefault();
    if (userReducer.bankDetails === null) {
      errorMessage("❌ Please add bank details");
      return;
    }
    if (
      coinReducer?.solidCoin?.solid_coin > 0 &&
      buyAmount.solid <= coinReducer?.solidCoin?.solid_coin
    ) {
      if (
        buyAmount.solid >= 0 &&
        buyAmount.usd >= 0 &&
        buyAmount.solid <= 100000 &&
        buyAmount.usd <= 100000
      ) {
        let usr = userReducer?.currentUser;
        const postData = {
          solid_coin: parseFloat(buyAmount.solid),
          invest_amount: buyAmount.usd,
          user_id: usr.id,
        };
        let data = {
          postData,
          id: coinReducer?.solidCoin?.id,
        };
        let response = await dispatch(sellSolidCoin(data));
        if (response.payload?.data) {
          props.history.push("/");
        }
        setBuyAmount({ ...buyAmount, solid: 0 });
      } else {
        errorMessage("❌ Invalid Amount");
      }
      dispatch(getSolidCoin(userReducer?.currentUser?.id));
      dispatch(getStandCoin(userReducer?.currentUser?.id));
    } else {
      errorMessage("❌ insufficient Amount");
    }
  };

  useEffect(() => {
    if (userReducer?.currentUser) {
      dispatch(getSolidValue(userReducer?.currentUser?.id));
      dispatch(getSolidCoin(userReducer?.currentUser?.id));
      dispatch(getUserWallet(userReducer?.currentUser?.id));
    }
  }, []);

  useEffect(() => {
    setBuyAmount({ ...buyAmount, usd: coinReducer?.solidValue });
  }, [coinReducer?.solidValue]);

  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Sell" />
      {/* <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8">
          <div className="card">
            <div className="card-header justify-content-around">
              <h4 className="card-title">International Users</h4>
              <h4 className="card-title">Non EU Users</h4>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => notifyTopRight(e)}>
                <div className="d-flex  align-items-center justify-content-around">
                  <div>
                    <div>STANDARD IN GOLD E.U.</div>
                    <div>BIC/SWIFT-Code : TRWIBEB1XXX</div>
                    <div>IBAN : BE36  9675 1862 2081</div>
                  </div>
                  <div>
                    <div>STANDARD IN GOLD E.U.</div>
                    <div>BIC: TRWIBEB1XXX</div>
                    <div>IBAN: BE36 9675 1862 2081</div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8" style={{ marginTop: "0%" }}>
          <div className="card align-items-center justify-content-center">
            <div className="card-header ">
              <h4 className="card-title ">Sell SOLID</h4>
            </div>

            <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4">
              <div className="d-flex justify-content-between">
                <span>Sell</span>
                <span className="d-flex">
                  <span className="mx-1">Available:</span>
                  {coinReducer?.solidCoin?.solid_coin > 0 ? (
                    <CurrencyFormat
                      // value={coin?.solid_coin}
                      value={coinReducer?.solidCoin?.solid_coin}
                      displayType={"text"}
                      // decimalScale={2}
                      thousandSeparator={true}
                      // prefix={"$"}
                      fixedDecimalScale={true}
                      renderText={(value) => <span>{value}</span>}
                    />
                  ) : (
                    "0.00"
                  )}
                </span>
              </div>

              <div className="d-flex justify-content-between">
                <input
                  type="number"
                  placeholder="0"
                  className="border-0 w-100"
                  value={buyAmount.solid}
                  onChange={(e) => changeAmountSolid(e)}
                  onWheel={(e) => e.target.blur()}
                />
                <div className={styles["tokenDiv"]}>
                  <img
                    src={solidToken}
                    className="mx-1"
                    width="36px"
                    height="36px"
                    style={{ objectFit: "contain" }}
                  />
                  <span>SOLID</span>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4">
              <div className="d-flex justify-content-between">
                <span>Receive</span>
                {/* <p className="d-flex">
                  <p className="mx-1">Available:</p>
                  {coinReducer?.amount?.balance > 0 ? (
                    <CurrencyFormat
                      value={valueFormatter(coinReducer?.amount?.balance)}
                      displayType={"text"}
                      // decimalScale={2}
                      thousandSeparator={true}
                      prefix={"$"}
                      fixedDecimalScale={true}
                      renderText={(value) => <p>{value}</p>}
                    />
                  ) : (
                    "0.00"
                  )}
                </p> */}
              </div>

              <div className="d-flex justify-content-between">
                <input
                  type="number"
                  placeholder="1000"
                  className="border-0 w-100"
                  value={buyAmount.usd}
                  onChange={(e) => changeAmountUsd(e)}
                  onWheel={(e) => e.target.blur()}
                />
                <div className={styles["tokenDiv"]}>
                  <span>$USD</span>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 m-auto  d-flex justify-content-between">
              <span>Price</span>
              <span className="d-flex">
                <span className="mx-1">1 SOLID =</span>
                <CurrencyFormat
                  value={coinReducer?.solidValue}
                  displayType={"text"}
                  decimalScale={2}
                  thousandSeparator={true}
                  prefix={"$"}
                  fixedDecimalScale={true}
                  renderText={(value) => <span>{value}</span>}
                />
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-primary my-4 text-center"
              style={{ width: "120px" }}
              onClick={notifyTopRight}
            >
              Continue
            </button>
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
    </>
  );
}

export default Sell;

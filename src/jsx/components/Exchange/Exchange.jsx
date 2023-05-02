import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import standCoinImage from "../../../images/stand.png";
import solidTokenImage from "../../../images/solid.png";
import styles from "./Exchange.module.scss";
import { ImportExport } from "@mui/icons-material";
import CurrencyFormat from "react-currency-format";
import axiosInstance from "./../../../services/AxiosInstance";
import { successMessage, errorMessage } from "../../../utils/message";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import {
  solidToStandExchangeRate,
  getSolidCoin,
  getStandCoin,
  solidToStandExchange,
  standToSolid,
  getPlatformFeeSolidToken,
} from "../../../Redux/coins";
import { valueFormatter } from "../../../services/valueFormatter";

function Exchange(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.coinReducer);

  const userReducer = useSelector((store) => store.userReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [exchange, setExchange] = useState([
    {
      type: "SOLID",
      available: "",
      value: "",
      image: solidTokenImage,
    },
    {
      type: "STAND",
      available: "",
      value: "",
      image: standCoinImage,
      commission: "0.001",
    },
  ]);
  const [solidToStand, setSolidToStand] = useState(true);

  const changeFields = () => {
    setSolidToStand(!solidToStand);
    let array = [...exchange];
    setExchange(array.reverse());
  };

  const geyValues = async (e) => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://hopeful-lederberg.185-178-192-38.plesk.page/api/exchangecoin/w/solidtostand/${1}`
    );
    setIsLoading(false);
    return { e, data };
  };
  const handelChange = async (e, index) => {
    let array = [...exchange];

    if (solidToStand) {
      if (index === 0) {
        array[0].value = e.target.value;
        let latestData = await geyValues(e.target.value);
        array[1].value = valueFormatter(
          latestData.e * latestData?.data?.standexchange
        );

        setExchange(array);
      }
    } else {
      if (index === 0) {
        array[0].value = e.target.value;
        let latestData = await geyValues(e.target.value);
        array[1].value = valueFormatter(
          latestData.e / latestData?.data?.standexchange
        );
        setExchange(array);
      }
    }
  };

  const convertCoinAPI = async (e) => {
    e.preventDefault();
    if (exchange[0].type === "SOLID" && exchange[0].value < 0.000001) {
      errorMessage("❌ Invalid  solid(minimum amount required 0.000001)");
      return;
    }
    if (exchange[0].type === "STAND" && exchange[0].value < 3) {
      errorMessage("❌ Invalid  stand(minimum amount required 3)");
      return;
    }

    if (exchange[0].value > 0 && exchange[0].value <= exchange[0].available) {
      if (exchange[0].type === "SOLID") {
        const postData = {
          user_id: userReducer?.currentUser?.id,
          exchange_coin_amount: parseFloat(exchange[1].value),
          solid_coin: parseFloat(exchange[0].value),
        };
        let response = await dispatch(solidToStandExchange(postData));
        if (response.payload) {
          props.history.push("/");
        }
        let array = [...exchange];
        array[0].value = "";
        array[1].value = "";
        setExchange(array);
      } else {
        const postData = {
          user_id: userReducer?.currentUser?.id,
          exchange_coin_amount: parseFloat(exchange[0].value),
          solid_coin: parseFloat(exchange[1].value),
        };
        let data = {
          id: store?.standCoin?.id,
          postData,
        };

        let response = await dispatch(standToSolid(data));
        if (response.payload) {
          props.history.push("/");
        }
        let array = [...exchange];
        array[0].value = "";
        array[1].value = "";
        setExchange(array);
      }
      dispatch(getSolidCoin(userReducer?.currentUser?.id));
      dispatch(getStandCoin(userReducer?.currentUser?.id));
    } else {
      errorMessage("❌ Invalid Amount");
    }
  };

  useEffect(() => {
    dispatch(solidToStandExchangeRate());
    dispatch(getSolidCoin(userReducer?.currentUser?.id));
    dispatch(getStandCoin(userReducer?.currentUser?.id));
    dispatch(getPlatformFeeSolidToken());
  }, []);

  useEffect(() => {
    setExchange([
      {
        type: "SOLID",
        value: "",
        available: store?.solidCoin?.solid_coin
          ? store?.solidCoin?.solid_coin
          : "0",
        image: solidTokenImage,
      },
      {
        type: "STAND",
        value: "",
        available:
          store?.standCoin?.exchange_coin_amount <= 1
            ? "0"
            : store?.standCoin?.exchange_coin_amount - 1,
        image: standCoinImage,
      },
    ]);
  }, [store?.solidCoin, store?.standCoin]);
  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Exchange" />

      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8" style={{ marginTop: "0%" }}>
          <div className="card align-items-center justify-content-center">
            <div className="card-header ">
              <h4 className="card-title ">
                Exchange {exchange[0].type} with {exchange[1].type}
              </h4>
            </div>
            {exchange[0] && (
              <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4 replace">
                <div className="d-flex justify-content-between">
                  <span>Spend</span>
                  <span className="d-flex">
                    <span className="mx-1">Available:</span>

                    <CurrencyFormat
                      value={
                        exchange[0].available <= 0 ? 0.0 : exchange[0].available
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                      renderText={(value) => <span>{value}</span>}
                    />
                  </span>
                </div>

                <div className="d-flex justify-content-between">
                  <input
                    type="number"
                    value={exchange[0].value}
                    onChange={(e) => handelChange(e, 0)}
                    placeholder="1000"
                    className="border-0 w-100"
                    onWheel={(e) => e.target.blur()}
                  />

                  <div className={styles["tokenDiv"]}>
                    <img
                      src={exchange[0].image}
                      width="36px"
                      height="36px"
                      className="mx-1"
                      style={{ objectFit: "contain" }}
                    />
                    <span>{exchange[0].type}</span>
                  </div>
                </div>
              </div>
            )}
            <ImportExport onClick={changeFields} className="cursor-pointer" />
            {exchange[1] && (
              <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4 replace">
                <div className="d-flex justify-content-between">
                  <span>Receive</span>
                  <span className="d-flex">
                    <span className="mx-1">Available:</span>
                    <CurrencyFormat
                      // value={standCoin.exchange_coin_amount}
                      value={
                        exchange[1].available <= 0 ? 0.0 : exchange[1].available
                      }
                      displayType={"text"}
                      // decimalScale={2}
                      thousandSeparator={true}
                      // prefix={"$"}
                      fixedDecimalScale={true}
                      renderText={(value) => <span>{value}</span>}
                    />
                  </span>
                </div>

                <div className="d-flex justify-content-between">
                  {isLoading ? (
                    <RotatingLines
                      strokeColor="#3eacff"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="20"
                      visible={true}
                    />
                  ) : (
                    <input
                      disabled
                      type="number"
                      value={exchange[1].value}
                      onChange={(e) => handelChange(e, 1)}
                      placeholder="0.04"
                      className="border-0 w-100"
                      onWheel={(e) => e.target.blur()}
                    />
                  )}

                  <div className={styles["tokenDiv"]}>
                    <img
                      src={exchange[1].image}
                      width="36px"
                      height="36px"
                      className="mx-1"
                      style={{ objectFit: "contain" }}
                    />
                    <span>{exchange[1].type}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="col-xl-6 col-lg-6 m-auto  d-flex justify-content-between">
              <span>Price</span>
              <span className="d-flex">
                <span className="mx-1"> 1 SOLID =</span>
                <CurrencyFormat
                  value={store?.solidToStandER?.standexchange}
                  displayType={"text"}
                  decimalScale={2}
                  thousandSeparator={true}
                  fixedDecimalScale={true}
                  renderText={(value) => <span>{value}</span>}
                />
                <span className="mx-1">STAND</span>
              </span>
            </div>
            <div>
              <span className="mx-1">
                Commission : {/* //{ */}
                {/* // solidToStand
                //   ? valueFormatter(store.getPlatformFeeSolidToken.solidFee)
                //   :  */}
                0.001
                {/* // } */}
              </span>
              <img
                src={standCoinImage}
                width="15px"
                height="15px"
                style={{
                  objectFit: "contain",
                  marginRight: "10px",
                  marginTop: "-3px",
                }}
              />
            </div>

            <button
              // type="submit"
              onClick={convertCoinAPI}
              // onClick={(e) => notifyTopRight(e)}
              className="btn btn-primary my-4 text-center"
              style={{ width: "120px" }}
            >
              Continue
            </button>
            {/* </form> */}
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

export default Exchange;

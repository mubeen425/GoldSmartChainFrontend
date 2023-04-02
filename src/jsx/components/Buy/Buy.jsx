import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Dropdown from "react-bootstrap/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import solidCoin from "../../../images/solid.png";
import CurrencyFormat from "react-currency-format";
import styles from "./Buy.module.scss";
import { successMessage, errorMessage } from "../../../utils/message";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserWallet,
  getSolidCoin,
  getSolidValue,
  buySolidCoin,
  getStandCoin,
} from "../../../Redux/coins";
import { valueFormatter } from "../../../services/valueFormatter";
const cookies = new Cookies();

function Buy(props) {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store?.userReducer);
  const coinReducer = useSelector((store) => store?.coinReducer);
  const [drop, setDrop] = useState("EUR");
  const [buyAmount, setBuyAmount] = useState({ usd: 1, solid: 1 });

  const changeAmountUsd = (e) => {
    setBuyAmount({
      ...buyAmount,
      usd: e.target.value,
      solid: Number(e.target.value / coinReducer?.solidValue),
    });
  };
  const changeAmountSolid = (e) => {
    setBuyAmount({
      ...buyAmount,
      solid: e.target.value,
      usd: Number(e.target.value * coinReducer?.solidValue),
    });
  };

  const notifyTopRight = async (e) => {
    if (buyAmount.solid <= 0) {
      errorMessage("❌ Invalid  solid amount(minimum amount required 1)");
      return;
    }
    e.preventDefault();
    if (buyAmount.usd > 0 && buyAmount.usd <= 100000) {
      if (coinReducer?.amount?.balance < buyAmount.usd) {
        errorMessage("❌ User has not enough money");
      }
      const postData = {
        user_id: userReducer?.currentUser?.id,
        solid_coin: parseFloat(buyAmount.solid),
        invest_amount: parseFloat(buyAmount.usd),
      };
      let response = await dispatch(buySolidCoin(postData));
      dispatch(getSolidCoin(userReducer?.currentUser?.id));
      dispatch(getStandCoin(userReducer?.currentUser?.id));
      if (response?.payload?.data) {
        props.history.push("/");
      }
    } else {
      errorMessage("❌ Invalid Amount");
    }
  };

  useEffect(() => {
    if (userReducer?.currentUser) {
      dispatch(getUserWallet(userReducer?.currentUser?.id));
      dispatch(getSolidCoin(userReducer?.currentUser?.id));
      dispatch(getSolidValue());
    }
  }, []);

  useEffect(() => {
    setBuyAmount({ ...buyAmount, usd: coinReducer?.solidValue });
  }, [coinReducer?.solidValue]);

  const handelSelect = (val) => {
    setDrop(val);
  };

  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Buy" />
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8">
          <div className="py-2">
            <Dropdown className="d-inline mx-2 ">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                {drop}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => handelSelect("EUR")}>
                  EUR
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => handelSelect("USD")}>
                  USD
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => handelSelect("GBP")}>
                  GBP
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => handelSelect("AUD")}>
                  AUD
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => handelSelect("CAD")}>
                  CAD
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => handelSelect("HUF")}>
                  HUF
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="card">
            <div className="card-header" style={{ padding: "20px 30px" }}>
              <h4 className="card-title w-50">
                {drop === "EUR" ? "EU Users" : `Buy For ${drop}`}{" "}
              </h4>
              {drop === "EUR" && (
                <h4 className="card-title w-50">Non EU Users</h4>
              )}
            </div>
            <div className="card-body">
              <div className="d-flex  align-items-center justify-content-around">
                {drop == "EUR" && (
                  <div>
                    <div>STANDARD IN GOLD E.U.</div>
                    <div>BIC : TRWIBEB1XXX</div>
                    <div>IBAN : BE36 9675 1862 2081</div>
                    <div>
                      Wise's Address: Avenue Louise 54, Room S52 Brussels 1050
                      Belgium
                    </div>
                  </div>
                )}
                {drop == "USD" && (
                  <div>
                    <div>STANDARD IN GOLD E.U.</div>
                    <div>ACH & Wire Routing No : 084009519</div>
                    <div>IBAN : BE36 9675 1862 2081</div>
                    <div>Account No : 9600011162635472</div>
                    <div>Account Type : Checking </div>
                    <div>
                      Wise's Address: Avenue Louise 54, Room S52 Brussels 1050
                      Belgium
                    </div>
                  </div>
                )}
                {drop == "GBP" && (
                  <div>
                    <div>STANDARD IN GOLD E.U.</div>
                    <div>Sort Code : 23-14-70</div>
                    <div>Account No : 36271055</div>
                    <div>IBAN : GB09 TRWI 2314 7036 2710 55</div>
                    <div>
                      Wise's Address: 56 Shoreditch High Street London E1 6JJ
                      United Kingdom
                    </div>
                  </div>
                )}
                {drop == "AUD" && (
                  <div>
                    <div>STANDARD IN GOLD E.U.</div>
                    <div>BSB Code: 802-985</div>
                    <div>Account No : 910793682</div>
                    <div>
                      Wise's Address: 36-38 Gipps Street Collingwood 3066
                      Australia
                    </div>
                  </div>
                )}
                {drop == "CAD" && (
                  <div>
                    <div>STANDARD IN GOLD E.U.</div>
                    <div>Institution Number : 621</div>
                    <div>Account No : 200110487600</div>
                    <div>Transit Number : 16001</div>
                    <div>
                      Wise's Address: 99 Bank Street, Suite 1420 Ottawa ON K1P
                      1H4 Canada
                    </div>
                  </div>
                )}
                {drop == "HUF" && (
                  <div>
                    <div>STANDARD IN GOLD E.U.</div>
                    <div>Account No : 12600016-0000xxxx-xxxxxxxx</div>
                    <div>
                      Wise's Address: Avenue Louise 54, Room S52 Brussels 1050
                      Belgium
                    </div>
                  </div>
                )}
                {drop === "EUR" && (
                  <div>
                    <div>STANDARD IN GOLD E.U.</div>
                    <div>SWIFT/BIC : TRWIBEB1XXX</div>
                    <div>IBAN: BE36 9675 1862 2081</div>
                    <div>
                      Wise's Address : Avenue Louise 54, Room S52 Brussels 1050
                      Belgium
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8" style={{ marginTop: "0%" }}>
          <div className="card align-items-center justify-content-center">
            <div className="card-header ">
              <h4 className="card-title ">Buy SOLID</h4>
            </div>
            <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4">
              <div className="d-flex justify-content-between">
                <span>Spend</span>
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
                  value={buyAmount.usd}
                  onChange={(e) => changeAmountUsd(e)}
                  placeholder="1000"
                  className="border-0 w-100"
                  onWheel={(e) => e.target.blur()}
                />
                <div className={styles["tokenDiv"]}>
                  <span>$USD</span>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 m-auto border rounded p-4 my-4">
              <div className="d-flex justify-content-between">
                <span>Receive</span>
                <span className="d-flex">
                  <span className="mx-1">Available:</span>
                  {coinReducer?.solidCoin?.solid_coin > 0 ? (
                    <CurrencyFormat
                      // value={coin}
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
                  value={buyAmount.solid}
                  onChange={(e) => changeAmountSolid(e)}
                  placeholder="0.04"
                  className="border-0 w-100"
                  onWheel={(e) => e.target.blur()}
                />
                <div className={styles["tokenDiv"]}>
                  <img
                    src={solidCoin}
                    className="mx-1"
                    width="36px"
                    height="36px"
                    style={{ objectFit: "contain" }}
                  />
                  <span>SOLID</span>
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
                  // decimalScale={2}
                  thousandSeparator={true}
                  prefix={"$"}
                  fixedDecimalScale={true}
                  renderText={(value) => <span>{value}</span>}
                />
              </span>
            </div>

            <button
              // type="submit"
              onClick={notifyTopRight}
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

export default Buy;

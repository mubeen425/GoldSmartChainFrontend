import React, { useState } from "react";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";
import { successMessage, errorMessage } from "../../../utils/message";
import PageTitle from "../../layouts/PageTitle";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { depositeAmount } from "../../../Redux/coins";
import { Diversity1Outlined } from "@mui/icons-material";

const cookies = new Cookies();

function Deposit(props) {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);
  const [active, setActive] = useState("ByFiat");
  const [amount, setAmount] = useState(0);

  const notifyTopRight = async (e) => {
    e.preventDefault();
    if (amount > 0 && amount <= 100000) {
      const postData = {
        user_id: userReducer?.currentUser?.id,
        amount: parseFloat(amount),
      };
      let response = await dispatch(depositeAmount(postData));
   
      if (response.payload === 200) {
        props.history.push("/");
      }
    } else {
      errorMessage("❌ Invalid Amount");
    }
  };
  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Deposit" />

      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Deposit STAND OR SOLID</h4>
            </div>
            <div className="card-body">
              <div
                style={{
                  margin: "0 auto",

                  width: "100%",
                }}
              >
                {userReducer?.currentUser && (
                  <QRCode
                    size={300}
                    style={{
                      maxWidth: "100%",
                      width: "100%",
                    }}
                    value={userReducer?.currentUser?.wallet_public_key}
                    viewBox={`0 0 400 400`}
                  />
                )}
              </div>
              <div
                className="text-center font_size"
                style={{ marginTop: "25px" }}
              >
                <span>Wallet Address : </span>
                {userReducer?.currentUser?.wallet_public_key}
              </div>
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
    </>
  );
}

export default Deposit;

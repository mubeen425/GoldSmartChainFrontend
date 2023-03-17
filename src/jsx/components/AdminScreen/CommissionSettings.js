import axiosInstance from "../../../services/AxiosInstance";
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";
import { ToastContainer, toast } from "react-toastify";
import solidCoin from "../../../images/solid.png";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { successMessage, errorMessage } from "../../../utils/message";
const cookies = new Cookies();

function CommissionSettings(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [solidPrice, setSolidPrice] = useState(0);
  const [isEditInput, setIsEditInput] = useState(false);
  const token = cookies.get("reflink");

  const usr = store?.userReducer?.currentUser;
  useEffect(async () => {
 
    if (!usr.is_admin) {
      props.history.push("/");
    }
  }, [usr]);

  const changeEditInput = () => {
    setIsEditInput(true);
  };

  const updateValue = async (e) => {
    e.preventDefault();

    if (solidPrice > 0 && solidPrice <= 100000) {
      let usr = await store?.userReducer?.currentUser;

    

      const postData = {
        value: parseFloat(solidPrice),
      };
 
      axiosInstance
        .post(`api/solidvalue/`, postData)
        .then((res) => {
     
          setIsEditInput(false);
          successMessage("✔️ Solid Price Updated");
        })
        .catch((err) => {
       
        });
    } else {
    
      successMessage("❌ Invalid Amount");
    }
  };

  useEffect(() => {
    let usr = store?.userReducer?.currentUser;

    axiosInstance
      .get(`api/solidvalue`)
      .then((res) => {
     
        setSolidPrice(res?.data?.value);
      })
      .catch((e) => {
      
      });
  }, []);
  return (
    <div>
      <PageTitle activeMenu="Price Settings" motherMenu="Admin" />

      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Price Settings</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="form-group mb-3 col-md-12">
                    <div className="d-flex row justify-content-center">
                      <img
                        src={solidCoin}
                        width="64px"
                        height="64px"
                        style={{ objectFit: "contain" }}
                      />
                      <div className="d-flex justify-content-center my-4 align-items-center">
                        {/* <div className=""> */}
                        <h5 className="flex-shrink-0 mx-4 mb-0">
                          Set Solid Price
                        </h5>
                        {isEditInput ? (
                          <input
                            type="text"
                            className="form-control w-25"
                            placeholder="$70"
                            value={solidPrice}
                            onChange={(e) => setSolidPrice(e.target.value)}
                          />
                        ) : (
                          <h5 className="mb-0" onClick={changeEditInput}>
                            ${solidPrice}
                          </h5>
                        )}
                        {/* <CurrencyFormat
                          thousandSeparator={true}
                          prefix={"$"}
                          value={solidPrice}
                          
                        /> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="form-group mb-3 col-md-6">
                    <h5>Sell Commission</h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1.5%"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Minimum SL</h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1.1"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Minimum TP</h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1.9"
                    />
                  </div> */}
                </div>

                <div className="text-center my-4">
                  <button
                    type="submit"
                    className="btn btn-primary text-center w-25"
                    onClick={updateValue}
                  >
                    Save
                  </button>
                </div>
              </form>
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
  );
}

export default CommissionSettings;

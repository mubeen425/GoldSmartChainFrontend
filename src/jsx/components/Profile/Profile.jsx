import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import { ToastContainer, toast } from "react-toastify";
import LogoutPage from "../../layouts/nav/Logout";
import axiosInstance from "../../../services/AxiosInstance";
//** Import Image */

import profile from "../../../images/profile/profile.png";
import { baseURL } from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { getBankDetails, updateBankDetails } from "../../../Redux/user";
import { successMessage, errorMessage } from "../../../utils/message";

const Profile = (props) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);

  const inputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePassword, setProfilePassword] = useState({
    oldPassword: "",
    newPassword: "",
    passwordCheck: true,
  });
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    contact: "",
    email: "",
    emailCheck: true,
  });
  const [bankDetails, setBankDetails] = useState({
    bank_name: "",
    account_number: "",
    bic_swift: "",
    // bank_address: "",
    // bank_city: "",
    // bank_state: "",
    // bank_zipcode: "",
  });

  const [user, setUser] = useState(null);
  useEffect(async () => {
    let res = await dispatch(getBankDetails(userReducer?.currentUser?.id));

    let response = {
      bank_name: res.payload ? res.payload.bank_name : "",
      account_number: res.payload ? res.payload.account_number : "",
      bic_swift: res.payload ? res.payload.bic_swift : "",
    };
    setBankDetails(response);
  }, []);

  useEffect(async () => {
    setProfileInfo({
      ...profileInfo,
      firstName: userReducer.currentUser.first_name,
      lastName: userReducer.currentUser.last_name,
      userName: userReducer.currentUser.user_name,
      contact: userReducer.currentUser.contact,
      email: userReducer.currentUser.email,
      emailCheck: true,
    });
  }, [userReducer.currentUser]);

  const validatePassword = (text) => {
    let reg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[,./#?!@$%^&*-]).{8,}$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const updatePasswordField = (e) => {
    const result = validatePassword(e);
    if (result) {
    } else {
    }

    setProfilePassword({
      ...profilePassword,
      newPassword: e,
    });
  };

  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const focusChangeEmail = () => {
    const result = validateEmail(profileInfo.email);

    setProfileInfo({
      ...profileInfo,
      emailCheck: result,
    });
  };

  const focusChangePassword = () => {
    const result = validatePassword(profilePassword.newPassword);

    setProfilePassword({
      ...profilePassword,
      passwordCheck: result,
    });
  };

  const updateInfo = async (e) => {
    e.preventDefault();
    const postData = {
      user_name: profileInfo.userName,
      first_name: profileInfo.firstName,
      last_name: profileInfo.lastName,
      contact: profileInfo.contact,
      email: profileInfo.email,
    };

    axiosInstance
      .put(`api/profile/${userReducer?.currentUser?.id}`, postData)
      .then((res) => {
        successMessage("✔️ Profile Updated! Logging out");
      })
      .catch((err) => {
        errorMessage(`❌ ${err.response.data}!`);
      });
  };
  const updateBankInfo = async (e) => {
    e.preventDefault();
    dispatch(
      updateBankDetails({
        userId: userReducer?.currentUser?.id,
        bankDetails: { ...bankDetails, user_id: userReducer?.currentUser?.id },
      })
    );
  };
  const updatePassword = async (e) => {
    e.preventDefault();

    const postData = {
      password: profilePassword.oldPassword,
      new_password: profilePassword.newPassword,
    };

    axiosInstance
      .put(
        `api/profile/passwordchange/${userReducer?.currentUser?.id}`,
        postData
      )
      .then((res) => {
        successMessage("✔️ Password Updated! Logging out");
      })
      .catch((err) => {
        errorMessage(`❌ ${err.response.data}!`);
      });
  };

  const handelChangeBankDetails = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />

      <div className="row">
        <div className="col-lg-12 d-flex justify-content-center my-4">
          <Avatar
            src={user?.username}
            alt={user?.username}
            sx={{
              width: "64px",
              height: "64px",
              objectFit: "contain",
              fontSize: "24px",
            }}
          />
        </div>
      </div>
      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Update Profile</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={updateInfo}>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <h5>First Name</h5>
                    <input
                      value={profileInfo.firstName}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          firstName: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control"
                      placeholder="John"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Last Name</h5>
                    <input
                      value={profileInfo.lastName}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          lastName: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Username</h5>
                    <input
                      value={profileInfo.userName}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          userName: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control"
                      placeholder="Jodoe"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Phone</h5>
                    <input
                      value={profileInfo.contact}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          contact: e.target.value,
                        })
                      }
                      type="number"
                      className="form-control"
                      placeholder="+1 234 468"
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Email</h5>
                    <input
                      value={profileInfo.email}
                      onBlur={focusChangeEmail}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          email: e.target.value,
                        })
                      }
                      type="email"
                      className="form-control"
                      placeholder="jodoe@gsc.com"
                    />
                  </div>
                  {!profileInfo.emailCheck && (
                    <h5 className="emailError" style={{ color: "red" }}>
                      Not a valid e-mail address
                    </h5>
                  )}
                </div>

                <div className="text-center my-4">
                  <button
                    type="submit"
                    className="btn btn-primary text-center w-25"
                  >
                    Update
                  </button>
                </div>
              </form>
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
        </div>
      </div>
      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Update Bank Details</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={updateBankInfo}>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <h5>Bank Name</h5>
                    <input
                      value={bankDetails.bank_name}
                      name="bank_name"
                      onChange={(e) => handelChangeBankDetails(e)}
                      type="text"
                      className="form-control"
                      placeholder="Bank Name"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>IBAN or Bank Account</h5>
                    <input
                      value={bankDetails.account_number}
                      onChange={(e) => handelChangeBankDetails(e)}
                      name="account_number"
                      type="text"
                      className="form-control"
                      placeholder="IBAN or Bank Account"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>BIC or SWIFT</h5>
                    <input
                      value={bankDetails.bic_swift}
                      name="bic_swift"
                      onChange={(e) => handelChangeBankDetails(e)}
                      type="text"
                      className="form-control"
                      placeholder="BIC or SWIFT"
                    />
                  </div>
                  {/* <div className="form-group mb-3 col-md-6">
                    <h5>Bank Address</h5>
                    <input
                      value={bankDetails.bank_address}
                      name="bank_address"
                      onChange={(e) => handelChangeBankDetails(e)}
                      type="text"
                      className="form-control"
                      placeholder="Bank Address"
                      // onWheel={(e) => e.target.blur()}
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Bank City</h5>
                    <input
                      value={bankDetails.bank_city}
                      name="bank_city"
                      onChange={(e) => handelChangeBankDetails(e)}
                      type="text"
                      className="form-control"
                      placeholder="Bank City"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Bank State</h5>
                    <input
                      value={bankDetails.bank_state}
                      name="bank_state"
                      onChange={(e) => handelChangeBankDetails(e)}
                      type="text"
                      className="form-control"
                      placeholder="Bank State"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Bank zipcode</h5>
                    <input
                      value={bankDetails.bank_zipcode}
                      name="bank_zipcode"
                      onChange={(e) => handelChangeBankDetails(e)}
                      type="text"
                      className="form-control"
                      placeholder="Bank zipcode"
                    />
                  </div> */}
                </div>

                <div className="text-center my-4">
                  <button
                    type="submit"
                    className="btn btn-primary text-center w-25"
                  >
                    Update
                  </button>
                </div>
              </form>
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
        </div>
      </div>
      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Update Password</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={updatePassword}>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <h5>Old Password</h5>
                    <input
                      value={profilePassword.oldPassword}
                      onChange={(e) =>
                        setProfilePassword({
                          ...profileInfo,
                          oldPassword: e.target.value,
                        })
                      }
                      type="password"
                      className="form-control"
                      placeholder="***"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>New Password</h5>
                    <input
                      onChange={(e) => updatePasswordField(e.target.value)}
                      onBlur={() => focusChangePassword()}
                      value={profilePassword.newPassword}
                      type="password"
                      className="form-control"
                      placeholder="***"
                    />
                  </div>
                  {!profilePassword.passwordCheck && (
                    <h5 className="emailError" style={{ color: "red" }}>
                      Password needs atleast 8 characters, 1 number, 1 symbol, 1
                      uppercase and 1 lowercase
                    </h5>
                  )}
                </div>

                <div className="text-center my-4">
                  <button
                    type="submit"
                    className="btn btn-primary text-center w-25"
                  >
                    Update Password
                  </button>
                </div>
              </form>
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
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;

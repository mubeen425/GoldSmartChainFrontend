import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getCurrentuser, verifyEmail, forgotPassword } from "../../Redux/user";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import logo from "../../images/logo2.png";
import tradingPic from "../../images/trading.webp";
import { successMessage, errorMessage } from "../../utils/message";
import axiosInstance from "../../services/AxiosInstance";
import { Button, Modal } from "react-bootstrap";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdMarkEmailUnread } from "react-icons/md";

const cookies = new Cookies();

function Login(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);

  const [checkEmail, setCheckEmail] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [ForgotEmail, setForgotEmail] = useState("");

  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);

  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordCheck: true,
  });

  const validatePassword = (text) => {
    let reg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[,./#?!@$%^&*-]).{8,}$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const focusChangePassword = () => {
   
    const result = validatePassword(user.password);
    setUser({
      ...user,
      passwordCheck: result,
    });
  };

  const updatePassword = (e) => {
    const result = validatePassword(e);

    setUser({
      ...user,
      password: e,
    });
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (user.passwordCheck) {
      let error = false;
      const errorObj = { ...errorsObj };
      if (user.email === "") {
        errorObj.email = "Email is Required";
        error = true;
      }
      if (user.password === "") {
        errorObj.password = "Password is Required";
        error = true;
      }
      setErrors(errorObj);
      if (error) {
        return;
      }

      const postData = {
        email: user.email,
        password: user.password,
      };
      axiosInstance
        .post(`api/user/login`, postData)
        .then((res) => {
          axios.defaults.headers.authorization = res?.data?.access;
          axiosInstance.defaults.headers.authorization = res?.data?.access;
          const user = jwt_decode(res?.data?.access);
          const token = res?.data?.access;
          if (user?.is_admin == 1) {
            dispatch(getCurrentuser(user?.id));
            cookies.set("lastlogin", user.is_admin);
            cookies.set("reflink", token);
            history.push("/admin-dashboard");
          } else {
            if (user?.is_email_verified == 0) {
              setUserEmail(user?.email);
              setShowModal(true);
            } else {
              dispatch(getCurrentuser(user?.id));
              cookies.set("lastlogin", user.is_admin);
              cookies.set("reflink", token);
              history.push("/");
            }
          }
        })
        .catch((e) => {
         
          errorMessage("❌ Wrong credentials");
        });
    }
  };

  const verifyemail = () => {
    dispatch(verifyEmail({ email: userEmail }));
    setCheckEmail(true);
    setShowModal(false);
  };
  const closeModel = () => {
    setShowModal(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let res = await dispatch(
      forgotPassword({ email: ForgotEmail, type: "forgot" })
    );
   
    if (res.payload.data) {
      setForgotModal(false);
      history.push("/login");
    }
  };

  const handelChange = (e) => {
    e.preventDefault();
    setForgotEmail(e.target.value);
  };
  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      <div className="login-aside text-center  d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center mb-4 pt-5">
            <img src={logo} width="150" alt="" />
          </div>
          <h3 className="mb-2">Welcome back!</h3>
          <p>
            Gold Smart Chain Dashboard <br />
          </p>
        </div>
        <div
          className="aside-image"
          style={{ backgroundImage: "url(" + tradingPic + ")" }}
        ></div>
      </div>
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div id="sign-in" className="auth-form   form-validation">
                  {props?.errorMessage && (
                    <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                      {props?.errorMessage}
                    </div>
                  )}
                  {props?.successMessage && (
                    <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                      {props?.successMessage}
                    </div>
                  )}
                  <form onSubmit={onLogin} className="form-validate">
                    <h3 className="text-center mb-4 text-black">
                      Sign in your account
                    </h3>
                    <div className="form-group mb-3">
                      <label className="mb-1" htmlFor="val-email">
                        <strong>Email</strong>
                      </label>
                      <div>
                        <input
                          type="email"
                          className="form-control"
                          value={user.email}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              email: e.target.value,
                            })
                          }
                          placeholder="Type Your Email Address"
                        />
                      </div>
                      {errors.email && (
                        <div className="text-danger fs-12">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <label className="mb-1">
                        <strong>Password</strong>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={user.password}
                        onChange={(e) => updatePassword(e.target.value)}
                        placeholder="Type Your Password"
                      />
                      {!user.passwordCheck && (
                        <h5
                          className="emailError text-center"
                          style={{ color: "red" }}
                        >
                          Incorrect Passowrd
                        </h5>
                      )}
                    </div>
                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                      <div className="form-group mb-3">
                        <div className="custom-control custom-checkbox ml-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="basic_checkbox_1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                          >
                            Remember my preference
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="text-center form-group mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>

                  <div
                    className="new-account mt-3"
                    onClick={() => setForgotModal(true)}
                  >
                    <Link className="text-primary">Forgot Password?</Link>
                  </div>
                  <div className="new-account mt-3">
                    <p>
                      Don't have an account?{" "}
                      <Link className="text-primary" to="/page-register">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
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

      <Modal
        className="fade"
        show={showModal}
        centered
        onHide={() => setShowModal(false)}
      >
        <Modal.Body>
          <div class="form-group">
            <div className="d-flex justify-content-center">
              <MdMarkEmailUnread size={60} style={{ color: "red" }} />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center p-3">
              <h2 className="text-center">Please Verify Your Email Address</h2>
              <p className="text-center" style={{ fontSize: "20px" }}>
                We noticed your email address has not been verified. If you
                didn't receive email please click on verify button to send
                verification link again.
              </p>
            </div>
            {errors?.level11_reward && (
              <h5
                className="emailError d-flex justify-content-center"
                style={{ color: "red" }}
              >
                value must be a positive integer
              </h5>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={(e) => verifyemail(e)}>
              VERIFY YOUR EMAIL ADDRESS
            </Button>
          </div>
          {checkEmail && (
            <div className="d-flex justify-content-center my-2">
              Please check your
              <span className="mx-1">
                <Link to="https://mail.google.com/">Email</Link>
              </span>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <Modal
        className="fade"
        show={forgotModal}
        centered
        onHide={() => setForgotModal(false)}
      >
        <Modal.Body>
          <div class="form-group">
            <div className="d-flex justify-content-center">
              <MdOutlineMarkEmailRead size={60} style={{ color: "green" }} />
            </div>
            <div className="d-flex justify-content-center align-items-center p-3">
              <p className="text-center" style={{ fontSize: "20px" }}>
                To reset your password, enter the email address you use to sign
                in.
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <form onSubmit={(e) => onSubmit(e)} className="w-75">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={(e) => handelChange(e)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="d-flex justify-content-center my-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block w-50"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;

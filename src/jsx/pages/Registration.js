import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../images/logo2.png";
import axiosInstance from "../../services/AxiosInstance";
import { userSignUp } from "../../Redux/user";
import { errorMessage } from "../../utils/message";
import { Button, Modal } from "react-bootstrap";
import { TbUserCheck } from "react-icons/tb";

function Register(props) {
  const { id } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [showModal, setShowModal] = useState(false);

  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [referalCode, setReferalCode] = useState(id);
  const [isValidReferalCode, setIsValidReferalCode] = useState(true);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    emailCheck: true,
    passwordCheck: true,
    confirmPasswordCheck: true,
    user_name: "",
  });

  const onSignUp = (e) => {
    e.preventDefault();
    if (user.firstName.length < 2) {
      swal("First name not valid");
    } else if (user.lastName.length < 2) {
      swal("Last name not valid");
    } else if (!user.emailCheck) {
      swal("Email not valid");
    } else if (!user.password) {
      swal("Password not valid");

      swal("Confirm Password not valid");
    } else if (!(user.password === user.confirmPassword)) {
    } else {
      callSignUpApi();
    }
  };

  const callSignUpApi = async () => {
    const params = {
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      password: user.password,
      user_name: user.user_name,
    };

    try {
      if (id) {
        let res = await dispatch(userSignUp(params));

        if (isValidReferalCode) {
          await axiosInstance.post(`api/refer/`, {
            user_id: res.payload.data.user_id,
            reference: referalCode,
          });
          if (res.payload.data.user_id) {
            setShowModal(true);
            setTimeout(() => {
              props.history.push("/login");
            }, "3000");
          }
        }
      } else {
        let res = await dispatch(userSignUp(params));

        if (res.payload.data.user_id) {
          setShowModal(true);
          setTimeout(() => {
            props.history.push("/login");
          }, "3000");
        }
      }
    } catch (error) {}
  };

  const updatePassword = (e) => {
    const result = validatePassword(e);

    setUser({
      ...user,
      password: e,
    });
  };

  const focusChangeEmail = () => {
    const result = validateEmail(user.email);

    setUser({
      ...user,
      emailCheck: result,
    });
  };

  const validateEmail = (text) => {
    let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = (text) => {
    let reg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[,./#?!@$%^&*-]).{8,}$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };
  const validateConfirmPassword = () => {
    if (!(user.password === user.confirmPassword)) {
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

  const focusChangeConfirmPassword = () => {
    const result = validateConfirmPassword();

    setUser({
      ...user,
      confirmPasswordCheck: result,
    });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  useEffect(async () => {
    let res = await axiosInstance.get(`api/refer/verify/${referalCode}`);
    if (res.data.status === false) {
      setIsValidReferalCode(false);
    } else {
      setIsValidReferalCode(true);
    }
  }, []);

  const closeModel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="authincation h-100 p-meddle">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <div className="text-center mb-3">
                        <Link to="/login">
                          <img style={{ width: "150px" }} src={logo} alt="" />
                        </Link>
                      </div>
                      <h4 className="text-center mb-4 ">
                        Sign up your account
                      </h4>
                      {props?.errorMessage && (
                        <div className="">{props?.errorMessage}</div>
                      )}
                      {props.successMessage && (
                        <div className="">{props?.successMessage}</div>
                      )}
                      <form onSubmit={onSignUp}>
                        <div className="form-group mb-3">
                          <label className="mb-1 ">
                            <strong>Username *</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={user.user_name}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                user_name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="mb-1 ">
                            <strong>First Name *</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            value={user.firstName}
                            onChange={(e) =>
                              setUser({ ...user, firstName: e.target.value })
                            }
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="mb-1 ">
                            <strong>Last Name *</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            value={user.lastName}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="mb-1 ">
                            <strong>Phone</strong>
                          </label>
                          <input
                            value={user.phoneNumber}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                phoneNumber: e.target.value,
                              })
                            }
                            className="form-control"
                            placeholder="+1 234 5678"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="mb-1 ">
                            <strong>Email *</strong>
                          </label>
                          <input
                            value={user.email}
                            onBlur={focusChangeEmail}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                email: e.target.value,
                              })
                            }
                            className="form-control"
                            placeholder="Email"
                          />
                        </div>
                        {!user.emailCheck && (
                          <h5 className="emailError" style={{ color: "red" }}>
                            Not a valid e-mail address
                          </h5>
                        )}

                        {errors.email && <div>{errors.email}</div>}
                        <div className="form-group mb-3">
                          <label className="mb-1 ">
                            <strong>Password *</strong>
                          </label>
                          <input
                            value={user.password}
                            onChange={(e) => updatePassword(e.target.value)}
                            onBlur={() => focusChangePassword()}
                            className="form-control"
                            placeholder="***"
                            type={passwordShown ? "text" : "password"}
                          />
                        </div>

                        {!user.passwordCheck && (
                          <h5 className="emailError" style={{ color: "red" }}>
                            Password needs atleast 8 characters, 1 number, 1
                            symbol, 1 uppercase and 1 lowercase
                          </h5>
                        )}

                        <div className="form-group mb-3">
                          <label className="mb-1 ">
                            <strong>Confirm Password *</strong>
                          </label>
                          <input
                            value={user.confirmPassword}
                            onBlur={focusChangeConfirmPassword}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="form-control"
                            placeholder="***"
                            type={confirmPasswordShown ? "text" : "password"}
                          />
                        </div>
                        {!user.confirmPasswordCheck && (
                          <h5 className="emailError" style={{ color: "red" }}>
                            Password does not match
                          </h5>
                        )}

                        {!user.passwordCheck && (
                          <h5 className="emailError" style={{ color: "red" }}>
                            Password needs atleast 8 characters, 1 number, 1
                            symbol, 1 uppercase and 1 lowercase
                          </h5>
                        )}
                        {errors.password && <div>{errors.password}</div>}
                        {id && (
                          <div className="form-group mb-3">
                            <label className="mb-1 ">
                              <strong>Referral Code</strong>
                            </label>
                            <input
                              disabled={true}
                              value={referalCode}
                              onChange={(e) => setReferalCode(e.target.value)}
                              className="form-control"
                              placeholder="Enter referral code"
                              type="text"
                            />
                          </div>
                        )}
                        {!isValidReferalCode && id && (
                          <h5 className="emailError" style={{ color: "red" }}>
                            Invalid Referral Code
                          </h5>
                        )}
                        <div className="text-center mt-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-3">
                        <p className="">
                          Already have an account?{" "}
                          <Link className="text-primary" to="/login">
                            Sign in
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <TbUserCheck size={60} style={{ color: "green" }} />
            </div>
            <div className="d-flex  flex-column justify-content-center align-items-center p-3">
              <h2 className="text-center">Account Created Successfully </h2>
              <p className="text-center" style={{ fontSize: "20px" }}>
                We have sent an activation link to your email to continue with
                registration process.
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
    </>
  );
}

export default Register;

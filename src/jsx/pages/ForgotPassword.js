import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../Redux/user";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import logo from "../../images/logo-full.png";
const ForgotPassword = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email: email, type: "forgot" }));
  };
  const handelChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
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
                        <Link to="/"></Link>
                      </div>
                      <h4 className="text-center mb-4 ">Forgot Password</h4>
                      <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group">
                          <label className="">
                            <strong>Email</strong>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={(e) => handelChange(e)}
                            placeholder="Enter your email address"
                          />
                        </div>
                        <div className="text-center my-3">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            SUBMIT
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
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
      <Modal className="fade" show={showModal} centered>
        <Modal.Header>
          <Modal.Title className="w-100">
            <h2 className="text-center w-100">Forgot Password</h2>
          </Modal.Title>
          <Button
            onClick={() => setShowModal(false)}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div class="form-group">
            <div className="d-flex justify-content-center align-items-center p-3">
              <p className="text-center">
                To complete verification process, please click on the button
                below
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control w-100"
                    name="email"
                    onChange={(e) => handelChange(e)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="text-center my-3">
                  <button type="submit" className="btn btn-primary btn-block">
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgotPassword;

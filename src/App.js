import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, withRouter, useParams } from "react-router-dom";
import Index from "./jsx/index";
import AdminIndex from "./jsx/AdminIndex";
import { setCurrentUser, getBankDetails } from "./Redux/user";
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import { RotatingLines } from "react-loader-spinner";
import "./css/style.css";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import axiosInstance from "./services/AxiosInstance";
const SignUp = lazy(() => import("./jsx/pages/Registration"));
const ForgotPassword = lazy(() => import("./jsx/pages/ForgotPassword"));

const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./jsx/pages/Login")), 500);
  });
});

const cookies = new Cookies();

function App(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const userReducer = useSelector((store) => store.userReducer);

  useEffect(() => {
    const token = cookies.get("reflink");
    const lastlogin = cookies.get("lastlogin");
    if (token) {
      const user = jwt_decode(token);
      if (user.exp < Date.now() / 1000) {
        props.history.push("/login");
        cookies.remove("reflink");
      }
      axiosInstance
        .get(`/api/user/${user?.id}`)
        .then((res) => {
          dispatch(setCurrentUser(res?.data));
          dispatch(getBankDetails(user?.id));
        })
        .catch((e) => {});
      if (window.location.pathname.includes("login")) {
        props.history.push(user?.is_admin ? "/admin-dashboard" : "/");
      }
      if (lastlogin === "true") {
        props.history.push("/admin-dashboard");
      } else {
        props.history.push("/");
      }
    } else {
      if (!window.location.href.includes("/page-register")) {
        props.history.push("/login");
      }
    }
  }, []);

  console.log("window.location.origin", window.location.origin);

  if (
    store?.userReducer?.currentUser &&
    store?.userReducer?.currentUser !== null
  ) {
    return (
      <>
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          {store?.userReducer?.currentUser?.is_admin ? (
            <AdminIndex />
          ) : (
            <Index />
          )}
        </Suspense>
      </>
    );
  } else {
    return (
      <div className="vh-100">
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          {userReducer.isLoading && (
            <div className="loader">
              <RotatingLines
                strokeColor="#3eacff"
                strokeWidth="5"
                animationDuration="0.75"
                width="70"
                visible={true}
              />
            </div>
          )}
          <Switch>
            <Route path="/page-register/:id" component={SignUp} />
            <Route path="/page-register" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/page-forgot-password" component={ForgotPassword} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default withRouter(App);

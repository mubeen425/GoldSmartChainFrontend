import React, { useEffect } from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Row, Dropdown } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import { Pie } from "react-chartjs-2";
import LineChart1 from "../charts/Chartjs/line1";
import PolarChart from "../charts/Chartjs/polar";
import DonutChart from "./Dashboard/DonutChart";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../../Redux/user";
import {
  totalCommission,
  getSolidCoin,
  getStandCoin,
} from "../../../Redux/coins";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { valueFormatter } from "../../../services/valueFormatter";
import standCoinImage from "../../../images/stand.png";
import solidTokenImage from "../../../images/solid.png";
import ProjectSlider from "./Dashboard/ProjectSlider";

const ReservationChart = loadable(() =>
  pMinDelay(import("./Dashboard/ReservationChart"), 1000)
);

function Dropdownblog() {
  return (
    <Dropdown>
      <Dropdown.Toggle
        as="div"
        className="btn-link i-false"
        data-bs-toggle="dropdown"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
          <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
          <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
        <Dropdown.Item>Delete</Dropdown.Item>
        <Dropdown.Item>Edit</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
const AdminDashboard = (props) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);
  const coinReducer = useSelector((store) => store.coinReducer);
  useEffect(async () => {
    dispatch(totalCommission());
    dispatch(allUsers());
    if (!userReducer.currentUser.is_admin) {
      props.history.push("/dashboard");
    }
  }, [userReducer.currentUser]);
  useEffect(async () => {
    dispatch(getSolidCoin(userReducer?.currentUser?.id));
    dispatch(getStandCoin(userReducer?.currentUser?.id));
  }, []);

  const data = {
    datasets: [
      {
        data: [37, 17, 44],
        borderWidth: 0,
        backgroundColor: ["#7099ED", "#B3CCFF", "#9DBDFF"],
        hoverBackgroundColor: ["#7099ED", "#B3CCFF", "#9DBDFF"],
      },
    ],
    labels: [51, 24, 61],
  };

  const options = {
    plugins: {
      legend: false,
    },
    responsive: true,

    maintainAspectRatio: false,
  };

  const lineData = {
    defaultFontFamily: "Poppins",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "My First dataset",
        data: [25, 20, 60, 41, 66, 45, 80],
        borderColor: "rgba(0, 161, 93,1)",
        borderWidth: "1",
        backgroundColor: "rgba(0, 161, 93, .5)",
        pointBackgroundColor: "rgba(0, 0, 1128, .3)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    plugins: {
      legend: false,
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          beginAtZero: true,

          stepSize: 20,
          padding: 10,
        },
      },
      x: {
        ticks: {
          padding: 5,
        },
      },
    },
  };

  const sampleData = [
    64, 24, 40, 76, 19, 0, 2, 46, 65, 12, 10, 6, 15, 57, 35, 81, 86, 12, 12, 21,
    53, 44, 2, 1, 58, 9, 61, 64, 42, 92, 58, 9, 34, 47, 89, 52, 3, 69, 33, 2,
    60, 71, 71, 22, 65, 70, 31, 81, 36, 89,
  ];
  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Admin Dashboard" />
      <div className="col-xl-12 width_auto">
        <div className="card-body pt-0">
          <ProjectSlider
            coin={
              coinReducer.standCoin?.exchange_coin_amount
                ? coinReducer.standCoin?.exchange_coin_amount
                : 0
            }
            solid={
              coinReducer.solidCoin?.solid_coin
                ? coinReducer.solidCoin?.solid_coin
                : 0
            }
          />
        </div>
      </div>
      <Row>
        <div
          className="col-xl-4 col-sm-6 c-pointer"
          onClick={() => props.history.push("/users")}
        >
          <div className="card">
            <div className="card-body d-flex px-4 pb-0 justify-content-between">
              <div>
                <h4 className="fs-18 font-w600 mb-4 text-nowrap">
                  Total Users
                </h4>
                <div className="d-flex align-items-center">
                  <h2 className="fs-32 font-w700 mb-0">
                    {
                      userReducer?.allUsers?.filter(
                        (d) => d.id !== userReducer?.currentUser?.id
                      )?.length
                    }
                  </h2>
                </div>
              </div>
              <div className="bg-gradient1 rounded text-center p-3">
                <div className="d-inline-block position-relative donut-chart-sale mb-3">
                  <PeopleAltIcon
                    style={{ color: "green", width: "100px", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-6">
          <div className="card">
            <div className="card-body d-flex px-4 pb-0 justify-content-between">
              <div>
                <h4 className="fs-18 font-w600 mb-4 text-nowrap">
                  Total Assets
                </h4>
                <div className="d-flex align-items-center">
                  <h2 className="fs-32 font-w700 mb-0">$650</h2>
                  <span className="d-block ms-4">
                    <svg
                      width="21"
                      height="11"
                      viewBox="0 0 21 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.49217 11C0.590508 11 0.149368 9.9006 0.800944 9.27736L9.80878 0.66117C10.1954 0.29136 10.8046 0.291359 11.1912 0.661169L20.1991 9.27736C20.8506 9.9006 20.4095 11 19.5078 11H1.49217Z"
                        fill="#09BD3C"
                      />
                    </svg>
                    <small className="d-block fs-16 font-w400 text-success">
                      +0,5%
                    </small>
                  </span>
                </div>
              </div>
              <div className="bg-gradient1 rounded text-center p-3">
                <div className="d-inline-block position-relative donut-chart-sale mb-3">
                  <div style={{ height: 100, width: 100 }}>
                    <Pie
                      data={data}
                      height={100}
                      width={100}
                      options={options}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-6">
          <div className="card justify-content-around">
            <div
              className="d-flex px-4 pb-0 justify-content-between"
              style={{ padding: "1rem 1rem" }}
            >
              {/* <div> */}
              <h4 className="fs-18 font-w600 mb-4 text-nowrap">
                Total Commission
              </h4>
              {/* <div className="d-flex align-items-center">
                  <h5 className="fs-18 font-w400 mb-0">$680</h5>
                  <span className="d-block ms-4">
                    <svg
                      width="21"
                      height="11"
                      viewBox="0 0 21 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.49217 11C0.590508 11 0.149368 9.9006 0.800944 9.27736L9.80878 0.66117C10.1954 0.29136 10.8046 0.291359 11.1912 0.661169L20.1991 9.27736C20.8506 9.9006 20.4095 11 19.5078 11H1.49217Z"
                        fill="#09BD3C"
                      />
                    </svg>
                    <small className="d-block fs-16 font-w400 text-success">
                      +0,5%
                    </small>
                  </span>
                </div> */}
              {/* </div> */}

              {/* <div className="bg-gradient1 rounded text-center p-3">
                <div className="d-inline-block position-relative donut-chart-sale mb-3">
                  <div style={{ height: 100, width: 100 }}>
                    <Line
                      data={lineData}
                      options={lineOptions}
                      height={100}
                      width={100}
                    />
                    <PolarChart />
                  </div>
                </div>
              </div> */}
            </div>
            <div className="d-flex flex-column px-4 pb-0 justify-content-between ">
              {/* <div>
                <div className="d-flex align-items-center justify-content-between">
                  <h5 className="mx-1 fs-18 font-w700 mb-0">SOLID</h5>
                  <h5 className="fs-18 font-w400 mb-0">
                    {valueFormatter(
                      coinReducer?.totalCommission?.totalSolidCommission
                    )}
                    <span className="mx-1">
                      <img
                        src={solidTokenImage}
                        width="15px"
                        height="15px"
                        style={{
                          objectFit: "contain",
                          marginRight: "10px",
                          marginTop: "-3px",
                        }}
                      />
                    </span>
                  </h5>
                </div>
              </div> */}
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <h5 className="mx-1 fs-18 font-w700 mb-0">STAND</h5>
                  <div>
                    <h5 className="fs-18 font-w400 mb-0">
                      {valueFormatter(
                        coinReducer?.totalCommission?.totalStandCommission
                      )}
                      <span className="mx-1">
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
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header border-0">
              <h4 className="fs-20 font-w700">Project Statistics</h4>
              <Dropdownblog />
            </div>
            <div className="card-body pb-3">
              <div id="reservationChart" className="reservationChart">
                <ReservationChart />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header border-0">
              <h4 className="fs-20 font-w700">Project Statistics</h4>
              <Dropdownblog />
            </div>
            <div className="card-body pb-3">
              <div id="reservationChart" className="reservationChart">
                <LineChart1 />
              </div>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};
export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Dropdown, Modal } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import TabelComponent from "../../layouts/TabelComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  updateUserLevel,
  saveDefaultPer,
  getAdminDefaultPer,
  uerLelevRewards,
  getUserLevelRewards,
} from "../../../Redux/user";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { errorMessage } from "../../../utils/message";
import { findAllByTestId } from "@testing-library/react";

const svg1 = (
  <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <rect x="0" y="0" width="24" height="24"></rect>
      <circle fill="#000000" cx="5" cy="12" r="2"></circle>
      <circle fill="#000000" cx="12" cy="12" r="2"></circle>
      <circle fill="#000000" cx="19" cy="12" r="2"></circle>
    </g>
  </svg>
);
const UserList = (props) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);
  const [isSearched, setIsSearched] = useState("");
  const [errors, setErrors] = useState({
    level1_reward: false,
    level2_reward: false,
    level11_reward: false,
    level22_reward: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [userRewards, setUserRewards] = useState({
    level: 1,
    level11_reward: "",
    level22_reward: "",
    user_id: "",
  });
  const [defaultPer, setDefaultPer] = useState({
    id: "",
    level1_reward: "",
    level2_reward: "",
  });

  useEffect(async () => {
    dispatch(allUsers());
    let res = await dispatch(getAdminDefaultPer());
    setDefaultPer(res.payload);
  }, []);

  const handelChange = (e) => {
    if (e.target.value < 0) {
      setErrors({ ...errors, [e.target.name]: true });
      return;
    }
    setUserRewards({
      ...userRewards,
      [e.target.name]: e.target.value,
      // ?.replace(/[^0-9]/g, ""),
    });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handelChangedefaultPer = (e) => {
    if (e.target.value < 0) {
      setErrors({ ...errors, [e.target.name]: true });
      return;
    }
    setDefaultPer({
      ...defaultPer,
      [e.target.name]: e.target.value,
      // ?.replace(/[^0-9]/g, ""),
    });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handelChangeCheckBox = (e) => {
    if (e.target.checked) {
      setUserRewards({ ...userRewards, level: 2 });
    } else {
      setUserRewards({
        ...userRewards,
        level: 1,
        level2_reward: "",
      });
    }
  };

  const handelUpdateUserlevels = async () => {
    dispatch(
      updateUserLevel({
        user_id: userRewards.user_id,
        level: userRewards.level,
      })
    );

    let response = await dispatch(
      uerLelevRewards({
        user_id: userRewards.user_id,
        level1_reward: userRewards.level11_reward
          ? userRewards.level11_reward
          : defaultPer.level1_reward,
        level2_reward: userRewards.level22_reward
          ? userRewards.level22_reward
          : defaultPer.level2_reward,
      })
    );
    setShowModal(false);
    if (response.payload) {
      dispatch(allUsers());
    }
    // setUserRewards({
    //   ...userRewards,
    //   user_id: "",
    //   level: "1",
    //   level2_reward: "",
    //   level1_reward: "",
    // });
  };

  const openModel = async (user_id, user_level) => {
    let data = await dispatch(getUserLevelRewards(user_id));
    setShowModal(true);
    setUserRewards({
      ...userRewards,
      user_id,
      level: user_level,
      level11_reward: data.payload
        ? data.payload.level1_reward
        : defaultPer.level1_reward,
      level22_reward: data.payload
        ? data.payload.level2_reward
        : defaultPer.level2_reward,
    });
  };

  const closeModel = async () => {
    setShowModal(false);
    setUserRewards({
      ...userRewards,
      user_id: "",
      level: "",
      level2_reward: "",
    });
  };

  const randerTable = () => {
    return [
      {
        title: "#",
        render: (rowData) => {
          return <span>{rowData?.count}</span>;
        },
      },
      {
        title: "TIME",
        render: (rowData) => {
          return (
            <span>
              {moment(rowData?.user?.created_at).format("YYYY-MM-DD hh:mm a")}
            </span>
          );
        },
      },
      {
        title: "USERNAME",
        render: (rowData) => {
          return <span>{rowData?.user?.user_name}</span>;
        },
      },
      {
        title: "EMAIL",
        render: (rowData) => {
          return <span>{rowData?.user?.email}</span>;
        },
      },
      {
        title: "LEVEL 1",
        render: (rowData) => {
          return (
            <span>
              {rowData?.level1_reward
                ? rowData?.level1_reward + "%"
                : userReducer.getAdminDefaultPer.level1_reward + "%"}
            </span>
          );
        },
      },
      {
        title: "LEVEL 2",
        render: (rowData) => {
          return (
            <span>
              {rowData?.user?.level === 2
                ? rowData?.level2_reward
                  ? rowData?.level2_reward + "%"
                  : userReducer?.getAdminDefaultPer?.level2_reward + "%"
                : "Disabled"}
            </span>
          );
        },
      },
      {
        title: "Action",
        render: (rowData) => {
          return (
            <>
              <BorderColorIcon
                className="c-pointer"
                onClick={() => openModel(rowData.user_id, rowData.user.level)}
              />
              {/* <Dropdown>
                <Dropdown.Toggle
                  variant="primary"
                  className="light sharp i-false"
                >
                  {svg1}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => changeUserlevel(rowData?.id, 1)}
                  >
                    Level 1
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => changeUserlevel(rowData?.id, 2)}
                  >
                    level 2
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            </>
          );
        },
      },
    ];
  };

  const saveChanges = async () => {
    if (defaultPer.level1_reward === "") {
      errorMessage("please enter level 1 reward");
      return;
    }
    if (defaultPer.level2_reward === "") {
      errorMessage("please enter level 2 reward");
      return;
    }

    const res = await dispatch(
      saveDefaultPer({
        id: defaultPer.id,
        data: {
          level1_reward: defaultPer.level1_reward,
          level2_reward: defaultPer.level2_reward,
        },
      })
    );

    if (res.payload.data) {
      dispatch(getAdminDefaultPer());
      dispatch(allUsers());
    }
  };

  return (
    <>
      <div
        className="c-pointer "
        style={{ marginBottom: "20px" }}
        onClick={() => props.history.push("/admin-dashboard")}
      >
        <KeyboardBackspaceIcon />
      </div>
      <div>
        <PageTitle motherMenu="Admin" activeMenu="Users List" />
        <div className="d-flex justify-content-between align-items-center p-3">
          <div>
            <label>Level 1 Reward</label>
            <div className="d-flex align-items-center">
              <input
                className="form-control "
                placeholder="Change Lavel 1 %"
                name="level1_reward"
                type="number"
                value={defaultPer?.level1_reward}
                onChange={(e) => handelChangedefaultPer(e)}
              />
              <span className="mx-1">%</span>
            </div>
            {errors?.level1_reward && (
              <h5
                className="emailError"
                style={{ color: "red", fontSize: "12px" }}
              >
                value must be a positive integer
              </h5>
            )}
          </div>
          <div>
            <label>Level 2 Reward</label>
            <div className="d-flex align-items-center">
              <input
                className="form-control"
                placeholder="Change Lavel 2 %"
                name="level2_reward"
                type="number"
                value={defaultPer?.level2_reward}
                onChange={(e) => handelChangedefaultPer(e)}
              />
              <span className="mx-1">%</span>
            </div>
            {errors?.level2_reward && (
              <h5
                className="emailError"
                style={{ color: "red", fontSize: "12px" }}
              >
                value must be a positive integer
              </h5>
            )}
          </div>

          <Button onClick={() => saveChanges()} variant="primary">
            Save Changes
          </Button>
        </div>
        <div className="d-flex justify-content-between align-items-center p-3">
          <input
            type="text"
            className="form-control search-field w-25"
            placeholder="Search by user name or email"
            value={isSearched}
            onChange={(e) => setIsSearched(e.target.value)}
          />
        </div>
        <Col lg={12}>
          <TabelComponent
            cols={randerTable()}
            data={[...userReducer?.allUsers]
              ?.filter((data) => {
                if (isSearched === "") {
                  return data;
                } else if (
                  data?.user?.user_name
                    ?.toLowerCase()
                    ?.includes(isSearched.toLowerCase())
                ) {
                  return data;
                } else if (
                  data?.user?.email
                    ?.toLowerCase()
                    ?.includes(isSearched.toLowerCase())
                ) {
                  return data;
                }
              })
              .reverse()
              .map((obj, index) => {
                return {
                  ...obj,
                  count: index + 1,
                };
              })}
            tabeltitle={"Users List"}
            itemsPerPage={8}
          />
        </Col>
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
              <h2 className="text-center w-100"> Change User Level Settings</h2>
            </Modal.Title>
            <Button
              onClick={() => closeModel()}
              variant=""
              className="btn-close"
            ></Button>
          </Modal.Header>
          <Modal.Body>
            <div class="form-group">
              <div className="d-flex justify-content-center align-items-center p-3">
                <div>
                  <label>Level 1</label>
                  <input className="mx-3" type="checkbox" checked={true} />
                </div>
                <div className="d-flex  align-items-center">
                  <input
                    className="form-control w-100"
                    placeholder="Change Lavel 1 %"
                    name="level11_reward"
                    type="number"
                    value={userRewards?.level11_reward}
                    onChange={(e) => handelChange(e)}
                  />
                  <span className="mx-1">%</span>
                </div>
              </div>
              {errors?.level11_reward && (
                <h5
                  className="emailError d-flex justify-content-center"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  value must be a positive integer
                </h5>
              )}
              <div className="d-flex justify-content-center align-items-center p-3">
                <div>
                  <label>Level 2</label>
                  <input
                    className="mx-3"
                    type="checkbox"
                    onChange={(e) => handelChangeCheckBox(e)}
                    checked={userRewards.level == 2 ? true : false}
                  />
                </div>
                <div className="d-flex  align-items-center">
                  <input
                    disabled={userRewards.level == 1 ? true : false}
                    className="form-control w-100"
                    placeholder="Change Lavel 2 %"
                    name="level22_reward"
                    type="number"
                    value={userRewards?.level22_reward}
                    onChange={(e) => handelChange(e)}
                  />
                  <span className="mx-1">%</span>
                </div>
              </div>
              {errors?.level22_reward && (
                <h5
                  className="emailError d-flex justify-content-center"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  value must be a positive integer
                </h5>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handelUpdateUserlevels()} variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default UserList;

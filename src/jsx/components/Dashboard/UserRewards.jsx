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
import { getAllUserRewards } from "../../../Redux/coins";

const UserRewards = (props) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);
  const coinReducer = useSelector((store) => store.coinReducer);
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
    dispatch(getAllUserRewards());
  }, []);

  const randerTable = () => {
    return [
      {
        title: "#",
        render: (rowData) => {
          return <span>{rowData?.count}</span>;
        },
      },
      {
        title: "REFERED TO",
        render: (rowData) => {
          return <span>{rowData?.refered_to}</span>;
        },
      },
      {
        title: "LEVEL 1 REFER",
        render: (rowData) => {
          return <span>{rowData?.refer1 ? rowData?.refer1 : "none"}</span>;
        },
      },
      {
        title: "LEVEL 2 REFER",
        render: (rowData) => {
          return <span>{rowData?.refer2 ? rowData?.refer2 : "none"}</span>;
        },
      },
      {
        title: "LEVEL 1 REWARD",
        render: (rowData) => {
          return <span>{rowData?.reward1}</span>;
        },
      },
      {
        title: "LEVEL 2 REWARD",
        render: (rowData) => {
          return <span>{rowData?.reward2 ? rowData?.reward2 : 0.0}</span>;
        },
      },
      {
        title: "STATUS",
        render: (rowData) => {
          return (
            <>
              <Badge
                variant={`${
                  rowData?.type === "canceled"
                    ? "danger light"
                    : rowData?.type === "approved"
                    ? "success light"
                    : "warning light"
                }`}
              >
                {rowData?.type}
              </Badge>
            </>
          );
        },
      },
    ];
  };

  return (
    <>
      <div>
        <PageTitle motherMenu="Admin" activeMenu="Users Reward" />

        <Col lg={12}>
          <TabelComponent
            cols={randerTable()}
            data={[...coinReducer?.allUserRewards]
              ?.reverse()
              .map((obj, index) => {
                return {
                  ...obj,
                  count: index + 1,
                };
              })}
            tabeltitle={"Users Reward"}
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
      </div>
    </>
  );
};

export default UserRewards;

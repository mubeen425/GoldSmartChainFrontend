import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserWallet,
  getSolidCoin,
  getStandCoin,
} from "../../../Redux/coins";

import ProjectSlider from "./Dashboard/ProjectSlider";
import SolidCoinHistory from "../AppsMenu/AppProfile/SolidCoinHistory";
import CookieBanner from "../CookieBanner";

const cookies = new Cookies();
const Home = (props) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store?.userReducer);
  const coinReducer = useSelector((store) => store?.coinReducer);
  const tokn = cookies.get("reflink");

  useEffect(() => {
    if (tokn) {
      dispatch(getUserWallet(userReducer?.currentUser?.id));
      dispatch(getSolidCoin(userReducer?.currentUser?.id));
      dispatch(getStandCoin(userReducer?.currentUser?.id));
    }
  }, []);

  return (
    <>
      <CookieBanner />
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="row m-auto">
                <div className="col-xl-12 col-md-12 col-xxl-12">
                  <div className="card" id="user-activity">
                    <div className="card-header border-0 pb-0 flex-wrap">
                      <div>
                        <span className="mb-0 d-block fs-22">
                          <strong>Welcome Back!</strong>
                        </span>
                      </div>
                    </div>
                    <br />
                    <div className="col-xl-12">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-md-12">
              <div className="row m-auto">
                <div className="col-xl-12 col-lg-12 col-md-12 ">
                  <SolidCoinHistory />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;

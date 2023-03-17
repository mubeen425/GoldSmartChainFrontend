import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { baseURL, tradeAPI } from "../../../../Strings/Strings";
import standCoin from "../../../../images/stand.png";
import solidToken from "../../../../images/solid.png";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import axiosInstance from "../../../../services/AxiosInstance";
import { valueFormatter } from "../../../../services/valueFormatter";

const ProjectSlider = (props) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);
  const [data, setData] = useState([]);
  const [coins, setCoins] = useState(0);
  const [invest, setInvest] = useState(0);
  const [coin, setCoin] = useState();
  const [solid, setSolid] = useState();
  const [isLoaded, setIsLoaded] = useState({ coin: false, token: false });

  useEffect(() => {
    setIsLoaded({ ...isLoaded, coin: true });
    axiosInstance
      .get(`api/solidcoin/${userReducer?.currentUser?.id}`)
      .then((res) => {
        setCoin(res?.data?.solid_coin);
        setIsLoaded({ ...isLoaded, coin: false });
      })
      .catch((e) => {
    
      });
    axiosInstance
      .get(`api/exchangecoin/${userReducer?.currentUser?.id}`)
      .then((res) => {
      
        setSolid(res?.data?.exchange_coin_amount);
        setIsLoaded({ ...isLoaded, token: false });
      })
      .catch((e) => {
    
      });
    setIsLoaded({ ...isLoaded, coin: false, token: false });
  }, []);


  useEffect(() => {
    let usr = localStorage.getItem("user");
    usr = JSON.parse(usr);
  }, [props.history]);


  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1401,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {/* <Slider className="owl-carousel card-slider" {...settings}> */}
      <div className="main_slider">
        <div className="items w-100">
          <div className="slide-info">
            <div className="d-flex align-items-center mb-3">
              <div className="slide-icon"></div>
            </div>
            <center>
              <div
                style={{
                  display: "flex",
                  // alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={standCoin}
                  alt=""
                  width="64px"
                  height="64px"
                  style={{
                    objectFit: "contain",
                    marginRight: "24px",
                    //  flex: 5
                  }}
                />
                <div
                  className="minimal_width"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    // flex: 5,
                  }}
                >
                  <span className="mb-7 d-block fs-28 fw-bold text-start">
                    STAND
                  </span>
                  <span className="mb-0 d-block fs-22 text-start">
                    {isLoaded.coin ? (
                      <Spinner animation="grow" />
                    ) : (
                      <strong>
                        {props.coin <= 1 ? (
                          <p className="paragraph_style">0.0</p>
                        ) : (
                          <CurrencyFormat
                            value={Number(props.coin - 1)}
                            displayType={"text"}
                            // decimalScale={4}
                            thousandSeparator={true}
                            fixedDecimalScale={true}
                            renderText={(value) => (
                              <p className="paragraph_style">{value}</p>
                            )}
                          />
                        )}
                      </strong>
                    )}
                  </span>
                </div>
              </div>
            </center>
          </div>
        </div>
        <div className="items w-100">
          <div className="slide-info">
            <div className="d-flex align-items-center mb-3">
              <div className="slide-icon"></div>
            </div>
            <center>
              <div
                style={{
                  display: "flex",
                  // alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={solidToken}
                  alt=""
                  width="64px"
                  height="64px"
                  style={{
                    objectFit: "contain",
                    marginRight: "24px",
                    //  flex: 5
                  }}
                />
                <div
                  className="minimal_width"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    // flex: 5,
                  }}
                >
                  <span className="mb-7 d-block fs-28 fw-bold text-start">
                    SOLID
                  </span>
                  <span className="mb-0 d-block fs-22 text-start">
                    {/* <strong>{props?.token}</strong> */}
                    {isLoaded.token ? (
                      <Spinner animation="grow" />
                    ) : (
                      <strong>
                        {props.solid > 0 ? (
                          <CurrencyFormat
                            // value={props.solid}
                            value={props.solid}
                            displayType={"text"}
                            // decimalScale={2}
                            thousandSeparator={true}
                            fixedDecimalScale={true}
                            renderText={(value) => (
                              <p className="paragraph_style">{value}</p>
                            )}
                          />
                        ) : (
                          <p className="paragraph_style">0.00</p>
                        )}
                      </strong>
                    )}
                  </span>
                </div>
              </div>
            </center>
          </div>
        </div>
        {/* <div className="items">
          <div className="slide-info">
            <div className="d-flex align-items-center mb-3">
              <div className="slide-icon"></div>
            </div>
            <center>
              <span className="mb-3 d-block fs-22">
                <strong>$ 0.00</strong>
              </span>

              <span className="mb-7 d-block fs-18">Profit/Loss</span>
            </center>
          </div>
        </div> */}
        {/* </Slider> */}
      </div>
    </>
  );
};
export default ProjectSlider;

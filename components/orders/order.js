import React, { useState, useEffect } from "react";
import "./orders.css";
import { useRouter } from "next/router";
import Rating from "./rating";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import moment from "moment-jalaali";
import Notiflix from "notiflix";
import { addCommas } from "persian-tools2";
import Link from "next/link";
import axios from "axios";

const theme = createMuiTheme({
  direction: "rtl",
});

const Orders = (props) => {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(false);

  let timesHolder = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];
  let url = process.env.url;
  let token = null;
  if (typeof window != "undefined")
    token = JSON.parse(localStorage.getItem("accessToken"));

  Notiflix.Notify.Init({
    width: "250px",
    useIcon: false,
    fontSize: "14px",
    fontFamily: "IRANSansWeb",
    position: "center-top",
    closeButton: true,
    rtl: true,
    cssAnimationStyle: "from-top",
  });
  Notiflix.Loading.Init({
    svgColor: process.env.loadingDotsColor,
  });

  const closeModal = () => {
    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
      var myobj = document.getElementById("NotiflixNotifyWrap");
      myobj.remove();
    }
    if (document.getElementById("NotiflixLoadingWrap") != undefined) {
      var myobj = document.getElementById("NotiflixLoadingWrap");
      myobj.remove();
    }
    setShowModal(false);
  };

  const viewModal = () => {
    setShowModal(true);
  };
  return (
    <MuiThemeProvider theme={theme}>
      <Row className="orderSummary">
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          {props.order.user_car != null ? (
            <div>
              خودروی انتخاب شده :{props.order.user_car.model.brand.name}-
              {props.order.user_car.model.name}
            </div>
          ) : null}
          <div>
            خدمات انتخاب شده :{" "}
            {
              props.order.items
                .map(function (elem) {
                  return elem.title;
                })
                .join(" - ")
              /*props.order.items.map((service, index) =>
                        service.title + " . "
                    )*/
            }
          </div>

          <div>هزینه : {addCommas(props.order.final)} تومان</div>

          <div>
            زمان شست و شو :
            {moment(props.order.reserved_day)
              .locale("fa")
              .format("dddd jD jMMMM jYYYY")}{" "}
            از ساعت{" "}
            {[
              props.order.human_reserved_time.slice(0, 2),
              ":",
              props.order.human_reserved_time.slice(2),
            ].join("")}
            &nbsp; تا{" "}
            {props.order.human_reserved_time == "2100"
              ? "23:00"
              : props.order.human_reserved_time == "2200"
              ? "24:00"
              : timesHolder[
                  timesHolder.indexOf(
                    [
                      props.order.human_reserved_time.slice(0, 2),
                      ":",
                      props.order.human_reserved_time.slice(2),
                    ].join("")
                  ) + 2
                ]}
          </div>
          <div>محل شست و شو : {props.order.user_address.description}</div>
          <div>
            وضعیت درخواست :{" "}
            {props.order.human_status == "init"
              ? "جدید"
              : props.order.human_status == "waiting_for_payment"
              ? "در انتظار پرداخت"
              : props.order.human_status == "payment_done"
              ? "پرداخت شده"
              : props.order.human_status == "payment_failed"
              ? "پرداخت ناموفق"
              : props.order.human_status == "confirmed"
              ? "تایید شده توسط اپراتور"
              : props.order.human_status == "accepted"
              ? "تایید شده توسط واشمن"
              : props.order.human_status == "done"
              ? "اتمام درخواست"
              : props.order.human_status == "canceled_by_user"
              ? "درخواست توسط شما لغو شده است."
              : props.order.human_status == "canceled_by_operator"
              ? "درخواست توسط اپراتور لغو شده است."
              : props.order.human_status == "canceled_by_system"
              ? "درخواست توسط سیستم لغو شده است."
              : props.order.human_status == "archived"
              ? "اتمام"
              : "-"}
          </div>

          {
            <div className="btns">
              {props.order.can_be_rated && (
                <div>
                  <Button
                    className="beforeAfterBtn"
                    variant="contained"
                    onClick={() => viewModal()}
                  >
                    امتیازدهی
                  </Button>
                </div>
              )}
              {props.order.online_payable && (
                <div>
                  <Button
                    className="beforeAfterBtn"
                    variant="contained"
                    onClick={() => props.pay(props.order.id)}
                  >
                    پرداخت
                  </Button>
                </div>
              )}
              {props.order.images.before != null ||
              props.order.images.after != null ? (
                <div>
                  <Button
                    className="beforeAfterBtn"
                    variant="contained"
                    onClick={() =>
                      viewModal(
                        props.order.images.before,
                        props.order.images.after
                      )
                    }
                  >
                    مشاهده تصاویر
                  </Button>
                </div>
              ) : null}
              {props.order.editable && (
                <React.Fragment>
                  <div>
                    <Button
                      className="editBtn"
                      variant="contained"
                      onClick={() => props.viewEditAddressModal(props.order.id)}
                    >
                      ویرایش مکان سفارش
                    </Button>
                  </div>

                  <div>
                    <Button
                      className="editBtn"
                      variant="contained"
                      onClick={() =>
                        props.viewEditTimeModal(
                          props.order.id,
                          props.order.human_reserved_time,
                          props.order.reserved_day
                        )
                      }
                    >
                      ویرایش زمان سفارش
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </div>
          }

          {/*<div>میزان رضایت:<StarRatings
                                        rating={4}
                                        starDimension="20px"
                                        starSpacing="5px"
                                        starRatedColor="#00878B"
                                    />
                                    </div>*/}
        </Col>
        <Rating
          open={showModal}
          onClose={closeModal}
          orderId={props.order.id}
        />
      </Row>
    </MuiThemeProvider>
  );
};
export default Orders;

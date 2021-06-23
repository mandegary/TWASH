import React, { useState, useEffect } from "react";
import "./orders.css";
import { useRouter } from "next/router";
import StarRatings from "react-star-ratings";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Col, Container, Row } from "react-bootstrap";
import { Button, TextField } from "@material-ui/core";
import Notiflix from "notiflix";
import Link from "next/link";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";

const theme = createMuiTheme({
  direction: "rtl",
});

const Rating = (props) => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = React.useState(false);

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

  const ratingHandler = (newRating, name) => {
    setValue(newRating);
  };

  const createRate = () => {
    if (value == 0) {
      Notiflix.Notify.Failure("لطفا امتیاز خود را از 1 تا 5 ثبت کنید.");
    } else {
      Notiflix.Loading.Dots();
      let data = new FormData();
      data.append("rating", value);
      data.append("description", description);

      axios
        .post(url + `/order/${props.orderId}/rate`, data, {
          headers: {
            Accept: "application/json",
            dataType: "json", //you may use jsonp for cross origin request
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token,
          },
        })
        .then((responseJson) => {
          if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
          }
          if (document.getElementById("NotiflixLoadingWrap") != undefined) {
            var myobj = document.getElementById("NotiflixLoadingWrap");
            myobj.remove();
          }
          if (responseJson.data.message == "امتیاز با موفقیت ثبت شد.") {
            Notiflix.Notify.Success("امتیاز با موفقیت ثبت شد.");
            props.onClose();
          } else {
            Notiflix.Notify.Failure("لطفا دوباره تلاش کنید!");
          }
        })
        .catch((error) => {
          if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
          }
          if (document.getElementById("NotiflixLoadingWrap") != undefined) {
            var myobj = document.getElementById("NotiflixLoadingWrap");
            myobj.remove();
          }
          if (error.response) {
            if (error.response.status == 422) {
              Notiflix.Notify.Failure(error.response.data.errors["rating"][0]);
            }
          }
        });
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
        className=""
        style={{ textAlign: "center" }}
      >
        <DialogTitle id="form-dialog-title">امتیاز</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <Row dir="rtl">
                <Col
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className="d-flex flex-column justify-content-center align-items-center mb-3"
                >
                  <div className="w-100 text-center mb-3">
                    امتیاز شما به خدمات ارائه شده از 1تا5
                  </div>
                  <div className="w-100 text-center">
                    <StarRatings
                      rating={value}
                      starRatedColor="#ffb400"
                      starHoverColor="rgb(249, 234, 13)"
                      changeRating={(newRating) => ratingHandler(newRating)}
                      numberOfStars={5}
                      starDimension="30px"
                      name="rating"
                    />
                  </div>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="توضیحات"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={createRate}
            color="primary"
            variant="fill"
            className="dialogBtn"
          >
            تایید
          </Button>
          <Button
            onClick={props.onClose}
            color="primary"
            variant="fill"
            className="dialogBtn"
          >
            لغو
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
};
export default Rating;

import React, {useState, useEffect} from "react";
import "./orders.css"
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Col, Container, Row} from "react-bootstrap";
import {
    Button,
    Radio,
    MenuItem,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    TextField
} from "@material-ui/core";
import moment from "moment-jalaali";
import StarRatings from 'react-star-ratings';
import {verifyToken} from "../Helpers";
import delBtn from "../../assets/images/del.svg";
import Notiflix from "notiflix";
import {addCommas} from "persian-tools2";
import Link from "next/link";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import cloudComputing from "../../assets/images/cloud-computing.png";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

const theme = createMuiTheme({
    direction: 'rtl'
});

const Orders = (props) => {
    const [ordersHolder, setOrdersHolder] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = React.useState(false);
    const [beforeImg, setBeforeImg] = useState("");
    const [afterImg, setAfterImg] = useState("");

    let url = process.env.url;
    Notiflix.Notify.Init({
        width: '250px',
        useIcon: false,
        fontSize: '14px',
        fontFamily: "IRANSansWeb",
        position: "center-top",
        closeButton: true,
        rtl: true,
        cssAnimationStyle: 'from-top'
    });
    Notiflix.Loading.Init({
        svgColor: process.env.loadingDotsColor
    });

    useEffect(() => {
        fetchOrders()
    }, [])

    let token = null;
    if (typeof window != "undefined")
        token = JSON.parse(localStorage.getItem('accessToken'));

    let timesHolder = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "24:00", "00:30", "01:00", "01:30", "02:00"
    ];
    const closeModal = () => {
        setShowModal(false);
    }
    const viewModal = (prev, next) => {
        setBeforeImg(prev)
        setAfterImg(next)
        setShowModal(true)
    }

    const fetchOrders = () => {
        Notiflix.Loading.Dots();
        const abortController = new AbortController()
        const promise = window
            .fetch(url + '/order', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'dataType': 'jsonp',   //you may use jsonp for cross origin request
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': "Bearer " + token
                },
                method: 'GET',
                mode: 'cors',
                signal: abortController.signal
            })
            .then(res => res.json())
            .then(responseJson => {
                if (verifyToken(responseJson))
                    if (responseJson.message == "سفارشات با موفقیت دریافت شد") {

                        if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                            var myobj = document.getElementById("NotiflixLoadingWrap");
                            myobj.remove();
                        }
                        setOrdersHolder(responseJson.orders.map((order, index) =>
                                <Row className="orderSummary">
                                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                        {order.user_car != null ?
                                            <div>خودروی انتخاب شده :
                                                {order.user_car.model.brand.name}
                                                -
                                                {order.user_car.model.name}

                                            </div>
                                            : null
                                        }
                                        <div>خدمات انتخاب شده : {
                                            order.items.map(function (elem) {
                                                return elem.title;
                                            }).join(" - ")
                                            /*order.items.map((service, index) =>
                                                service.title + " . "
                                            )*/
                                        }</div>
                                        <div>زمان شست و شو :
                                            مورخ {moment(order.reserved_day).locale('fa').format('jYYYY/jM/jD')} از ساعت {
                                                [order.human_reserved_time.slice(0, 2), ":", order.human_reserved_time.slice(2)].join('')
                                            }
                                            تا {
                                                timesHolder[timesHolder.indexOf([order.human_reserved_time.slice(0, 2), ":", order.human_reserved_time.slice(2)].join('')) + 4]
                                            }</div>
                                        <div>هزینه : {addCommas(order.final)} تومان</div>
                                        <div>وضعیت درخواست : {
                                            order.human_status == "init" ? "جدید" :
                                                order.human_status == "waiting_for_payment" ? "در انتظار پرداخت" :
                                                    order.human_status == "payment_done" ? "پرداخت شده" :
                                                        order.human_status == "payment_failed" ? "پرداخت ناموفق" :
                                                            order.human_status == "confirmed" ? "تایید شده توسط اپراتور" :
                                                                order.human_status == "accepted" ? "تایید شده توسط واشمن" :
                                                                    order.human_status == "done" ? "اتمام درخواست" :
                                                                        order.human_status == "canceled_by_user" ? "درخواست توسط شما لغو شده است." :
                                                                            order.human_status == "canceled_by_operator" ? "درخواست توسط اپراتور لغو شده است." :
                                                                                order.human_status == "canceled_by_system" ? "درخواست توسط سیستم لغو شده است." :
                                                                                    order.human_status == "archived" ? "اتمام" :
                                                                                        "-"
                                        }</div>
                                        {
                                            order.images.before != null || order.images.after != null ?
                                                <div>
                                                    <Button className="beforeAfterBtn" variant="contained"
                                                            onClick={() => viewModal(order.images.before, order.images.after)}>مشاهده
                                                        تصاویر</Button>
                                                </div>
                                                : null
                                        }

                                        {/*<div>محل شست و شو : ...</div>*/}
                                        {/*<div>میزان رضایت:<StarRatings
                                        rating={4}
                                        starDimension="20px"
                                        starSpacing="5px"
                                        starRatedColor="#00878B"
                                    />
                                    </div>*/}
                                    </Col>
                                </Row>
                            )
                        )
                        setLoading(false)
                    }
            })
            .catch(err => {
                console.log(err)
            })
        // Cancel the request if it takes more than delayFetch seconds
        setTimeout(() => abortController.abort(), process.env.delayFetch)
    };
    return (
        <MuiThemeProvider theme={theme}>
            <div className="ordersInfo" dir="rtl">
                <Container>
                    {!loading && ordersHolder == "" ?
                        <div className="no-order">
                            <h3>
                                شما تا کنون سفارشی ثبت نکرده اید.
                            </h3>
                            <p>برای ایجاد سفارش جدید بر روی لینک زیر کلیک کنید.</p>
                            <Link href="/order">
                                <a href="/order">ادامه</a>
                            </Link>
                        </div>
                        :
                        <React.Fragment>
                            {
                                ordersHolder
                            }
                            <Dialog open={showModal} onClose={closeModal} aria-labelledby="form-dialog-title"
                                    className="absenseDialog">
                                <DialogTitle id="form-dialog-title">مشاهده تصاویر</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <div className="beforeAfter">
                                            <div><img src={beforeImg}/><span>تصویر قبل</span></div>
                                            <div><img src={afterImg}/><span>تصویر بعد</span></div>
                                        </div>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeModal} color="primary" variant="fill" className="dialogBtn">
                                        تایید
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    }
                </Container>
            </div>
        </MuiThemeProvider>
    );
}
export default Orders
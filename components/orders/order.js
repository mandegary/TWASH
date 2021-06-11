import React, {useState, useEffect} from "react";
import "./orders.css"
import {useRouter} from "next/router";
import Rating from '@material-ui/lab/Rating';
import StarRatings from 'react-star-ratings';
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
    TextField, InputLabel, Select,Box
} from "@material-ui/core";
import moment from "moment-jalaali";
import {VerifyToken, verifyToken} from "../Helpers";
import Notiflix from "notiflix";
import {addCommas} from "persian-tools2";
import Link from "next/link";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DatePicker from "react-datepicker2";
import down from "../../assets/images/down.png";
import axios from "axios";
/*import NewLocationForm from "../user/newLocationMap";*/
import NewLocationForm from "../order/mapp";
import delBtn from "../../assets/images/del.svg";

const theme = createMuiTheme({
    direction: 'rtl'
});

const Orders = (props) => {
    const router = useRouter()
    const [value, setValue] = useState(0);
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = React.useState(false);

    let timesHolder = [ "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00",
        "20:00", "21:00", "22:00"
    ];
    let url = process.env.url;
    let token = null;
    if (typeof window != "undefined")
        token = JSON.parse(localStorage.getItem('accessToken'));

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

    const ratingHandler =(newRating, name) => {
        setValue(newRating);
    }
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
    }
    const createRate = () => {
        if(value==0)
        {
            Notiflix.Notify.Failure("لطفا امتیاز خود را از 1 تا 5 ثبت کنید.");
        }
        else{
            Notiflix.Loading.Dots();
            let data = new FormData()
            data.append('rating', value)
            data.append('description', description)


            axios.post(url + `/order/${props.order.id}/rate`, data, {
                headers: {
                    'Accept': 'application/json',
                    'dataType': 'json',   //you may use jsonp for cross origin request
                    'Content-Type': "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': "Bearer " + token
                }
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
                        Notiflix.Notify.Success('امتیاز با موفقیت ثبت شد.');
                        setShowModal(false);
                    }
                    else {
                        Notiflix.Notify.Failure('لطفا دوباره تلاش کنید!');
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
                        if(error.response.status==422)
                        {
                            Notiflix.Notify.Failure(error.response.data.errors["rating"][0]);
                        }
                    }
                })
        }

        
    }
    const viewModal = () => {
        setShowModal(true)
    }
    return (
        <Row className="orderSummary">
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                {props.order.user_car != null ?
                    <div>خودروی انتخاب شده :
                        {props.order.user_car.model.brand.name}
                        -
                        {props.order.user_car.model.name}

                    </div>
                    : null
                }
                <div>خدمات انتخاب شده : {
                    props.order.items.map(function (elem) {
                        return elem.title;
                    }).join(" - ")
                    /*props.order.items.map((service, index) =>
                        service.title + " . "
                    )*/
                }</div>

                <div>هزینه : {addCommas(props.order.final)} تومان</div>

                <div>زمان شست و شو :
                    {moment(props.order.reserved_day).locale('fa').format('dddd jD jMMMM jYYYY')} از ساعت {
                        [props.order.human_reserved_time.slice(0, 2), ":", props.order.human_reserved_time.slice(2)].join('')
                    }
                    &nbsp;
                    تا {props.order.human_reserved_time == "2100"?
                        "23:00"
                        :
                        props.order.human_reserved_time == "2200"?
                            "24:00"
                            :
                            timesHolder[timesHolder.indexOf([props.order.human_reserved_time.slice(0, 2), ":", props.order.human_reserved_time.slice(2)].join('')) + 2]
                    }</div>
                <div>محل شست و شو : {
                    props.order.user_address.description
                }</div>
                <div>وضعیت درخواست : {
                    props.order.human_status == "init" ? "جدید" :
                        props.order.human_status == "waiting_for_payment" ? "در انتظار پرداخت" :
                            props.order.human_status == "payment_done" ? "پرداخت شده" :
                                props.order.human_status == "payment_failed" ? "پرداخت ناموفق" :
                                    props.order.human_status == "confirmed" ? "تایید شده توسط اپراتور" :
                                        props.order.human_status == "accepted" ? "تایید شده توسط واشمن" :
                                            props.order.human_status == "done" ? "اتمام درخواست" :
                                                props.order.human_status == "canceled_by_user" ? "درخواست توسط شما لغو شده است." :
                                                    props.order.human_status == "canceled_by_operator" ? "درخواست توسط اپراتور لغو شده است." :
                                                        props.order.human_status == "canceled_by_system" ? "درخواست توسط سیستم لغو شده است." :
                                                            props.order.human_status == "archived" ? "اتمام" :
                                                                "-"
                }</div>

                {
                    <div className="btns">
                        {
                            props.order.can_be_rated &&
                            <div>
                                <Button className="beforeAfterBtn" variant="contained" onClick={()=>viewModal()}>
                                    امتیازدهی
                                </Button>
                            </div>
                        }
                        {
                            props.order.online_payable &&
                                <div>
                                    <Button className="beforeAfterBtn" variant="contained" onClick={()=>props.pay(props.order.id)}>
                                        پرداخت
                                    </Button>
                                </div>
                        }
                        {
                            props.order.images.before != null || props.order.images.after != null ?
                                <div>
                                    <Button className="beforeAfterBtn" variant="contained"
                                            onClick={() => viewModal(props.order.images.before, props.order.images.after)}>مشاهده
                                        تصاویر</Button>
                                </div>
                                : null
                        }
                        {
                            props.order.editable  &&
                            <React.Fragment>
                                <div>
                                    <Button className="editBtn" variant="contained"
                                            onClick={() => props.viewEditAddressModal(props.order.id)}>ویرایش مکان سفارش</Button>
                                </div>

                                <div>
                                    <Button className="editBtn" variant="contained"
                                            onClick={() => props.viewEditTimeModal(props.order.id , props.order.human_reserved_time , props.order.reserved_day)}>ویرایش زمان سفارش</Button>
                                </div>
                            </React.Fragment>

                        }
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
            <Dialog open={showModal} onClose={closeModal} aria-labelledby="form-dialog-title"
                    className="">
                <DialogTitle id="form-dialog-title">امتیاز</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex flex-column justify-content-center align-items-center mb-3">
                                        <div className="w-100 text-center mb-3">امتیاز شما به خدمات ارائه شده از 1تا5</div>
                                    <div className="w-100 text-center">
                                        <StarRatings
                                            rating={value}
                                            starRatedColor="#ffb400"
                                            starHoverColor="rgb(249, 234, 13)"
                                            changeRating={(newRating)=>ratingHandler(newRating)}
                                            numberOfStars={5}
                                            starDimension= 	'30px'
                                            name='rating'
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
                                        onChange={(e)=>setDescription(e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={createRate} color="primary" variant="fill" className="dialogBtn">
                        تایید
                    </Button>
                    <Button onClick={closeModal} color="primary" variant="fill" className="dialogBtn">
                        لغو
                    </Button>
                </DialogActions>
            </Dialog>
        </Row>
    );
}
export default Orders
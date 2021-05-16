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
    TextField, InputLabel, Select
} from "@material-ui/core";
import moment from "moment-jalaali";
import StarRatings from 'react-star-ratings';
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
    const [ordersHolder, setOrdersHolder] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = React.useState(false);
    const [showEditTimeModal, setShowEditTimeModal] = React.useState(false);
    const [showEditAddressModal, setShowEditAddressModal] = React.useState(false);
    const [beforeImg, setBeforeImg] = useState("");
    const [afterImg, setAfterImg] = useState("");
    const [time, setTime] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [datee, setDatee] = useState("");
    const [date, setDate] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [times, setTimes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [id, setId] = useState("");
    const [datesArray, setDatesArray] = useState([]);
    const [enabledRange, setEnabledRange] = useState({
        min: moment().add(-1, 'days'),
        max: moment().add(14, 'days')
    });
    moment.loadPersian({
        dialect:"persian-modern"
    });
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
        let dateArray = [];
        for(let i=0;i<10;i++)
            dateArray.push(moment().add(i, 'days'))
        setDatesArray(dateArray.map((date, index) =>
            <MenuItem key={index} value={date.format('YYYY-M-D')}>{date.format('dddd jD jMMMM jYYYY')}</MenuItem>
        ))
        setTimes(timesHolder.map((time, index) =>
            <MenuItem key={index} value={time}>{time}</MenuItem>
        ))
        let t = moment().add(0, 'days')
        setDate(t.format('YYYY-M-D'))
        const interval = setInterval(() => {
            if (document.getElementsByClassName("datepicker-input")[0] != undefined)
                document.getElementsByClassName("datepicker-input")[0].setAttribute("readonly", "readonly");
        }, 1000);
        return () => clearInterval(interval);

        timesHandler(t);
        fetchLocations();
    }, [])

    let token = null;
    if (typeof window != "undefined")
        token = JSON.parse(localStorage.getItem('accessToken'));

    let timesHolder = [ "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00",
        "20:00", "21:00", "22:00"
    ];
    const timesHandler = (newDate) => {
        let today = new Date();
        let currentH = (today.getHours() + 3).toString()
        if (currentH.length == 1) currentH = "0" + currentH
        let currentM = today.getMinutes().toString()
        if (currentM.length == 1) currentM = "0" + currentM
        let current = currentH + ":" + currentM;
        if (moment(today).jDate() == moment(newDate).jDate()
            && moment(today).jMonth() == moment(newDate).jMonth()
            && moment(today).jYear() == moment(newDate).jYear())
            setTimes(timesHolder.map((time, index) =>
                current < time ?
                    <MenuItem key={index} value={time}>{time}</MenuItem> :
                    null
            ))
        else
            setTimes(timesHolder.map((time, index) =>
                <MenuItem key={index} value={time}>{time}</MenuItem>
            ))
        /*if(today.getHours()==23)
        {
            setEnabledRange({...enabledRange,min:moment().add(1, 'days')})
        }*/
        setTime("")
        setTimeEnd("")
    }
    const timeHandler = (event) => {
        setTime(event.target.value);
        let index = timesHolder.indexOf(event.target.value);
        switch (event.target.value) {
            case "21:00":
                setTimeEnd("23:00")
                break;
            case "22:00":
                setTimeEnd("24:00")
                break;
            default:
                setTimeEnd(timesHolder[index + 2])
        }
    }

    function getTimeStamp(input) {
        var parts = input.trim().split(' ');
        var date = parts[0].split('-');
        var time = (parts[1] ? parts[1] : '00:00:00').split(':');

        // NOTE:: Month: 0 = January - 11 = December.
        var d = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        return d.getTime() / 1000;
    }

    const dateHandler = (value) => {
        console.log(value)
        let _d = value.format('YYYY-M-D HH:mm:ss')
        let _timestamp = getTimeStamp(_d)
        //var date = new Date(timestamp*1000);
        setDatee(value);
        timesHandler(value)
        setTimestamp(_timestamp * 1000)
        console.log(_timestamp * 1000)
    }
    const datesHandler = (e) => {
        let value= e.target.value;
        let _d = value
        let _timestamp = getTimeStamp(_d)
        setDate(value);
        timesHandler(value)
        setTimestamp(_timestamp)
    }
    const closeModal = () => {
        setShowModal(false);
    }
    const viewModal = (prev, next) => {
        setBeforeImg(prev)
        setAfterImg(next)
        setShowModal(true)
    }
    const closeEditTimeModal = () => {
        setShowEditTimeModal(false);
    }
    const closeEditAddressModal = () => {
        setShowEditAddressModal(false);
    }
    const viewEditTimeModal = (_id , time , date) => {
        setId(_id)
        setShowEditTimeModal(true)
    }
    const viewEditAddressModal = (_id) => {
        setId(_id)
        setShowEditAddressModal(true)
    }
    const editTime = () => {
        if(time=="")
            Notiflix.Notify.Failure('لطفا زمان سفارش را انتخاب کنید.');
            else{
            if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                var myobj = document.getElementById("NotiflixNotifyWrap");
                myobj.remove();
            }
            Notiflix.Loading.Dots();
            let data = new FormData()
            data.append('reserve_day', timestamp)
            data.append('reserve_time', time)
            axios.post(url + '/order/'+id+'/time', data, {
                headers: {
                    'Accept': 'application/json',
                    'dataType': 'json',   //you may use jsonp for cross origin request
                    'Content-Type': "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': "Bearer " + token
                }
            })
                .then((responseJson) => {
                    if (responseJson.data.message == "سفارش با موفقیت آپدیت شد.") {
                        Notiflix.Notify.Success('زمان سفارش با موفقیت آپدیت شد.');
                        setShowEditTimeModal(false)
                        fetchOrders()
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
                })
        }


    }
    const editAddress = (addressName,addressDescription,longitude,latitude,addressId) => {
        setShowModal(false)
        Notiflix.Loading.Dots();
        let data = new FormData()
        data.append('address_longitude', longitude)
        data.append('address_latitude', latitude)
        data.append('address_name', addressName) //orderData.absence
        data.append('address_description', addressDescription)
        if(addressId!="")
            data.append('user_address_id', addressId)
        axios.post(url + '/order/'+id+'/address', data, {
            headers: {
                'Accept': 'application/json',
                'dataType': 'json',   //you may use jsonp for cross origin request
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': "Bearer " + token
            }
        })
            .then((responseJson) => {
                if (responseJson.data.message == "آدرس با موفقیت آپدیت شد.") {
                    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixNotifyWrap");
                        myobj.remove();
                    }
                    Notiflix.Notify.Success('مکان سفارش با موفقیت آپدیت شد.');
                    setShowEditAddressModal(false);
                    fetchOrders();
                } else {
                    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixNotifyWrap");
                        myobj.remove();
                    }
                    Notiflix.Notify.Failure('لطفا دوباره تلاش کنید!');
                }
            })
            .catch((error) => {
                console.log(error)
            })
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

                                        <div>هزینه : {addCommas(order.final)} تومان</div>

                                        <div>زمان شست و شو :
                                             {moment(order.reserved_day).locale('fa').format('dddd jD jMMMM jYYYY')} از ساعت {
                                                [order.human_reserved_time.slice(0, 2), ":", order.human_reserved_time.slice(2)].join('')
                                            }
                                            &nbsp;
                                            تا {order.human_reserved_time == "2100"?
                                                "23:00"
                                                :
                                                order.human_reserved_time == "2200"?
                                                    "24:00"
                                                    :
                                                        timesHolder[timesHolder.indexOf([order.human_reserved_time.slice(0, 2), ":", order.human_reserved_time.slice(2)].join('')) + 2]
                                            }</div>
                                        <div>محل شست و شو : {
                                            order.user_address.description
                                        }</div>
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
                                            <div className="btns">
                                                {/*{
                                                    !order.payment_done && order.payment.payment_method ?
                                                        <div>
                                                            <Button className="beforeAfterBtn" variant="contained">
                                                                پرداخت
                                                                </Button>
                                                        </div>
                                                        : null
                                                }*/}
                                            {
                                                order.images.before != null || order.images.after != null ?
                                                <div>
                                                    <Button className="beforeAfterBtn" variant="contained"
                                                            onClick={() => viewModal(order.images.before, order.images.after)}>مشاهده
                                                        تصاویر</Button>
                                                </div>
                                                : null
                                            }
                                                {
                                                    order.editable  &&
                                                    <React.Fragment>
                                                        <div>
                                                            <Button className="editBtn" variant="contained"
                                                                    onClick={() => viewEditAddressModal(order.id)}>ویرایش مکان سفارش</Button>
                                                        </div>

                                                        <div>
                                                            <Button className="editBtn" variant="contained"
                                                                    onClick={() => viewEditTimeModal(order.id , order.human_reserved_time , order.reserved_day)}>ویرایش زمان سفارش</Button>
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
    const fetchLocations = () => {
        //Notiflix.Loading.Dots();
        const abortController = new AbortController()
        const promise = window
            .fetch(url + '/user_address', {
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
                if (responseJson.message == "آدرس‌ها با موفقیت دریافت شد.") {
                    setLocations(responseJson.user_addresses)
                    /*if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixLoadingWrap");
                        myobj.remove();
                    }*/
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
                                    className="">
                                <DialogTitle id="form-dialog-title">مشاهده تصاویر</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <div className="beforeAfter">
                                            <Row>
                                                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <div><img src={beforeImg}/><span>تصویر قبل</span></div>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <div><img src={afterImg}/><span>تصویر بعد</span></div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeModal} color="primary" variant="fill" className="dialogBtn">
                                        تایید
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={showEditTimeModal} onClose={closeEditTimeModal} aria-labelledby="form-dialog-title"
                                    className="">
                                <DialogTitle id="form-dialog-title">ویرایش زمان</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <div  className="editTime">
                                            <Row className="orderRow">
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12} className="form-item">
                                                    <FormControl variant="filled">
                                                        <InputLabel id="demo-simple-select-filled-label">تاریخ کارواش</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            value={date}
                                                            onChange={datesHandler}
                                                            label="تاریخ کارواش">
                                                            {datesArray}
                                                        </Select>
                                                    </FormControl>
                                                </Col>
                                                {/*<Col xl={12} lg={12} md={12} sm={12} xs={12} className="form-item">
                                                    <div>
                                                        <img src={down} className="down"/>
                                                    </div>
                                                    <div>
                                                        <DatePicker
                                                            label="تاریخ کارواش"
                                                            placeholder="تاریخ کارواش"
                                                            isGregorian={false}
                                                            timePicker={false}
                                                            min={enabledRange.min}
                                                            max={enabledRange.max}
                                                            value={datee}
                                                            showTodayButton={false}
                                                            inputFormat="YYYY-M-D"
                                                            onChange={dateHandler}
                                                        />
                                                    </div>

                                                </Col>*/}
                                            </Row>
                                            <Row className="orderRow">
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <FormControl variant="filled">
                                                        <InputLabel id="demo-simple-select-filled-label">ساعت شروع</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            value={time}
                                                            onChange={timeHandler}
                                                            label="ساعت شروع">
                                                            {times}
                                                        </Select>
                                                    </FormControl>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    {
                                                        time != "" && timeEnd != "" &&
                                                        <label className="servicesTime">خودرو شما در بازه زمانی {time} تا {timeEnd} شسته خواهد
                                                            شد.</label>
                                                    }

                                                </Col>
                                            </Row>
                                        </div>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={editTime} color="primary" variant="fill" className="dialogBtn">
                                        تایید
                                    </Button>
                                    <Button onClick={closeEditTimeModal} color="primary" variant="fill" className="dialogBtn">
                                        لغو
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={showEditAddressModal} onClose={closeEditAddressModal} aria-labelledby="form-dialog-title"
                                    className="">
                                <DialogTitle id="form-dialog-title">ویرایش مکان</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <NewLocationForm orderData={[]} mapData={[]} edit={true} callback={editAddress}/>
                                    </DialogContentText>
                                </DialogContent>
                                {/*<DialogActions>
                                    <Button onClick={editAddress} color="primary" variant="fill" className="dialogBtn">
                                        تایید
                                    </Button>
                                    <Button onClick={closeEditAddressModal} color="primary" variant="fill" className="dialogBtn">
                                        لغو
                                    </Button>
                                </DialogActions>*/}
                            </Dialog>
                        </React.Fragment>
                    }
                </Container>
            </div>
        </MuiThemeProvider>
    );
}
export default Orders
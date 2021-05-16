import React, {useState, useEffect} from "react";
import "./order.css"
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Col, Container, Row} from "react-bootstrap";
import DatePicker from 'react-datepicker2';
import momentJalaali from "moment-jalaali";
import Form from 'react-bootstrap/Form'
import {
    Button,
    Radio,
    MenuItem,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    TextField,
    Checkbox
} from "@material-ui/core";
import moment from "moment-jalaali";
import {addCommas} from "persian-tools2";
import Agreement from "./agreement"
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import cloudComputing from "../../assets/images/cloud-computing.png";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";

const theme = createMuiTheme({
    direction: 'rtl'
});

const Order = (props) => {
    let ordersCount = 0
    let balance,token;
    if (typeof window != "undefined") {
        balance = JSON.parse(localStorage.getItem('balance'));
        ordersCount = JSON.parse(localStorage.getItem('orders'));
        token = JSON.parse(localStorage.getItem('accessToken'));
    }
    const [errorMessage, setErrorMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [paymentType, setPaymentType] = React.useState('');
    const [description, setDescription] = React.useState(props.orderInfo.orderDescription!=undefined ? props.orderInfo.orderDescription : "");
    const [orderData, setOrderData] = useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [accept, setAccept] = useState(ordersCount>0?true : false );
    const [totalPrice, setTotalPrice] = useState("");
    const [price, setPrice] = useState("");
    moment.loadPersian({
        dialect:"persian-modern"
    });
    let url = process.env.url;
    useEffect(() => {
        if(props.orderData.price=="...")
            calculatePrice(props.orderData.services, props.orderData.carModel)
    }, [])

    const acceptMeHandler = (event) => {
        setAccept(event.target.checked)
        validate(event.target.checked && paymentType!="")
    }
    const descriptionHandler = (event) => {
        setDescription(event.target.value);
        setOrderData({...orderData, orderDescription: event.target.value})
    };
    const paymentTypeHandler = (event) => {
        setPaymentType(event.target.value);
        setOrderData({...orderData, PaymentType: event.target.value})
        validate(accept)
    }
    const validate = (result) => {
        if (result) {
            setBtnDisabled(false)
        } else setBtnDisabled(true)
    }
    const calculatePrice = (selectedServices, model) => {
        //setBtnDisabled(true)
        if ((model != 0) && selectedServices.length > 0) {
            let data = new FormData()
            data.append('model_id', model)
            data.append('services', JSON.stringify(selectedServices))

            axios.post(url + '/prices/guess', data, {
                headers: {
                    'Accept': 'application/json',
                    'dataType': 'json',   //you may use jsonp for cross origin request
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': "Bearer " + token
                }
            })
                .then((responseJson) => {
                    if (responseJson.data.message == "هزینه‌ها با موفقیت دریافت شد.") {
                        setTotalPrice(responseJson.data.prices.price);
                        setPrice(parseInt(responseJson.data.prices.price)-balance)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };
    const closeModal = () => {
        setShowModal(false);
    }
    const pay = () => {
        props.callback("orderInfo", orderData)
    }
    return (
        <MuiThemeProvider theme={theme}>
            <div className="orderInfo" dir="rtl">
                <Container>
                    <label className="formLabel">خلاصه سفارش</label>
                    <Row>
                        <Col xl={6} lg={5} md={12} sm={12} xs={12} className="orderData">
                            <div className="orderSummary">
                                <div>خودروی انتخاب شده
                                    : {props.orderData.brandTitle} - {props.orderData.modelTitle}</div>
                                <div>خدمات انتخاب شده : {
                                    props.orderData.servicesTitle.join(" - ")
                                }</div>
                                <div>زمان شست و شو :
                                    &nbsp;{props.orderData.day}&nbsp;
                                    از
                                    ساعت {props.orderData.time} تا {props.orderData.endTime}</div>
                                <div>
                                    محل شست و شو :
                                    &nbsp;{props.mapData.description}&nbsp;
                                </div>

                                <Button className="" variant="contained"
                                        onClick={() => props.callback("editOrder", orderData)}>اصلاح سفارش</Button>
                            </div>
                            <div className="orderDescription">
                                <TextField id="filled-basic" multiline value={description} onChange={descriptionHandler}
                                           rows={5} label="توضیحات تکمیلی" variant="filled"/>
                            </div>
                        </Col>
                        <Col xl={6} lg={7} md={12} sm={12} xs={12}>
                            <div className="orderPayment">
                                <Form.Group controlId="formBasicText">
                                        <Form.Label>مبلغ خدمات:</Form.Label>
                                        <Form.Control type="text" placeholder="" value={props.orderData.price == "..." ? addCommas(totalPrice) : addCommas(props.orderData.price)}/>
                                        <Form.Label>تومان</Form.Label>
                                </Form.Group>
                                <Form.Group controlId="formBasicText">
                                        <Form.Label>اعتبار شما:</Form.Label>
                                        <Form.Control type="text" placeholder="" value={addCommas(balance)}/>
                                        <Form.Label>تومان</Form.Label>
                                    {/*<div className="plushelp">
                                        <span className="plus">+</span>
                                        <span className="help">?</span>
                                    </div>*/}
                                </Form.Group>
                                <Form.Group controlId="formBasicText">
                                        <Form.Label>مبلغ قابل پرداخت:</Form.Label>
                                        <Form.Control type="text" placeholder="" value={props.orderData.price == "..." ? addCommas(price)  : addCommas(props.orderData.price-balance)}/>
                                        <Form.Label>تومان</Form.Label>
                                </Form.Group>
                                <div className="payment">
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="payment" name="" value={paymentType}
                                                    onChange={paymentTypeHandler}>
                                            <FormLabel component="legend">روش پرداخت:</FormLabel>
                                            {!props.orderData.absence ?
                                                <FormControlLabel value="cash" control={<Radio/>} label="نقدی"/> :
                                                null
                                            }
                                            <FormControlLabel value="online" control={<Radio/>} label="آنلاین"/>
                                        </RadioGroup>
                                    </FormControl>
                                    <div className="lows-check">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={accept}
                                                    value={accept}
                                                    onChange={acceptMeHandler}
                                                    name="checkedB"
                                                    color="primary"
                                                />
                                            }
                                            label=""
                                        />
                                        <span className="lows-label" onClick={()=>setShowModal(true)}>قوانین و مقررات را مطالعه کرده ام و می پذیرم.</span>
                                    </div>
                                    <Button className="" variant="contained" color="secondary"
                                            onClick={pay}
                                        disabled={btnDisabled}>تایید و پرداخت</Button>
                                </div>

                            </div>
                        </Col>
                    </Row>

                    <Dialog open={showModal} onClose={closeModal} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title"> قوانین و مقررات تی‌سپ</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Agreement/>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {/*<Button onClick={closeModal} color="primary" variant="fill" className="dialogBtn">
                                لغو
                            </Button>*/}
                            <Button onClick={closeModal} color="primary" variant="fill" className="dialogBtn">
                                تایید
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Container>
            </div>
        </MuiThemeProvider>
    );
}
export default Order
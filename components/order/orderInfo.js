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
    TextField
} from "@material-ui/core";

const theme = createMuiTheme({
    direction: 'rtl'
});

const Order = (props) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [carBrand, setCarBrand] = useState("");
    const [carModel, setCarModel] = useState("");
    const [selectedCar, setSelectedCar] = useState("");
    const [toggle, setToggle] = useState(true);
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [paymentType, setPaymentType] = React.useState('');
    const [state, setState] = useState({
        rooShoyi: true,
        tooShooyi: false,
        lastikWax: false,
        dashboardWax: false
    });
    const {rooShoyi, tooShooyi, lastikWax, dashboardWax} = state;
    var times = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"
    ];
    let timeItems = times.map((time, index) =>
        <MenuItem key={index} value={time}>{time}</MenuItem>
    )
    let enabledRange = {
        min: momentJalaali().add(0, 'days'),
        max: momentJalaali().add(10, 'days')
    };
    useEffect(() => {
        let t = momentJalaali().add(1, 'days')
        setDate(t, 'jYYYY/jM/jD')
        if (document.getElementsByClassName("datepicker-input")[0] != undefined)
            document.getElementsByClassName("datepicker-input")[0].setAttribute("readonly", "readonly");
    }, [])

    let token = null;
    if (typeof window != "undefined")
        token = JSON.parse(localStorage.getItem('token'));

    const validate = () => {
        /*if (password.length < 5) {
            setErrorMessage('رمز عبور اشتباه است.');
            return false;
        }*/
        //setErrorMessage('');
        return true;
    }
    const carBrandHandler = (e) => {
        setCarBrand(e.target.value)
    }
    const carModelHandler = (e) => {
        setCarModel(e.target.value)
    }
    const selectedCarHandler = (e) => {
        setSelectedCar(e.target.value)
    }
    const toggleState = (e) => {
        setToggle(!toggle)
    }
    const servicesHandler = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };
    const timeHandler = (event) => {
        setTime(event.target.value);
    }
    const createOrder = () => {
        alert(1)
    }
    const paymentTypeHandler = (event) => {
        setPaymentType(event.target.value);
    };
    return (
        <MuiThemeProvider theme={theme}>
            <div className="orderInfo" dir="rtl">
                <Container>
                    <label className="formLabel">خلاصه سفارش</label>
                    <Row>
                        <Col xl={6} lg={6} md={12} sm={12} xs={12} className="orderData">
                            <div className="orderSummary">
                                <div>خودروی انتخاب شده : ...</div>
                                <div>خدمات انتخاب شده : ...</div>
                                <div>زمان شست و شو : ... مورخ ... از ساعت ... تا ...</div>
                                <div>محل شست و شو : ...</div>
                                <Button className="" variant="contained">اصلاح سفارش</Button>
                            </div>
                            <div className="orderDescription">
                                <TextField id="filled-basic" multiline
                                           rows={5} label="توضیحات تکمیلی (اختیاری) :" variant="filled" />
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                            <div className="orderPayment">
                                <Form.Group controlId="formBasicText">
                                    <Form.Label>مبلغ خدمات:</Form.Label>
                                    <Form.Control type="text" placeholder=""/>
                                    <label>ریال</label>
                                </Form.Group>
                                <Form.Group controlId="formBasicText">
                                    <Form.Label>اعتبار شما:</Form.Label>
                                    <Form.Control type="text" placeholder=""/>
                                    <label>ریال</label>
                                    <span className="plus">+</span>
                                    <span className="help">?</span>
                                </Form.Group>
                                <Form.Group controlId="formBasicText">
                                    <Form.Label>مبلغ قابل پرداخت:</Form.Label>
                                    <Form.Control type="text" placeholder=""/>
                                    <label>ریال</label>
                                </Form.Group>
                                <div className="payment">
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="payment" name="" value={paymentType}
                                                    onChange={paymentTypeHandler}>
                                            <FormLabel component="legend">روش پرداخت:</FormLabel>
                                            <FormControlLabel value="Cash" control={<Radio/>} label="نقدی"/>
                                            <FormControlLabel value="online" control={<Radio/>} label="آنلاین"/>
                                        </RadioGroup>
                                    </FormControl>
                                    <Button className="" variant="contained" color="secondary"
                                            onClick={createOrder}
                                        /*disabled={btnDisabled}*/>تایید و پرداخت</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </MuiThemeProvider>
    );
}
export default Order
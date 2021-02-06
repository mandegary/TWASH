import React, {useState, useEffect} from "react";
import "./order.css"
import {
    Button,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Col, Container, Row} from "react-bootstrap";
import DatePicker from 'react-datepicker2';
import momentJalaali from "moment-jalaali";
import {useRouter} from "next/router";

const theme = createMuiTheme({
    direction: 'rtl'
});

const Order = (props) => {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [carBrand, setCarBrand] = useState("");
    const [carModel, setCarModel] = useState("");
    const [selectedCar, setSelectedCar] = useState("");
    const [selectedCarIsSelected, setSelectedCarIsSelected] = useState(false);
    const [toggle, setToggle] = useState(true);
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
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
        let t=momentJalaali().add(1, 'days')
        setDate(t ,'jYYYY/jM/jD')
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
        if(e.target.value!="")
        {
            setCarBrand("")
            setCarModel("")
            setSelectedCarIsSelected(true)
        }
    else setSelectedCarIsSelected(false)
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
        router.replace("/map")
    }

    return (
        <MuiThemeProvider theme={theme}>
            <div className="orderForm" dir="rtl">
                <Container>
                    <Row className="orderRow">
                        <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                            <label className="formLabel">انتخاب خودرو</label>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                            <FormControl variant="filled" disabled={selectedCarIsSelected}>
                                <InputLabel id="demo-simple-select-filled-label">برند خودرو را انتخاب کنید</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={carBrand}
                                    onChange={carBrandHandler}
                                >
                                    <MenuItem value="">---</MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                            <FormControl variant="filled" disabled={selectedCarIsSelected}>
                                <InputLabel id="demo-simple-select-filled-label">مدل خودرو را انتخاب کنید</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={carModel}
                                    onChange={carModelHandler}
                                >
                                    <MenuItem value="">---</MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={12} xs={12} className="selectedCar">
                            <FormControl variant="filled">
                                <InputLabel id="demo-simple-select-filled-label">خودروهای منتخب</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={selectedCar}
                                    onChange={selectedCarHandler}
                                >
                                    <MenuItem value="">---</MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={12} xs={12}>
                        </Col>
                    </Row>
                    <Row className="orderRow" style={{border: "none"}}>
                        <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                            <label className="formLabel">انتخاب خدمات</label>
                        </Col>
                        <Col xl={7} lg={10} md={12} sm={12} xs={12}>
                            <form className="switch-field">
                                <input
                                    type="radio"
                                    name="switchToggle"
                                    value="خیر"
                                    id="switch_right"
                                    onChange={toggleState}
                                    checked={toggle}
                                />
                                <label htmlFor="switch_right" className="switch_right">خیر</label>
                                <input
                                    type="radio"
                                    name="switchToggle"
                                    value="بله"
                                    id="switch_left"
                                    onChange={toggleState}
                                    checked={toggle}
                                />
                                <label htmlFor="switch_left" className="switch_left">بله</label>
                                <label className="switchTile">در حضور مشتری</label>
                            </form>
                        </Col>
                    </Row>
                    <Row className="orderRow" style={{paddingTop: "0"}}>
                        <Col xl={2} lg={2} md={12} sm={12} xs={12}>
                        </Col>
                        <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                            <FormControl className="checkServices" component="fieldset">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={rooShoyi} onChange={servicesHandler}
                                                           name="rooShoyi"/>}
                                        label="روشویی"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={tooShooyi} onChange={servicesHandler}
                                                           name="tooShooyi"/>}
                                        label="توشویی"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={lastikWax} onChange={servicesHandler}
                                                           name="lastikWax"/>}
                                        label="واکس لاستیک"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={dashboardWax} onChange={servicesHandler}
                                                           name="dashboardWax"/>}
                                        label="واکس داشبورد"
                                    />

                                </FormGroup>
                            </FormControl>
                        </Col>
                        <Col xl={3} lg={10} md={12} sm={12} xs={12}>
                            <label className="servicesPrice">هزینه خدمات : ... ریال</label>
                        </Col>
                    </Row>
                    <Row className="orderRow timeSelect" style={{border: "none"}}>
                        <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                            <label className="formLabel">انتخاب زمان</label>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={12} xs={12} className="form-item">
                            <DatePicker
                                label="تاریخ کارواش"
                                placeholder="تاریخ کارواش"
                                isGregorian={false}
                                timePicker={false}
                                min={enabledRange.min}
                                max={enabledRange.max}
                                value={date}
                                showTodayButton={false}
                                inputFormat="YYYY-M-D"
                                onChange={value => {
                                    setDate(value)
                                }}
                            />
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                            <FormControl variant="filled">
                                <InputLabel id="demo-simple-select-filled-label">ساعت شروع</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={time}
                                    onChange={timeHandler}
                                    label="ساعت شروع">
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                        <Col xl={4} lg={10} md={12} sm={12} xs={12}>
                            <label className="servicesTime">خودرو شما در بازه زمانی ... تا ... شسته خواهد شد.</label>
                        </Col>
                    </Row>
                    <Row className="orderBtn">
                        <Button className="" variant="contained" color="secondary"
                                onClick={createOrder}
                            /*disabled={btnDisabled}*/>مرحله بعد (انتخاب محل شست و شو)</Button>
                    </Row>
                </Container>
            </div>
        </MuiThemeProvider>
    );
}
export default Order
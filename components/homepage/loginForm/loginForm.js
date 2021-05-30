import React, {useState, useContext, useEffect} from "react";
import "./loginForm.css"
import {Button, TextField} from "@material-ui/core";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {useRouter} from "next/router";
import Form from 'react-bootstrap/Form'
import {Col, Row} from 'react-bootstrap'

const theme = createMuiTheme({
    direction: 'rtl'
});

const HomePageForm = (props) => {
    const router = useRouter()
    const [mobile, setMobile] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);

    let token = null;
    let link, code;

    if (typeof window != "undefined") {
        token = JSON.parse(localStorage.getItem('accessToken'));
    }
    useEffect(() => {
        link = window.location.href.split('/');
        if (link[link.length - 2] == "refferal") {
            code = link[link.length - 1];
            code = code.substring(0, 6)
            setReferralCode(code)
        }
    }, [])
    const validate = () => {
        /*if (password.length < 5) {
            setErrorMessage('رمز عبور اشتباه است.');
            return false;
        }*/
        setErrorMessage('');
        return true;
    }
    const mobileHandler = (e) => {
        let pattern = /09\d{9}/;
        setMobile(e.target.value)
        if (e.target.value.length == 11 && pattern.test(e.target.value)) {
            setBtnDisabled(false)
        } else setBtnDisabled(true)
    }
    const referralCodeHandler = (e) => {
        setReferralCode(e.target.value)
    }

    const ENTER_KEY = 13
    const handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY)
            props.formAction(mobile);
    }
    const createOrder = (e) => {
        router.push("/order")
    }

    return (
        <MuiThemeProvider theme={theme}>
            <div
                className="homeForm w-100 d-flex flex-row align-items-center justify-content-center justify-content-md-start h-100"
                dir="rtl">
                {token == null ?
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">

                        <Form.Group as={Row} lg="6" md="10" sm="12" controlId="formPlaintextMobile"
                                    className="w-75 w-sm-100 mb-0 ml-0 ml-md-3 text-right">

                            <Form.Label column lg="4" md="3" sm="2" className="col-3">
                                شماره موبایل
                            </Form.Label>
                            <Col lg="6" md="9" sm="10" className="col-9">
                                <Form.Control value={mobile} onKeyDown={handleKeyDown} maxLength="11"
                                              inputMode="numeric" onChange={mobileHandler}/>
                            </Col>

                            <Form.Label column lg="4" md="3" sm="2" className="col-3">
                                کد معرف
                            </Form.Label>
                            <Col lg="6" md="9" sm="10" className="col-9">
                                <Form.Control value={referralCode}
                                              maxLength="6" inputMode="numeric" onChange={referralCodeHandler}
                                              onKeyDown={handleKeyDown}/>
                            </Col>


                        </Form.Group>
                        <Col lg="6" md="6" sm="10" className="text-right md-0 mt-3">
                            <Button type="submit" className="homeFormBtn m-0 w-50 w-sm-100" variant="contained"
                                    color="secondary"
                                    onClick={() => props.formAction(mobile, referralCode)}
                                    disabled={btnDisabled}>
                                ثبت سفارش
                            </Button>
                        </Col>

                        {/*<div className="w-50">
                            <TextField id="outlined-basic" label="شماره موبایل خود را وارد کنید." variant="filled"
                                       value={mobile} className="w-80"
                                       onKeyDown={handleKeyDown} inputProps={{maxlength: 11,inputMode:"numeric"}} onChange={mobileHandler}/>
                            <TextField id="outlined-basic" label="کد معرف (اختیاری)" variant="filled" value={referralCode} className="w-w-80"
                                       inputProps={{maxLength: 6,inputMode:"numeric"}} onChange={referralCodeHandler} onKeyDown={handleKeyDown} />
                        </div>
                        <Button className="homeFormBtn w-50 mr-5" variant="contained" color="secondary"
                                onClick={() => props.formAction(mobile, referralCode)}
                                disabled={btnDisabled}>دریافت
                            کد</Button>*/}
                    </div>
                    :
                    <Col lg="4" md="5" sm="10" className=" mt-0 col-10">
                    <Button className="homeFormBtn w-100" variant="contained" color="secondary"
                            onClick={createOrder}>
                        ثبت سفارش
                    </Button>
                    </Col>
                }
            </div>
        </MuiThemeProvider>
    );
}
export default HomePageForm
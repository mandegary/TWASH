import React, {useState, useContext, useRef, useEffect} from "react";
import "./verificationForm.css"
import {Button, TextField} from "@material-ui/core";
import Form from 'react-bootstrap/Form'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Notiflix from "notiflix";
/*import ReactCodeInput from 'react-code-input';*/
import ReactCodeInput from 'react-verification-code-input';
import editIcon from "../../../assets/images/edit.svg"
import {AuthContext} from "../../../context/Auth/authContext";
import {useRouter} from "next/router";

const theme = createMuiTheme({
    direction: 'rtl'
});

const VerificationForm = (props) => {
    const router = useRouter()
    const mobileRef = useRef(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationCodeArray, setVerificationCodeArray] = useState([]);
    const [verifyCode, setVerifyCode] = useState("");//from server
    const [errorMessage, setErrorMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [isSendCode, setIsSendCode] = useState(true);
    const [isConfirmCode, setIsConfirmCode] = useState(true);
    const [mobile, setMobile] = useState("");
    const [seconds, setSeconds] = useState(60);
    const [refferalCodeIsValid, setRefferalCodeIsValid] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isSendVCodeAgain, setIsSendVCodeAgain] = useState(false);
    const [inputClass, setClass] = useState("input-wrapper");
    const {dispatch} = useContext(AuthContext);
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
    //if (typeof window != "undefined")
    //token = JSON.parse(localStorage.getItem('accessToken'));
    function reset() {
        setSeconds(60);
        setIsActive(false);
    }

    useEffect(() => {
        if (mobileRef.current != null)
            mobileRef.current.focus();
        reset();
        let t = 60
        let interval = null;
        if (!isActive && t > 0) {
            interval = setInterval(() => {
                if (t > 0)
                    setSeconds(t > 0 ? t => (t - 1) : 0);
            }, 1000);
        } else if (!isActive && t !== 0) {
            clearInterval(interval);
            setIsActive(true)

        } else if (!isActive && t == 0) {
            clearInterval(interval);
            setIsActive(true)
        }
        return () => clearInterval(interval);
    }, []);

    const mobileHandler = (e) => {
        setMobile(e.target.value)
        if (e.target.value.length == 11)
            setBtnDisabled(false)
        else setBtnDisabled(true)
    }
    const validate = () => {
        /*if (password.length < 5) {
            setErrorMessage('رمز عبور اشتباه است.');
            return false;
        }*/
        setErrorMessage('');
        return true;
    }
    const vCodeHandler = (value) => {
        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
        }
        setVerificationCode(value)
        if (value.length == 6 /*&& (value == props.varifyCode || value == verifyCode)*/) {
            getToken(value);
        }
        /*else if (value.length == 6) {
            setIsConfirmCode(false);
            Notiflix.Notify.Failure('کد وارد شده اشتباه است!');
        }*/
    }
    const exampleFieldClick = () => {
        setClass("input-wrapper form-field--is-active")
    }
    const exampleFieldAbort = () => {
        setClass("input-wrapper")
    }
    const sendVCode = () => {
        Notiflix.Loading.Dots();
        const abortController = new AbortController()
        const promise = window
            .fetch(url + '/sanctum/sendVerifyCode', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    /*'Host': 'hiteb24.com',*/
                    'dataType': 'jsonp',   //you may use jsonp for cross origin request
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'POST',
                mode: 'cors',
                signal: abortController.signal,
                body: JSON.stringify({
                    phone: mobile || props.mobile
                })
            })
            .then(res => res.json())
            .then(responseJson => {
                if (responseJson.message == "کد تایید با موفقیت ارسال شد.") {
                    setVerifyCode(responseJson.verify_code);
                    setSeconds(60)
                    setIsSendCode(true)
                    setIsSendVCodeAgain(true)
                    if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixLoadingWrap");
                        myobj.remove();
                    }
                    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixNotifyWrap");
                        myobj.remove();
                    }
                    Notiflix.Notify.Success("کد تایید با موفقیت ارسال شد.");
                }
            })
            .catch(err => {
                console.log(err)
            })
        // Cancel the request if it takes more than delayFetch seconds
        setTimeout(() => abortController.abort(), process.env.delayFetch)


    }
    const getToken = (value) => {
        let vCode = ""
        if (typeof value != "string")
            vCode = verificationCode;
        else vCode = value;
        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
        }
        //if ((!isSendVCodeAgain && vCode == props.varifyCode) || (isSendVCodeAgain && vCode == verifyCode)) {
            Notiflix.Loading.Dots();
            //setIsConfirmCode(false)
            const abortController = new AbortController()
            const promise = window
                .fetch(url + '/sanctum/token', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        /*'Host': 'hiteb24.com',*/
                        'dataType': 'jsonp',   //you may use jsonp for cross origin request
                        'Access-Control-Allow-Origin': '*',
                    },
                    method: 'POST',
                    mode: 'cors',
                    signal: abortController.signal,
                    body: JSON.stringify({
                        phone: mobile || props.mobile,
                        referral_code: refferalCodeIsValid ? props.referralCode : "",
                        verification_code: vCode,
                    })
                })
                .then(res => res.json())
                .then(responseJson => {
                    if (responseJson.message == "توکن با موفقیت دریافت شد.") {
                        let _token = responseJson.token;
                        const abortController = new AbortController()
                        const promise = window
                            .fetch(url + '/auth/balance', {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'dataType': 'jsonp',   //you may use jsonp for cross origin request
                                    'Access-Control-Allow-Origin': '*',
                                    'Authorization': "Bearer " + _token
                                },
                                method: 'GET',
                                mode: 'cors',
                                signal: abortController.signal
                            })
                            .then(res => res.json())
                            .then(responseJson => {
                                if (responseJson.message == "اعتبار کاربر با موفقیت دریافت شد")
                                    dispatch({
                                        type: 'login', payload:
                                            {
                                                token: _token,
                                                balance: responseJson.balance
                                            }
                                    });
                                if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                                    var myobj = document.getElementById("NotiflixLoadingWrap");
                                    myobj.remove();
                                }
                                router.push("/order")
                                /*dispatch({
                                    type: 'balance', payload:
                                        {
                                            token: responseJson.data.token,
                                        }
                                });*/
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        // Cancel the request if it takes more than delayFetch seconds

                        const abortController1 = new AbortController()
                        const promise1 = window
                            .fetch(url + '/auth/me', {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'dataType': 'jsonp',   //you may use jsonp for cross origin request
                                    'Access-Control-Allow-Origin': '*',
                                    'Authorization': "Bearer " + _token
                                },
                                method: 'GET',
                                mode: 'cors',
                                signal: abortController1.signal
                            })
                            .then(res => res.json())
                            .then(responseJson => {
                                if (responseJson.message == "کاربر با موفقیت دریافت شد.") {
                                    dispatch({
                                        type: 'refferalCode', payload:
                                            {
                                                refferalCode: responseJson.user.referral_code
                                            }
                                    });
                                    dispatch({
                                        type: 'user', payload:
                                            {
                                                fName: responseJson.data.user.name,
                                                lName: responseJson.data.user.last_name
                                            }
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        // Cancel the request if it takes more than delayFetch seconds
                        setTimeout(() => abortController.abort(), process.env.delayFetch)
                        setTimeout(() => abortController1.abort(), process.env.delayFetch)
                    }
                    else if (responseJson.errors.referral_code[0] == "The selected referral code is invalid.") {
                        setRefferalCodeIsValid(false)
                        if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                            var myobj = document.getElementById("NotiflixLoadingWrap");
                            myobj.remove();
                        }
                        Notiflix.Notify.Failure('کد معرف وارد شده صحیح نمی باشد.');
                    }
                    else if (responseJson.message == "کد تایید معتبر نیست.") {
                        setRefferalCodeIsValid(false)
                        if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                            var myobj = document.getElementById("NotiflixLoadingWrap");
                            myobj.remove();
                        }
                        Notiflix.Notify.Failure('کد وارد شده صحیح نمی باشد.');
                        setVerificationCodeArray(["3","3","3","3","3","3"])
                    }
                    else {
                        setVerificationCodeArray(["3","3","3","3","3","3"])
                        if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                            var myobj = document.getElementById("NotiflixLoadingWrap");
                            myobj.remove();
                        }
                        //Notiflix.Notify.Failure('لطفا مجددا تلاش کنید!');
                        Notiflix.Notify.Failure(responseJson.errors);
                    }
                })
                .catch(err => {
                    setIsConfirmCode(false)
                    if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixLoadingWrap");
                        myobj.remove();
                    }
                    //document.querySelectorAll('[type="tel"]')[0].value="";
                    console.log(err)
                    setVerificationCodeArray([3,3,3,3,3,3])
                    Notiflix.Notify.Failure(err);
                    //Notiflix.Notify.Failure('لطفا مجددا تلاش کنید!');

                })
            // Cancel the request if it takes more than delayFetch seconds
            setTimeout(() => abortController.abort(), process.env.delayFetch)
        /*} else {
            Notiflix.Notify.Failure('کد وارد شده اشتباه است!');
        }*/
    }
    const editMobile = () => {
        setIsSendCode(false)
    }

    const ENTER_KEY = 13;
    const handleMobileKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) {
            sendVCode();
        }
    }

    return (
        <MuiThemeProvider theme={theme}>
            <div className="verificationForm" dir="rtl">
                {isSendCode ?
                    <div className="isSendCode">
                        <div className="verificationTop">
                            <div className="verificationTxt">کد ارسالی را وارد کنید</div>
                            <div className="verificationCodeSend">کد 6 رقمی به شماره شما پیامک شد</div>
                            <div className="editMobile" onClick={editMobile}>
                                <img alt="edit" src={editIcon}/>
                                <div>{mobile || props.mobile}</div>
                            </div>
                            <ReactCodeInput values={verificationCodeArray} fields={6} onChange={vCodeHandler} onFocus={exampleFieldClick} autoFocus={true} onBlur={exampleFieldAbort}/>
                            {/*<ReactCodeInput type='tel' fields={6} autoFocus={true}
                                            pattern="[0-9]*"
                                            onChange={vCodeHandler}onFocus={exampleFieldClick} onBlur={exampleFieldAbort}
                            />*/}
                            {/*<ReactCodeInput onChange={vCodeHandler} autoFocus={true} fields={6} type='number'
                                            onFocus={exampleFieldClick} onBlur={exampleFieldAbort}
                                 fieldWidth={40} fieldHeight={56} type="text"/>*/}
                        </div>
                        <div className="verificationBottom">
                            <div className="sendVCode">
                                <div className="notSendVCodeTxt">پیامکی دریافت نکردید؟</div>


                                {!isActive && seconds > 0 ?
                                    <div className="description"><span>{seconds}</span>&nbsp;ثانیه تا ارسال مجدد کد
                                    </div>
                                    :
                                    <div className="sendCodeAgain" onClick={sendVCode}>ارسال مجدد پیامک</div>
                                }

                                {/*<div className="timer">
                                    <div className="time">۴۲</div>
                                    &nbsp;
                                    <div className="timeTxt">ثانیه تا ارسال مجدد کد</div>
                                </div>*/}
                            </div>
                            {
                                !isConfirmCode && <div className="confirmCodeBtn">
                                    <Button variant="contained" color="secondary"
                                            onClick={getToken}>ارسال</Button>
                                </div>
                            }
                            {/*<Button className="downloadBtn" variant="contained" color="secondary"
                                    onClick={buttonHandler}
                                    disabled={btnDisabled}>دریافت کد</Button>*/}
                        </div>
                    </div>
                    :
                    <div className="isNotSendCode">
                        <div className="verificationTop">
                            {/*<div className="verificationTxt">شماره موبایل خود را وارد کنید</div>*/}
                            <TextField id="outlined-basic" label="شماره موبایل خود را وارد کنید." variant="filled"
                                       value={mobile} onKeyDown={handleMobileKeyDown}
                                       inputProps={{maxLength: 11,inputMode:"numeric"}} onChange={mobileHandler} ref={mobileRef}
                                       className="inputField"/>
                            {/*  <input placeholder="شماره موبایل" type="tel" dir="ltr"
                                       pattern="/^09\d{9}|۰۹[\u06F0-\u06F90-9]{9}$/" maxLength="11"
                                       className="inputField" value={mobile} onChange={mobileHandler} />*/}
                        </div>
                        <div className="verificationBottom">
                            <Button className="homeFormBtn" variant="contained" color="secondary"
                                    onClick={sendVCode}
                            >دریافت کد</Button>
                        </div>
                    </div>
                }
            </div>
        </MuiThemeProvider>
    );
}
export default VerificationForm
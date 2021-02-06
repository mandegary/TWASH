import React, {useState, useContext, useRef, useEffect} from "react";
import "./verificationForm.css"
import {Button, TextField} from "@material-ui/core";
import Form from 'react-bootstrap/Form'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import ReactCodeInput from 'react-verification-code-input';
import editIcon from "../../../assets/images/edit.svg"
const theme = createMuiTheme({
    direction: 'rtl'
});

const VerificationForm = (props) => {
    const mobileRef = useRef(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [isSendCode, setIsSendCode] = useState(true);
    const [isConfirmCode, setIsConfirmCode] = useState(true);
    const [mobile, setMobile] = useState("");
    const [seconds, setSeconds] = useState( 5);
    const [isActive, setIsActive] = useState(false);
    const [inputClass, setClass] = useState("input-wrapper");

    let token = "test";
    //if (typeof window != "undefined")
        //token = JSON.parse(localStorage.getItem('token'));
    function reset() {
        setSeconds(5);
        setIsActive(false);
    }
    useEffect(() => {
        if(mobileRef.current!=null)
        mobileRef.current.focus();
        reset();
        let t=30
        let interval = null;
        if (!isActive && t > 0) {
            interval = setInterval(() => {
                if (t>0)
                    setSeconds(t>0?t => (t - 1):0);
            }, 1000);
        } else if (!isActive && t !== 0) {
            clearInterval(interval);
            setIsActive(true)

        } else if ( !isActive&&t == 0) {
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
        setVerificationCode(value)
    }
    const exampleFieldClick = () => {
        setClass("input-wrapper form-field--is-active")
    }
    const exampleFieldAbort = () => {
        setClass("input-wrapper")
    }
    const buttonHandler = (value) => {
        alert(value)
    }
    const sendVCode = () => {
        setSeconds(5)
        setIsSendCode(true)
    }
    const confirmVCode = () => {
        setIsConfirmCode(false)
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
                        {/*<TextField id="outlined-basic" label="شماره موبایل خود را وارد کنید." variant="outlined"
                               onKeyDown={handleKeyDown} inputProps={{maxLength: 11}} onChange={mobileHandler}/>*/}
                        {/*<TextField id="outlined-basic" label="کد معرف (اختیاری)" variant="outlined"
                               inputProps={{maxLength: 5}}/>*/}
                        <div className="verificationTxt">کد ارسالی را وارد کنید</div>
                        <div className="verificationCodeSend">کد ۵ رقمی به شماره شما پیامک شد</div>
                        <div className="editMobile" onClick={editMobile}>
                            <img alt="edit" src={editIcon}/>
                            <div>09102101208</div>
                        </div>

                            {/*<div className={inputClass}>
                                <div className="Input-container">
                                    <input placeholder="شماره موبایل" onFocus={exampleFieldClick} onBlur={exampleFieldAbort}
                                           type="tel" dir="ltr"
                                           maxLength="11" className="form-field__input"
                                           value=""/>
                                </div>
                            </div>*/}
                            <ReactCodeInput onChange={vCodeHandler} autoFocus={true} fields={5} onFocus={exampleFieldClick} onBlur={exampleFieldAbort}
                                            onComplete={confirmVCode} fieldWidth={40} fieldHeight={56} type="text" />
                        </div>

                        <div className="verificationBottom">
                            <div className="sendVCode">
                                <div className="notSendVCodeTxt">پیامکی دریافت نکردید؟</div>


                                {!isActive && seconds>0 ?
                                    <div className="description"><span>{seconds}</span>&nbsp;ثانیه تا ارسال مجدد کد</div>
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
                                            onClick={confirmVCode}>ارسال</Button>
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
                            <TextField id="outlined-basic" label="شماره موبایل خود را وارد کنید." variant="filled" value={mobile} onKeyDown={handleMobileKeyDown}
                                       inputProps={{maxLength: 11}} onChange={mobileHandler} ref={mobileRef} className="inputField"/>
                              {/*  <input placeholder="شماره موبایل" type="tel" dir="ltr"
                                       pattern="/^09\d{9}|۰۹[\u06F0-\u06F90-9]{9}$/" maxLength="11"
                                       className="inputField" value={mobile} onChange={mobileHandler} />*/}
                        </div>
                        <div className="verificationBottom">
                            <Button className="" variant="contained" color="secondary"
                                    onClick={sendVCode}
                                    disabled={btnDisabled}>دریافت کد</Button>
                        </div>
                    </div>
                }
            </div>
        </MuiThemeProvider>
    );
}
export default VerificationForm
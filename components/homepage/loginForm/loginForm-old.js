import React, {useState, useContext, useEffect} from "react";
import "./loginForm.css"
import {Button, TextField} from "@material-ui/core";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {useRouter} from "next/router";

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
    let link,code;

    if (typeof window != "undefined"){
        token = JSON.parse(localStorage.getItem('accessToken'));
    }
    useEffect(() => {
        link = window.location.href.split('/');
        if(link[link.length - 2]=="refferal")
        {
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
        }
        else setBtnDisabled(true)
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
            <div className="homeForm" dir="rtl">
                {token == null ?
                    <React.Fragment>

                        <TextField id="outlined-basic" label="شماره موبایل خود را وارد کنید." variant="filled"
                                   value={mobile}
                                   onKeyDown={handleKeyDown} inputProps={{maxlength: 11,inputMode:"numeric"}} onChange={mobileHandler}/>
                        <TextField id="outlined-basic" label="کد معرف (اختیاری)" variant="filled" value={referralCode}
                                   inputProps={{maxLength: 6,inputMode:"numeric"}} onChange={referralCodeHandler} onKeyDown={handleKeyDown} />
                        <Button className="homeFormBtn" variant="contained" color="secondary"
                                onClick={() => props.formAction(mobile, referralCode)}
                                disabled={btnDisabled}>دریافت
                            کد</Button>
                    </React.Fragment>
                    :
                    <Button className="homeFormBtn" variant="contained" color="secondary" onClick={createOrder}>
                        ثبت سفارش
                    </Button>
                }
            </div>
        </MuiThemeProvider>
    );
}
export default HomePageForm
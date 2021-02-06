import React,{useState,useContext} from "react";
import "./loginForm.css"
import {Button, TextField} from "@material-ui/core";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    direction: 'rtl'
});

const HomePageForm = (props) => {

    const [mobile, setMobile] = useState("");
    const [identifierCode, setIdentifierCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);

    let token=null;
    if(typeof window !="undefined")
        token=JSON.parse(localStorage.getItem('token'));

    const validate = () => {
        /*if (password.length < 5) {
            setErrorMessage('رمز عبور اشتباه است.');
            return false;
        }*/
        setErrorMessage('');
        return true;
    }
    const mobileHandler = (e) => {
        setMobile(e.target.value)
        if (e.target.value.length == 11)
            setBtnDisabled(false)
        else setBtnDisabled(true)
    }
    const identifieCodeHandler = (e) => {
        setIdentifierCode(e.target.value)
    }

    const ENTER_KEY = 13
    const handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY)
            props.formAction(mobile);
    }

    return (
        <MuiThemeProvider theme={theme}>
            <div className="homeForm" dir="rtl">
            {token == null ?
                <React.Fragment>
                    <TextField id="outlined-basic" label="شماره موبایل خود را وارد کنید." variant="filled" value={mobile}
                               onKeyDown={handleKeyDown} inputProps={{maxLength: 11}} onChange={mobileHandler}/>
                    <TextField id="outlined-basic" label="کد معرف (اختیاری)" variant="filled" value={identifierCode}
                               inputProps={{maxLength: 5}} onChange={identifieCodeHandler}/>
                    <Button className="downloadBtn" variant="contained" color="secondary" onClick={()=>props.formAction(mobile)}
                            disabled={btnDisabled}>دریافت
                        کد</Button>
                </React.Fragment>
                :
                <Button className="downloadBtn" variant="contained" color="secondary">
                    ثبت سفارش
                </Button>
            }
            </div>
        </MuiThemeProvider>
    );
}
export default HomePageForm
import React, {useContext, useState} from "react";
import "./homepage.css"
import {Col, Container, Row} from "react-bootstrap";
import Form from "./loginForm/loginForm"
import VerificationForm from "./verificationForm/verificationForm"
import {AuthContext} from '../../context/Auth/authContext';
import {useRouter} from "next/router";
import Toolbar from "../../containers/Header/Toolbar/Toolbar";
import axios from "axios";
import Notiflix from "notiflix";

const HomePage = (props) => {
    const router = useRouter()
    const [displayLoginForm, setDisplayLoginForm] = useState(true);
    const [referralCode, setReferralCode] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [mobile, setMobile] = useState("");
    const [showMenu, setShowMenu] = useState(true)
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
        cssAnimationStyle: 'from-top',
        timeout:8000
    });
    Notiflix.Loading.Init({
        svgColor: process.env.loadingDotsColor
    });

    const sendCode = (mobile, referral_Code) => {
        Notiflix.Loading.Dots();
        setReferralCode(referral_Code)
        setMobile(mobile)
        let data = new FormData()
        data.append('phone', mobile)
        axios.post(url + '/sanctum/sendVerifyCode', data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'dataType': 'jsonp',   //you may use jsonp for cross origin request
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((responseJson) => {
                if (responseJson.data.message == "کد تایید با موفقیت ارسال شد.")
                {
                    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixNotifyWrap");
                        myobj.remove();
                    }
                    Notiflix.Notify.Success("کد تایید با موفقیت ارسال شد.");
                    if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixLoadingWrap");
                        myobj.remove();
                    }
                    setVerifyCode(responseJson.data.verify_code);
                    setDisplayLoginForm(false);
                    setShowMenu(false)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        return verifyCode;
    }

    return (
        <React.Fragment>
            <Toolbar isHome={true} showMenu={showMenu}/>
            <div className="main">
                <Container>
                    <Row>
                        <div className="homeBg" style={{display: displayLoginForm ? "block" : "none"}}>
                            <div className="homeDiv">
                                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <Form formAction={sendCode}/>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <div className="tWashTtx">
                                        <h1>کارواش خودرو :</h1>
                                        <ul>
                                            <li>در محل مورد نظر شما</li>
                                            <li>بدون نیاز به حتی یک دقیقه حضور شما</li>
                                            <li>بدون ایجاد کوچک ترین آلودگی صوتی یا محیطی</li>
                                            <li>بدون نیاز به تامین آب، برق و ... توسط شما</li>
                                            <li>با قیمت شفاف بدون انعام</li>
                                        </ul>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className="homeVerificationForm" style={{display: displayLoginForm ? "none" : "block"}}>
                            <VerificationForm  varifyCode={verifyCode} mobile={mobile} sendCode={sendCode} referralCode={referralCode}/>
                        </div>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}
export default HomePage
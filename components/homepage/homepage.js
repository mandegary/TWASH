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
import Link from "next/link";

import logo from "../../assets/images/logo.png"
import subject from "../../assets/images/subject.png"
import car from "../../assets/images/car.png"
import advantagesTop from "../../assets/images/advantagesTop.png"
import carwash from "../../assets/images/carwash.png";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
import img4 from "../../assets/images/img4.png";
import img5 from "../../assets/images/img5.png";
import img6 from "../../assets/images/img6.png";
import img7 from "../../assets/images/img7.png";
import img8 from "../../assets/images/img8.png";
import team from "../../assets/images/team.png";
import surprise from "../../assets/images/surprise.png";
import comments from "../../assets/images/comments.png";
import instagram from "../../assets/images/instagramm.png"
import telegram from "../../assets/images/telegram.png"
import linkedin from "../../assets/images/linkedin.png"
import address from "../../assets/images/address.png"
import phone from "../../assets/images/phone-book.png"
import mail from "../../assets/images/mail.png"
import flogo from "../../assets/images/flogo.png"

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
            <Toolbar isHome={true} showMenu={showMenu} class="homeHead"/>
            {/*<div className="main" style={{display:"block"}}>
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
            </div>*/}
            <main className="homeMain" style={{display: displayLoginForm ? "block" : "none"}}>
                <div className="m-5 d-flex flex-column justify-content-center align-items-center">
                    <img src={logo} className="mb-2 img-fluid"/>
                    <img src={subject} className="img-fluid"/>
                    <div className="w-100 car">
                        <img src={car} className="ml-5 img-fluid"/>
                    </div>
                </div>
                <div className="top-design d-flex justify-content-center align-items-center h-md-50">
                    <Form formAction={sendCode}/>
                </div>

                <div className="text-center">
                    <img src={advantagesTop} className="position-relative mr-auto ml-auto" style={{top:"-100px"}}/>
                </div>

                <div className="d-md-flex flex-md-row pr-5 pl-5 w-100 advantagesTxt d-flex flex-column justify-content-center">
                    <ul  className="w-25 text-center w-sm-100">
                        <li>
                            <img src={img5}/>
                            <p>صرفه جویی و مدیریت زمان</p>
                        </li>
                        <li>
                            <img src={img6}/>
                            <p>اجتناب از حضور در محیط
                                آلوده کارواش های سنتی</p>
                        </li>
                        <li>
                            <img src={img7}/>
                            <p>انتخاب محل شستشو</p>
                        </li>
                        <li>
                            <img src={img8}/>
                            <p>تیم کارواشمن مجرب</p>
                        </li>
                    </ul>
                    <div className="advantagesTxtCntr w-50 w-sm-100">
                        <img src={carwash} className="img-fluid"/>
                        <div className="border w-50 mr-auto ml-auto mt-5 p-3">
                            <p className="text-center" style={{color:"#02868b"}}>کیفیت شستشوی بی نظیر</p>
                            <p className="text-justify">یکی از اصلی ترین مزایای کارواش تی‌سَپ، کیفیت بی نظیر شستشوی خودرو می باشد. در انتهای کار، خودروی شما با بالاترین کیفیت شستشو تحویل شده و جلب رضایت کامل شما، وظیفه کارواشمن ماست.</p>
                        </div>
                    </div>
                    <ul className="w-25 text-center w-sm-100">
                        <li>
                            <img src={img1}/>
                            <p>کیفیت شستشوی بی نظیر</p>
                        </li>
                        <li>
                            <img src={img2}/>
                            <p>استفاده از مواد نانوی برگزیده</p>
                        </li>
                        <li>
                            <img src={img3}/>
                            <p>شفافیت در قیمت خدمات
                                و عدم پرداخت انعام</p>
                        </li>
                        <li>
                            <img src={img4}/>
                            <p>اجتناب از آلوده شدن محیط
                                و ایجاد سر و صدا</p>
                        </li>
                    </ul>
                </div>

                <div className="team mb-5">
                    <div className="w-75 brd"></div>
                    <div className="teamtop p-5">
                        <img src={team} className="w-75 p-5"/>
                    </div>
                    <ul className="d-flex flex-md-row justify-content-around teamItems flex-column">
                        <li className="w-25 text-center w-sm-100">
                            <div>تیم مدیریتی:</div>
                        </li>
                        <li className="w-25 text-center w-sm-100">
                            <div>تیم کارواشمن:</div>
                            <p>کارواشمن های تی‌سَپ پس از گذراندن آموزش های لازم در امر ارائه خدمات و همچنین نحوه برخورد با مشتریان و رعایت نظم و انضباط و پروتکل های بهداشتی حین شستشو، آماده ارائه خدمات به مشتریان عزیز می باشند.</p>
                        </li>
                        <li className="w-25 text-center w-sm-100">
                            <div>تیم پشتیبانی:</div>
                        </li>
                    </ul>
                </div>

                <div className="surprise d-flex flex-row align-items-end justify-content-between">
                    <div className="brdPink" style={{borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}}></div>
                    <img src={surprise}/>
                    <div className="brdPink" style={{borderTopRightRadius:"0",borderBottomRightRadius:"0"}} ></div>
                </div>
                <div className="surpriseTxt text-center p-5">
                    <h6 className="mb-3">
                        هدایای تی‌سَپ
                    </h6>
                    <p>
                        شما با معرفی تی‌سَپ به دوستان و عزیزانتان می توانید اعتبار 10 هزار تومانی هدیه گرفته و در شستشوی بعدی از آن استفاده کنید. برای این کار، فرد معرفی شده می بایست کد معرف شما را هنگام ورود به سایت، در محل مشخص شده وارد نماید. همچنین دوست شما با وارد کردن کد معرف شما، 21 هزار تومان اعتبار هدیه خواهد گرفت.
                    </p>
                </div>
                <div className="comments w-75 mr-auto ml-auto text-right w-sm-100">
                    <span className="m-md-0 m-2 mb-2">نظرات شما</span>
                    <div className="border d-flex align-items-md-start mt-2 align-content-center flex-column-reverse flex-md-row align-items-center m-md-0 m-2 ">
                        <p className="m-5">شما با ثبت اولین سفارش، عضو خانواده بزرگ مشتریان تی‌سَپ خواهید شد. شما با ارائه نظرات و انتقادات و پیشنهادات خود، ضمن کمک به ما در بهبود ارائه خدمات، در قرعه کشی های مناسبتی نیز مشارکت داده خواهید شد.</p>
                        <img src={comments}/>
                    </div>
                </div>
            </main>
            <footer className="mt-5">
                <div className="w-100 h-100  d-md-flex flex-row justify-content-center align-items-center d-none">
                    <div className="w-25 text-center">
                        <ul>
                            <li className="d-flex flex-row-reverse justify-content-start align-items-center m-4">
                                <img src={phone}/>
                                <p>
                                    09381564444
                                </p>
                            </li>
                            <li className="d-flex flex-row-reverse justify-content-start align-items-center m-4">
                                <img src={mail}/>
                                <p>
                                    tsapp.ir@gmail.com
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="w-50 text-center">
                        <img src={flogo}/>
                        <div className="">
                            <div className="mt-3 d-flex flex-row text-center justify-content-center align-items-center">
                                <p>
                                    آدرس: تهران، جنب ایستگاه متروی شریف ،منطقه فن آوری شریف
                                    <br/>
                                    <span>دفتر سامانه خدمات کارواش در محل تی‌سَپ</span>
                                </p>
                                <img src={address} className="img-fluid"/>
                            </div>

                        </div>
                    </div>

                    <div className="w-25 text-center d-flex flex-column">
                        <Link href="/tsapp">
                            <a className="m-2" target="_blank">
                                <img src={instagram}/>
                            </a>
                        </Link>
                        <Link href="/tsapp">
                            <a className="m-2" target="_blank">
                                <img src={telegram}/>
                            </a>
                        </Link>
                        <Link href="/tsapp">
                            <a className="m-2" target="_blank">
                                <img src={linkedin}/>
                            </a>
                        </Link>

                    </div>


                </div>
            </footer>
        </React.Fragment>
    );
}
export default HomePage
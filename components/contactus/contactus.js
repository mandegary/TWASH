import React, {useContext, useState} from "react";
import "./contactus.css"
import {Col, Container, Row} from "react-bootstrap";
import {AuthContext} from '../../context/Auth/authContext';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Form from 'react-bootstrap/Form'
import {FormControl, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import contactUsImg from "../../public/images/carwash.jpg"
import Notiflix from "notiflix";
import axios from "axios";

const theme = createMuiTheme({
    direction: 'rtl',
});
const ContactUs = (props) => {
    const errorRef = React.createRef();
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [tell, setTell] = useState("09381564444");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);
    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let mobilePattern=/09\d{9}/;
    const {dispatch} = useContext(AuthContext);
    let url = process.env.url;
    let token = null;
    if (typeof window != "undefined")
        token = JSON.parse(localStorage.getItem('accessToken'));
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
    const mobileHandler = (event) => {
        setMobile(event.target.value)
        validate(name != ""  && message!="" && mobilePattern.test(event.target.value) && event.target.value != ""/*&& emailPattern.test(event.target.value)&& email!=""*/);
        setMobileError(event.target.value=="" || !mobilePattern.test(event.target.value))
    }
    const emailHandler = (event) => {
        setEmail(event.target.value)
        setEmailError(event.target.value=="" || !emailPattern.test(event.target.value))
        validate(name != ""  && mobile!="" && message!="" && event.target.value != "" && emailPattern.test(event.target.value)&& mobilePattern.test(mobile));
    }
    const nameHandler = (event) => {
        setName(event.target.value)
        setNameError(event.target.value =="")
        validate(event.target.value != ""  && message!="" && mobilePattern.test(mobile) && mobile != "" /*&& emailPattern.test(email)&& email!=""*/);
    }
    const messageHandler = (event) => {
        setMessage(event.target.value)
        setMessageError(event.target.value =="")
        validate(name != "" && event.target.value != "" && message!="" && mobilePattern.test(mobile) && mobile!="" && mobile != ""  /*&& email!="" && emailPattern.test(email)*/);
    }
    const validate = (result) => {
        if (result) {
            setBtnDisabled(false)
        } else setBtnDisabled(true)
    }
    const createMsg = () => {
        Notiflix.Loading.Dots();
        let data = new FormData()
        data.append('name', name)
        //data.append('email', email)
        data.append('phone', mobile)
        data.append('message', message)

        axios.post(url + '/contact', data, {
            headers: {
                'Accept': 'application/json',
                'dataType': 'json',   //you may use jsonp for cross origin request
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': "Bearer " + token
            }
        })
            .then((responseJson) => {
                if (responseJson.data.message == "درخواست با موفقیت ثبت شد.") {
                    setName("")
                    setEmail("")
                    setMessage("")
                    setMobile("")
                    setBtnDisabled(true)
                    if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixLoadingWrap");
                        myobj.remove();
                    }
                    Notiflix.Notify.Success('پیام شما ارسال شد. با تشکر');
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <MuiThemeProvider theme={theme}>
            <div className="contactus">
                <Container>
                    <Row className="contactus-info">
                        {/*<Col xl="4" lg="4" md="12" xs="12">
                            <div>
                                <b>آدرس:</b>
                                <br/>
                                <span>{address}</span>
                            </div>
                        </Col>*/}
                        <Col xl="6" lg="6" md="12" xs="12">
                            <div>
                                <b>تلفن تماس:</b>
                                <br/>
                                <span>{tell}</span>
                            </div>
                        </Col>
                        <Col xl="6" lg="6" md="12" xs="12">
                            <div>
                                <b>آدرس ایمیل:</b>
                                <br/>
                                <span>{email}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className=" contactus-form">
                        <Col xl="12" lg="12" md="12" xs="12">
                            <div className="titr">
                                <h5>تماس با ما</h5>
                            </div>
                            <Form>
                                <React.Fragment>
                                    <Row>
                                        <Col xl="12" lg="12" md="12" xs="12">
                                            <div className="formItem" dir="rtl">
                                                <TextField id="outlined-basic" label="نام و نام خانوادگی" variant="filled"
                                                           value={name} error={nameError}
                                                           onChange={nameHandler}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl="12" lg="12" md="12" xs="12">
                                            <div className="formItem" dir="rtl">
                                                <TextField id="outlined-basic" label="شماره تماس" variant="filled" inputProps={{maxLength: 11}}
                                                           value={mobile} onChange={mobileHandler} error={mobileError}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    {/*<Row>
                                        <Col xl="12" lg="12" md="12" xs="12">
                                            <div className="formItem" dir="rtl">
                                                <TextField id="outlined-basic" label="آدرس ایمیل" variant="filled" error={emailError}
                                                           value={email} onChange={emailHandler}/>
                                            </div>
                                        </Col>
                                    </Row>*/}
                                </React.Fragment>
                                <Row>
                                    <Col xl="12" lg="12" md="12" xs="12">
                                        <div dir="rtl" className="formItem">
                                            <FormControl>
                                                <TextField id="outlined-multiline-flexible" label="متن پیام شما" error={messageError}
                                                           variant="filled" multiline rows={4} value={message}
                                                           onChange={messageHandler}/>
                                            </FormControl>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="contactusBtn">
                                    <Button className="" variant="contained" color="secondary"
                                            onClick={createMsg} disabled={btnDisabled}>ارسال</Button>
                                </Row>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </MuiThemeProvider>
    );
}
export default ContactUs
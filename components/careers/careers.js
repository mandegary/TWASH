import React, {useContext, useState} from "react";
import "./careers.css"
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
const Careers = (props) => {
    const errorRef = React.createRef();
    const [subject, setSubject] = useState("");
    const [subjectError, setSubjectError] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [family, setFamily] = useState("");
    const [familyError, setFamilyError] = useState(false);
    const [mobile, setMobile] = useState("");
    const [mobileError, setMobileError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
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

    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let mobilePattern=/09\d{9}/;
    const nameHandler = (event) => {
        setName(event.target.value)
        setNameError(event.target.value =="")
        validate(event.target.value !="" && family !="" && mobile!="" && mobilePattern.test(mobile) /*&& emailPattern.test(email) && email!=""*/ && subject!="" );
    }
    const familyHandler = (event) => {
        setFamily(event.target.value)
        setFamilyError(event.target.value =="")
        validate(name !="" && event.target.value !="" && mobile!=""  && subject!="" && mobilePattern.test(mobile) /*&& email!="" && emailPattern.test(email)*/);
    }
    const mobileHandler = (event) => {
        setMobile(event.target.value)
        setMobileError(event.target.value=="" || !mobilePattern.test(event.target.value))
        validate(name !="" && family !="" && event.target.value!="" && mobilePattern.test(event.target.value) /*&& email!=""&& emailPattern.test(email)*/ && subject!="" );
    }
    const emailHandler = (event) => {
        setEmail(event.target.value)
        setEmailError(event.target.value=="" || !emailPattern.test(event.target.value))
        validate(name !="" && family !="" && mobile!="" && event.target.value!="" && emailPattern.test(event.target.value)&& mobilePattern.test(mobile) && subject!="" );
    }
    const subjectHandler = (event) => {
        setSubject(event.target.value)
        setSubjectError(event.target.value =="")
        validate(name !="" && family !="" && mobile!="" && event.target.value!="" &&  mobilePattern.test(mobile)  /* && email!="" && emailPattern.test(email)*/ );
    }
    const descriptionHandler = (event) => {
        setDescription(event.target.value)
        setDescriptionError(event.target.value =="")
        validate(name !="" && family !="" && mobile!=""  && subject!="" && mobilePattern.test(mobile) /*&& emailPattern.test(email)&& email!=""*/);
    }
    const validate = (result) => {
        if (result) {
            setBtnDisabled(false)
        }
        else setBtnDisabled(true)
    }
    const createJob = () => {
        Notiflix.Loading.Dots();
        let data = new FormData()
        data.append('name', name)
        data.append('last_name', family)
        data.append('email', email)
        data.append('phone', mobile)
        data.append('skills', subject)
        data.append('message', description)

        axios.post(url + '/job/request', data, {
            headers: {
                'Accept': 'application/json',
                'dataType': 'json',   //you may use jsonp for cross origin request
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                /*'Authorization': "Bearer " + token*/
            }
        })
            .then((responseJson) => {
                if (responseJson.data.message == "درخواست با موفقیت ثبت شد.") {
                    setName("")
                    setEmail("")
                    setMobile("")
                    setFamily("")
                    setSubject("")
                    setDescription("")
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
            <div className="careers">
                <Container>
                    <Row className="careers-form">
                        <Col xl="12" lg="12" md="12" xs="12">
                            <div className="titr">
                                <h5>فرصت های شغلی</h5>
                                <span>با ملحق شدن به تیم کارواشمن تی سپ، ماهانه حداقل 4.5 میلیون تومان درامد کسب کنید.</span>
                            </div>
                            <p ref={errorRef} className="error">{errorMessage}</p>
                            <Form>
                                <React.Fragment>
                                    <Row>
                                        <Col xl="6" lg="6" md="6" xs="12">
                                            <div className="formItem" dir="rtl">
                                                <TextField id="outlined-basic" label="نام خانوادگی" variant="filled" required
                                                           error={familyError} value={family} onChange={familyHandler}/>
                                            </div>
                                        </Col>
                                        <Col xl="6" lg="6" md="6" xs="12">
                                            <div className="formItem" dir="rtl">
                                                <TextField id="outlined-basic" label="نام" variant="filled" required
                                                           value={name} error={nameError}
                                                           onChange={nameHandler}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {/*<Col xl="6" lg="6" md="6" xs="12">
                                            <div className="formItem" dir="rtl">
                                                <TextField id="outlined-basic" label="آدرس ایمیل" variant="filled"
                                                           error={emailError} value={email} onChange={emailHandler}/>
                                            </div>
                                        </Col>*/}
                                        <Col xl="12" lg="122" md="12" xs="12">
                                            <div className="formItem" dir="rtl">
                                                <TextField id="outlined-basic" label="شماره تماس" variant="filled" error={mobileError} required
                                                           inputProps={{maxLength: 11}} value={mobile} onChange={mobileHandler}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                                <Row>
                                    <Col xl="12" lg="12" md="12" xs="12">
                                        <div className="formItem" dir="rtl">
                                            <TextField id="outlined-basic" label="مهارت" variant="filled" required
                                                       value={subject} onChange={subjectHandler} error={subjectError}/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl="12" lg="12" md="12" xs="12">
                                        <div dir="rtl" className="formItem">
                                            <FormControl>
                                                <TextField id="outlined-multiline-flexible" label="توضیحات" error={descriptionError}
                                                           variant="filled" multiline rows={4} value={description}
                                                           onChange={descriptionHandler}/>
                                            </FormControl>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="careerBtn">
                                        {/*{
                                            isLoading?
                                                <Loader/>
                                                :*/}
                                        <Button className="" variant="contained" color="secondary"
                                                onClick={createJob} disabled={btnDisabled}>ثبت اطلاعات</Button>
                                        {/*}*/}
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </MuiThemeProvider>
    );
}
export default Careers
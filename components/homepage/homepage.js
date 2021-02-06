import React, {useContext, useState} from "react";
import "./homepage.css"
import {Col, Container, Row} from "react-bootstrap";
import Form from "./loginForm/loginForm"
import VerificationForm from "./verificationForm/verificationForm"
import {AuthContext} from '../../context/Auth/authContext';

const HomePage = (props) => {
    const [displayLoginForm, setDisplayLoginForm] = useState(true);
    const {dispatch} = useContext(AuthContext);
    const sendCode = (mobile) => {
        setDisplayLoginForm(false)
        /*let token = "test";
        dispatch({
            type: 'login', payload:
                {
                    token: token,
                }
        });*/
    }

    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="homeBg" style={{display:displayLoginForm?"block":"none"}}>
                        <div className="homeDiv">
                            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                <Form formAction={sendCode}/>
                            </Col>
                            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                <div className="tWashTtx">
                                    <h1>کارواش خودرو :</h1>
                                    <ul>
                                        <li>در محل موردنظر شما</li>
                                        <li>بدون نیاز به حتی یک دقیقه حضور شما</li>
                                        <li>بدون ایجاد کوچک ترین آلودگی صوتی یا محیطی</li>
                                        <li>بدون نیاز به تامین آب، برق و ... توسط مشتری</li>
                                        <li>با قیمت شفاف بدون انعام</li>
                                    </ul>
                                </div>
                            </Col>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="homeVerificationForm" style={{display:displayLoginForm?"none":"block"}}>
                        <VerificationForm/>
                    </div>
                </Row>
            </Container>
        </div>
    );
}
export default HomePage
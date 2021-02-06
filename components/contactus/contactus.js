import React, {useContext, useState} from "react";
import "./contactus.css"
import {Col, Container, Row} from "react-bootstrap";
import {AuthContext} from '../../context/Auth/authContext';

const ContactUs = (props) => {
    const [displayLoginForm, setDisplayLoginForm] = useState(true);
    const {dispatch} = useContext(AuthContext);


    return (
        <div className="main">
            <Container>
                <Row>
                    CONTACTUS
                </Row>
            </Container>
        </div>
    );
}
export default ContactUs
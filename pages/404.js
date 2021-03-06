import React, {useState, useEffect, useRef, useContext, Component} from 'react';
import "../assets/css/404.css"
import {Col, Container, Row} from "react-bootstrap";
import Toolbar from "../containers/Header/Toolbar/Toolbar";
import Img404 from "../assets/images/Image 10.png"

function _404(props) {
    return (
        <React.Fragment>
            <Toolbar/>
            <Container>
                <Row className="notFound">
                    <Col xl={2} lg={2} md={1} sm={1} xs={1}>
                    </Col>
                    <Col xl={8} lg={8} md={10} sm={10} xs={10} className="notFoundMain">
                        <img className="notfoundImg" src={Img404}/>
                        <p><span>خطا ۴۰۴،</span> متاسفانه صفحه مورد نظر یافت نشد!</p>
                        <span>404 | Page Not Found</span>
                    </Col>
                    <Col xl={2} lg={2} md={1} sm={1} xs={1}>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default _404;
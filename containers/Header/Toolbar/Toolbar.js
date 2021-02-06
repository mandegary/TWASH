import React, {useState, useContext, useRef, useEffect} from 'react';
import './Toolbar.css';
import Link from 'next/link'
import {useRouter} from "next/router";
import {Button} from '@material-ui/core';
import {Col, Container, Row} from "react-bootstrap";
import Logo from "../logo/logo";
import MenuItems from "../MenuItems/MenuItems";
import SideDrawer from '../SideDrawer/SideDrawer';
import drawer from "../../../assets/images/menu.png"

const scrollToRef = (ref) => ref.current!=undefined?window.scrollTo(0, ref.current.offsetTop):null
const Toolbar = (props) => {
    const router = useRouter()
    const startRef = useRef(null)
    const [openSideDrawer, setOpenSideDrawer] = useState(false)
    const [openBackdrop, setOpenBackdrop] = useState(false)
    const DrawerHandler = () => {
        setOpenSideDrawer(true)
    }
    const closeDrawer = () => {
        setOpenSideDrawer(false)
    }
    const showBackdrop = () => {
        setOpenBackdrop(true)
    }
    const closeBackdrop = () => {
        setOpenBackdrop(false);
    }
    return (
        <header className="header" id="header" ref={startRef}>
            <Container>
                <Row>
                    <Col xl={2} lg={2} md={5} sm={5} xs={5}>
                        <Button className="downloadBtn" variant="contained" color="secondary">دانلود اپلیکیشن تی واش</Button>
                    </Col>
                    <Col xl={7} lg={7} md={2} sm={2} xs={2} className="topMenu">
                        <MenuItems/>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Logo/>
                    </Col>
                    <Col xl={2} lg={2} md={1} sm={1} xs={1} className="drawer" onClick={DrawerHandler}>
                        <img src={drawer}/>
                    </Col>
                    <SideDrawer show={openSideDrawer} closeDrawer={closeDrawer}/>
                </Row>
            </Container>
        </header>
    )
}
export default React.memo(Toolbar);
import React, {useEffect, useState} from "react";
import Toolbar from "../containers/Header/Toolbar/Toolbar";
import Orders from "../components/orders/orders"
import {useRouter} from "next/router";
export default function ContactUsPage() {
    const router = useRouter()
    const [show, setShow] = useState(false);
    let token;
    if (process.browser)
        token = JSON.parse(localStorage.getItem('accessToken'));
    useEffect(() => {
        if (token != null)
            setShow(true)
        else router.push('/')
    }, []);

    return (
        show &&
        <React.Fragment>
            <Toolbar/>
            <Orders/>
        </React.Fragment>
    )
}

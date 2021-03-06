import React, {useEffect, useState} from "react";
import "./payment.css"
import Toolbar from "../../containers/Header/Toolbar/Toolbar";
import {useRouter} from "next/router";
import Link from 'next/link'

export default function FailurePayment() {
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
        <React.Fragment>
            <Toolbar/>
            <div className="paymentStatus failurePayment">
                <h3>
                    پرداخت ناموفق بود.
                    برای ثبت سفارش جدید بر روی لینک زیر کلیک کنید.
                </h3>
                <Link href="/order">
                    <a href="/order">سفارش مجدد</a>
                </Link>
            </div>
        </React.Fragment>
    )
}

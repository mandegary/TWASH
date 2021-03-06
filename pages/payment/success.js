import React, {useEffect, useState} from "react";
import "./payment.css"
import {useRouter} from "next/router";
import Link from 'next/link'
import Toolbar from "../../containers/Header/Toolbar/Toolbar";
import {
    EmailIcon,
    EmailShareButton, FacebookIcon, FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import {Button} from "@material-ui/core";
import Notiflix from "notiflix";

export default function SuccessPayment() {
    const router = useRouter()
    const [show, setShow] = useState(false);
    const title = "با ثبت نام در سی تپ با استفاده از این کد از تی سپ اعتبار بگیرید.";
    let code="";
    if (typeof window != "undefined") {
        code = JSON.parse(localStorage.getItem('refferalCode'));
    }
    let token;
    if (process.browser)
        token = JSON.parse(localStorage.getItem('accessToken'));
    useEffect(() => {
        if (token != null)
            setShow(true)
        else router.push('/')
    }, []);
    const copyLink = async copyMe => {
        try {
            if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                var myobj = document.getElementById("NotiflixNotifyWrap");
                myobj.remove();
            }
            await navigator.clipboard.writeText(code);
            Notiflix.Notify.Success('کد شما کپی شد.');
        } catch (err) {
            Notiflix.Notify.Failure('لطفا دوباره تلاش کنید.');
        }
    };

    return (
        <React.Fragment>
            <Toolbar/>
            <div className="paymentStatus successPayment">
                <h3>
                     با تشکر از شما پرداخت با موفقیت انجام شد.
                </h3>
                <p>برای پیگیری سفارش خود بر روی لینک زیر کلیک کنید.</p>
                <Link href="/orders">
                    <a href="/orders">ادامه</a>
                </Link>
                <div className="refferal">
                    <span>
                        با اشتراک گذاری این کد با دوستانتان هم شما و هم دوستانتان اعتبار هدیه دریافت نمایید.
                    </span>
                    <div>
                        <div>
                            <span>کد شما</span>
                            {code}
                        </div>
                        <TelegramShareButton
                            url={code}
                            title={title}
                            className="Demo__some-network__share-button"
                        >
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                        <WhatsappShareButton
                            url={code}
                            title={title}
                            separator=" :: "
                            className="Demo__some-network__share-button"
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <TwitterShareButton
                            url={code}
                            title={title}
                            className="Demo__some-network__share-button"
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <EmailShareButton
                            url={code}
                            subject={title}
                            body="body"
                            className="Demo__some-network__share-button"
                        >
                            <EmailIcon size={32} round />
                        </EmailShareButton>
                        <FacebookShareButton
                            url={code}
                            quote={title}
                            className="Demo__some-network__share-button"
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>

                    </div>
                    <Button onClick={copyLink} color="primary" variant="fill" className="dialogBtn">
                        کپی کردن کد
                    </Button>
                </div>

            </div>
        </React.Fragment>

    )
}

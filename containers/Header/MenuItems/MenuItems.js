import React from 'react';
import './MenuItems.css';
import Link from 'next/link'
import {useRouter} from "next/router";

const MenuItems = (props) => {
    const router = useRouter();
    let token;
    if (process.browser)
        token = JSON.parse(localStorage.getItem('accessToken'));
    return (
        <React.Fragment>
            {
                props.showMenu != undefined && !props.showMenu ?
                    null
                    /*: props.isHome?
                    <ul className="MenuItems">
                        <li className="MenuItem">
                            <Link href="/careers" activeClassName="active">
                                <a className={router.asPath == "" ? "active" : ""}>
                                    فرصت های شغلی
                                </a>
                            </Link>
                        </li>
                        <li className="MenuItem">
                            <Link href="/contactus" activeClassName="active">
                                <a className={router.asPath == "" ? "active" : ""}>
                                    تماس با ما
                                </a>
                            </Link>
                        </li>
                        <li className="MenuItem">
                            <Link href="" activeClassName="active">
                                <a className={router.asPath == "" ? "active" : ""}>
                                    پنل سازمانی
                                </a>
                            </Link>
                        </li>
                        <li className="MenuItem">
                            <Link href="/blog" activeClassName="active">
                                <a className={router.asPath == "" ? "active" : ""}>
                                    وبلاگ
                                </a>
                            </Link>
                        </li>
                    </ul>*/
                    :
                    <ul className="MenuItems">

                        {token != undefined ?
                            <li className="MenuItem">
                                <Link href="/order" activeClassName="active">
                                    <a className={router.asPath == "" ? "active" : ""}>
                                        ثبت سفارش جدید
                                    </a>
                                </Link>
                            </li>
                            : null
                        }
                        {token != undefined ?
                            <li className="MenuItem">
                                <Link href="/orders" activeClassName="active">
                                    <a className={router.asPath == "" ? "active" : ""}>
                                        پیگیری سفارش ها
                                    </a>
                                </Link>
                            </li>
                            : null
                        }
                        <li className="MenuItem">
                            <Link href="/careers" activeClassName="active">
                                <a className={router.asPath == "" ? "active" : ""}>
                                    فرصت های شغلی
                                </a>
                            </Link>
                        </li>
                        {token != undefined ?
                            <li className="MenuItem">
                                <a href="javascript:void(0)" onClick={props.showCodeModal}>
                                    معرفی به دوستان
                                </a>
                            </li>
                            : null
                        }
                        <li className="MenuItem">
                            <Link href="/contactus" activeClassName="active">
                                <a className={router.asPath == "" ? "active" : ""}>
                                    تماس با ما
                                </a>
                            </Link>
                        </li>

                        {/*<li className="MenuItem">
                            <Link href="" activeClassName="active">
                                <a className={router.asPath == "" ? "active" : ""}>
                                    پنل سازمانی
                                </a>
                            </Link>
                        </li>
                        <li className="MenuItem">
                            <Link href="/" activeClassName="active">
                                <a className={router.asPath == "" ? "active" : ""}>
                                    وبلاگ
                                </a>
                            </Link>
                        </li>*/}
                    </ul>
            }
        </React.Fragment>
    )
}
export default MenuItems
import React from 'react';
import './MenuItems.css';
import Link from 'next/link'
import {useRouter} from "next/router";

const MenuItems = (props) => {
    const router = useRouter();
    return (
        <ul className="MenuItems">
            <li className="MenuItem">
                <Link href="/" activeClassName="active">
                    <a className={router.asPath == "" ? "active" : ""}>
                        فرصت های شغلی
                    </a>
                </Link>
            </li>
            <li className="MenuItem">
                <Link href="/" activeClassName="active">
                    <a className={router.asPath == "" ? "active" : ""}>
                        تماس با ما
                    </a>
                </Link>
            </li>
            <li className="MenuItem">
                <Link href="/" activeClassName="active">
                    <a className={router.asPath == "" ? "active" : ""}>
                       پیگیری سفارش
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
                <Link href="/" activeClassName="active">
                    <a className={router.asPath == "" ? "active" : ""}>
                        وبلاگ
                    </a>
                </Link>
            </li>
        </ul>
    )
}
export default MenuItems
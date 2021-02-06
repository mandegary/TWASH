import React from 'react';
import './logo.css';
import TLogo from '../../../assets/images/logo.jpg';
import Link from 'next/link'

const Logo = (props)=>{
    return(
        <div className="Logo">
            <Link href="/">
                <a>
                    <img src={TLogo} alt="کارواش تی واش" title="TWash"/>
                </a>
            </Link>
        </div>
    )
}
export default React.memo(Logo);
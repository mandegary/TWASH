import React from 'react';
import Logo from '../logo/logo';
import MenuItems from "../MenuItems/MenuItems";
import './SideDrawer.css';
import Backdrop from '../../../components/UI/backdrop/Backdrop';

const SideDrawer = (props) => {
    let classes = ['SideDrawer', 'Close'];
    if (props.show) {
        classes = ['SideDrawer', 'Open']
    }
    return (
        <React.Fragment>
            <Backdrop show={props.show} modalClosed={props.closeDrawer}/>
            <div className={classes.join(' ')}>
                <div className="SideDrawerHead">
                    <span className="toggler" onClick={props.closeDrawer}></span>
                    <Logo/>
                </div>
                <MenuItems sidedrawer="true"/>
            </div>
        </React.Fragment>
    )
}
export default SideDrawer;
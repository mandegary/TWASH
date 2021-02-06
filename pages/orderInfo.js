import React from "react";
import Toolbar from "../containers/Header/Toolbar/Toolbar";
import Order from "../components/order/orderInfo"
export default function OrderInfo() {
    return (
        <React.Fragment>
            <Toolbar/>
            <Order/>
        </React.Fragment>
    )
}

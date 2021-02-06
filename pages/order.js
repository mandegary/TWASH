import React from "react";
import Toolbar from "../containers/Header/Toolbar/Toolbar";
import Order from "../components/order/order"
export default function CreateOrder() {
    return (
        <React.Fragment>
            <Toolbar/>
            <Order/>
        </React.Fragment>
    )
}

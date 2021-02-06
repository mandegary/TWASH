import React from 'react';
import './Backdrop.css';
const Backdrop=(props)=>{
    let _class=props.class+" Backdrop";
    return(
        props.show?<div className= {_class} onClick={props.modalClosed}></div>:null
)
}
export default Backdrop
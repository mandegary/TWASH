import React, {useState, useContext, useEffect} from "react";
import "./imagesSection.css"
import {Button, TextField} from "@material-ui/core";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {useRouter} from "next/router";
import Form from 'react-bootstrap/Form'
import {Col, Row} from 'react-bootstrap'
import slide1 from "../../../assets/images/slide1.jpeg"
import slide2 from "../../../assets/images/slide2.jpeg"
import slide3 from "../../../assets/images/slide3.jpeg"
import slide4 from "../../../assets/images/slide4.jpeg"
const theme = createMuiTheme({
    direction: 'rtl'
});

const ImagesSection = (props) => {
    const router = useRouter()
    const [activeClasses, setActiveClasses] = useState([true, false, false , false]);
    function addActiveClass(index) {
        //console.log(activeClasses)
        let _activeClasses =  [false, false, false , false]
        _activeClasses = [..._activeClasses.slice(0, index), !_activeClasses[index], _activeClasses.slice(index + 1)].flat();
        setActiveClasses(_activeClasses);
    }
    return (
        <MuiThemeProvider theme={theme}>
            <div
                className="imgSlides vh-100 w-75 mr-auto ml-auto text-right w-sm-100 mb-3"
                dir="rtl">
                <div className="imgSlides vh-100 w-100 mr-auto ml-auto text-right w-sm-100 position-relative">
                    <img className={activeClasses[0]? "activeSlide imgSlide0 imgSlide" : "inactive imgSlide0 imgSlide"} onClick={() => addActiveClass(0)} src={slide4}  style={{left:"0%"}}/>
                    <img className={activeClasses[1]? "activeSlide imgSlide1 imgSlide" : "inactive imgSlide1 imgSlide"} onClick={() => addActiveClass(1)} src={slide3}  style={{left:"20%"}}/>
                    <img className={activeClasses[2]? "activeSlide imgSlide2 imgSlide" : "inactive imgSlide2 imgSlide"} onClick={() => addActiveClass(2)} src={slide2}  style={{left:"40%"}}/>
                    <img className={activeClasses[3]? "activeSlide imgSlide3 imgSlide" : "inactive imgSlide3 imgSlide"} onClick={() => addActiveClass(3)} src={slide1}  style={{left:"60%"}}/>

                </div>
            </div>
        </MuiThemeProvider>
    );
}
export default ImagesSection
import React, {useState, useContext, useEffect} from "react";
import "./imagesSection.css"
import {Button, TextField} from "@material-ui/core";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {useRouter} from "next/router";
import Form from 'react-bootstrap/Form'
import {Col, Row,Container} from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import '@brainhubeu/react-carousel/lib/style.css';
import Carousel from "react-multi-carousel";
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
    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 600, min: 0},
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    function addActiveClass(index) {
        //console.log(activeClasses)
        let _activeClasses =  [false, false, false , false]
        _activeClasses = [..._activeClasses.slice(0, index), !_activeClasses[index], _activeClasses.slice(index + 1)].flat();
        setActiveClasses(_activeClasses);
    }
    return (
        <Container>
            <Carousel
                swipeable={true}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customTransition="all 0.7s"
                transitionDuration={500}
                containerClass="carousel-container"
                //removeArrowOnDeviceType={["tablet", "mobile"]}
                /*deviceType={this.props.deviceType}*/
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px">
                <img src={slide4} />
                <img src={slide3} />
                <img src={slide2} />
                <img src={slide1} />
            </Carousel>
        </Container>
        // <Swiper
        //     spaceBetween={200}
        //     centeredSlides= {true}
        //     slidesPerView="1"
        //     onSlideChange={() => console.log('slide change')}
        //     onSwiper={(swiper) => console.log(swiper)}
        // >
        //     <SwiperSlide><div><img src={slide4} /></div></SwiperSlide>
        //     <SwiperSlide><div><img src={slide4} /></div></SwiperSlide>
        //     <SwiperSlide><div><img src={slide4} /></div></SwiperSlide>
        //     <SwiperSlide><div><img src={slide4} /></div></SwiperSlide>
        //     ...
        // </Swiper>
        // <MuiThemeProvider theme={theme}>
        //     <div
        //         className="imgSlides vh-100 w-75 mr-auto ml-auto text-right w-sm-100 mb-3"
        //         dir="rtl">
        //         <div className="imgSlides vh-100 w-100 mr-auto ml-auto text-right w-sm-100 position-relative">
        //             <img className={activeClasses[0]? "activeSlide imgSlide0 imgSlide" : "inactive imgSlide0 imgSlide"} onClick={() => addActiveClass(0)} src={slide4}  style={{left:"0%"}}/>
        //             <img className={activeClasses[1]? "activeSlide imgSlide1 imgSlide" : "inactive imgSlide1 imgSlide"} onClick={() => addActiveClass(1)} src={slide3}  style={{left:"20%"}}/>
        //             <img className={activeClasses[2]? "activeSlide imgSlide2 imgSlide" : "inactive imgSlide2 imgSlide"} onClick={() => addActiveClass(2)} src={slide2}  style={{left:"40%"}}/>
        //             <img className={activeClasses[3]? "activeSlide imgSlide3 imgSlide" : "inactive imgSlide3 imgSlide"} onClick={() => addActiveClass(3)} src={slide1}  style={{left:"60%"}}/>
        //
        //         </div>
        //     </div>
        // </MuiThemeProvider>
    );
}
export default ImagesSection
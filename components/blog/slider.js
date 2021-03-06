import React from "react";
import Link from 'next/link'
import {Col, Container, Row} from "react-bootstrap";
import Carousel from "react-multi-carousel";
import Img1 from "../../assets/images/logo.jpg"

export default function Slider() {
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
    return (
        <React.Fragment>
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
                removeArrowOnDeviceType={["tablet", "mobile"]}
                /*deviceType={this.props.deviceType}*/
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >

                <div><img src={Img1}/></div>
                <div><img src={Img1}/></div>
                <div><img src={Img1}/></div>
            </Carousel>

        </React.Fragment>
    )
}
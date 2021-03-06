import React from "react";
import Toolbar from "../containers/Header/Toolbar/Toolbar";
import BlogSlider from "../components/blog/slider"
import Articles from "../components/blog/articles"

export default function ContactUsPage() {
    return (
        <React.Fragment>
            <Toolbar/>
            <BlogSlider/>
            <Articles/>
        </React.Fragment>
    )
}

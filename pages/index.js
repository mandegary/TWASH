import React from "react";
import Toolbar from "../containers/Header/Toolbar/Toolbar";
import HomePage from "../components/homepage/homepage"
export default function Home() {
  return (
    <React.Fragment>
      <Toolbar/>
      <HomePage/>
    </React.Fragment>
  )
}

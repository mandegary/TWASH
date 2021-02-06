import React from "react";
import Head from 'next/head'

function Header() {
    return (
        <Head>
            <title>TWASH</title>
            <meta charSet="utf-8"/>
            <link rel="manifest" href="/manifest.json"/>
            <link rel="icon" href="/faviconv.ico"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, height=device-height , shrink-to-fit=no"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="theme-color" content="#000000"/>
            <meta name="description" content="ارائه خدمات کارواش در محل"/>
            <meta name="keywords"
                  content="کارواش,کارواش در محل"/>

            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                  integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
                  crossOrigin="anonymous"/>

            <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css' rel='stylesheet'/>
            <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css' rel='stylesheet'/>
                {/*<script type="text/javascript" src="/script.js"></script>*/}
        </Head>
    )
}

export default Header

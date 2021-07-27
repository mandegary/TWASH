import React from "react";
import Head from 'next/head'

function Header() {
    return (
        <Head>
            {/*Google Tag Manager*/}

            <script dangerouslySetInnerHTML={{
                __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TWTK79T');
            `
            }}/>
            <title>TSAPP</title>
            <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
            <meta content="utf-8" http-equiv="encoding"/>
            <link rel="manifest" href="/manifest.json"/>
            <link rel="shortcut icon" href="/images/favicon.ico"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, height=device-height , shrink-to-fit=no"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="theme-color" content="#000000"/>
            <meta name="description" content="ارائه خدمات کارواش در محل"/>
            <meta name="keywords"
                  content="کارواش,کارواش در محل ,تی سپ"/>

            <script type="text/javascript" src="/script.js"></script>
            <script src="dist/notiflix-aio-2.7.0.min.js"></script>

            <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css' rel='stylesheet'/>
            <link href="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css" rel="stylesheet"/>
            <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css' rel='stylesheet'/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                  integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
                  crossOrigin="anonymous"/>

            {/*Google Tag Manager*/}

            <script dangerouslySetInnerHTML={{
                __html: `
             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TWTK79T');

                              `
            }}/>



            {/*BEGIN RAYCHAT CODE*/}
            <script dangerouslySetInnerHTML={{
                __html: `
            !function(){function t(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,localStorage.getItem("rayToken")?t.src="https://app.raychat.io/scripts/js/"+o+"?rid="+localStorage.getItem("rayToken")+"&href="+window.location.href:t.src="https://app.raychat.io/scripts/js/"+o+"?href="+window.location.href;var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}var e=document,a=window,o="0664014e-5ff3-48c2-8100-d64ad64e7eb6";"complete"==e.readyState?t():a.attachEvent?a.attachEvent("onload",t):a.addEventListener("load",t,!1)}();
            `
            }}/>


        </Head>
    )
}

export default Header

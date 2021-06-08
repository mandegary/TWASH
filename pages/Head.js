import React from "react";
import Head from 'next/head'

function Header() {
    return (
        <Head>
            <title>TSAPP</title>
            <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
            <meta content="utf-8" http-equiv="encoding"/>
            <link rel="manifest" href="/manifest.json"/>
            <link rel="shortcut icon" href="/images/favicon.ico" />
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

                  <script dangerouslySetInnerHTML={{ __html:`
                  !function (t, e, n) { t.yektanetAnalyticsObject = n, t[n] = t[n] || function () { t[n].q.push(arguments) }, t[n].q = t[n].q || []; var a = new Date, r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(), c = e.getElementsByTagName("script")[0], s = e.createElement("script"); s.id = "ua-script-iKBIUJRs"; s.dataset.analyticsobject = n; s.async = 1; s.type = "text/javascript"; s.src = "https://cdn.yektanet.com/rg_woebegone/scripts_v3/iKBIUJRs/rg.complete.js?v=" + r, c.parentNode.insertBefore(s, c) }(window, document, "yektanet");
                              `}} />
        </Head>
    )
}

export default Header

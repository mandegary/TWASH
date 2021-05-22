import React, {useState, useEffect} from 'react';
import "./order.css"
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import marker1 from "../../assets/images/mark.png"
import marker from "../../assets/images/location.svg"
import userLocation from "../../assets/images/mylocation.png"
import back from "../../assets/images/back.png"
import {Container, Col, Form, Row} from "react-bootstrap";
import {Button, TextField} from "@material-ui/core";
import {withRouter, NextRouter, useRouter} from 'next/router'
import delBtn from "../../assets/images/del.svg"
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import Notiflix from "notiflix";

mapboxgl.accessToken = 'pk.eyJ1IjoibWFuZGVnYXJ5IiwiYSI6ImNra3V4aHFuZjRkYjkycHF0YnA3eXVpd2kifQ.M1TpZFI8ZVRvjEHgy7uEsw';
const theme = createMuiTheme({
    direction: 'rtl'
});
const HomePageForm = (props) => {
    const router = useRouter()
    const mapRef = React.createRef();
    const [lng, setLng] = useState(51.3379);
    const [lat, setLat] = useState(35.6997);
    const [zoom, setZoom] = useState(14);
    const [showFavoriteLocations, setShowFavoriteLocations] = useState(true);
    const [favoriteLocationsClass, setFavoriteLocationsClass] = useState("favorites close");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [showUserLocation, setShowUserLocation] = useState(false);
    const [orderData, setOrderData] = useState({});
    const [locations, setLocations] = useState("");
    const [description, setDescription] = useState("");
    const [userAddressName, setUserAddressName] = useState("");
    const [userAddress, setUserAddress] = useState(0);

    let url = process.env.url;
    let token;
    if (process.browser)
        token = JSON.parse(localStorage.getItem('accessToken'));
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    useEffect(() => {
        if(!isEmpty(props.mapData)){
            setLng(props.mapData.lng)
            setLat(props.mapData.lat)
            setDescription(props.mapData.description)
            setOrderData(props.mapData)
            setBtnDisabled(false)
        }
        else setOrderData({...orderData, description: ""})
        let map;
        if (mapboxgl.getRTLTextPluginStatus() != "loaded")
            mapboxgl.setRTLTextPlugin(
                'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
                null,
                false // Lazy load the plugin
            );
        //const {lng, lat, zoom} = this.state;
        map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng == 0 || lng == "" ? 59.6151 : lng, lat == 0 || lat == "" ? 36.2882 : lat],
            zoom: zoom,
            trackResize: true
        });
        map.addControl(new mapboxgl.NavigationControl());
        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            language: 'fa-IR',
            country: 'ir',
            mapboxgl: mapboxgl
        });
        map.addControl(geocoder);
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );
        // Create a default Marker and add it to the map.
        /*var marker = new mapboxgl.Marker()
            .setLngLat([lng,lat])
            .addTo(map);*/
        map.resize();
        let mapMarkers = []

        map.on('move', (ev) => {
            mapMarkers.forEach((marker) => marker.remove())
            mapMarkers = []
            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'markerIcon';

            var marker = new mapboxgl.Marker(el)
                .setLngLat([map.getCenter().lng, map.getCenter().lat])
                .addTo(map);
            mapMarkers.push(marker)

            setLat(map.getCenter().lat)
            setLng(map.getCenter().lng)
            //console.log([map.getCenter().lng, map.getCenter().lat])
            //map.off('render')
            const {lng, lat} = map.getCenter();
            /*var mpSource = map.getSource("point");
            if (typeof mpSource != 'undefined') {
                //console.log(2)
                map.getSource('point').setData(
                    {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [map.getCenter().lng, map.getCenter().lat]
                                }
                            }
                        ]
                    }
                );
            }*/
           /* setZoom(map.getZoom().toFixed(2))
            setLat(map.getCenter().lat)
            setLng(map.getCenter().lng)
            if (map.hasImage('markerIcon')) {
                map.removeImage('markerIcon');
            }
            var mpLayer = map.getLayer("point");
            if (typeof mpLayer != 'undefined') {
                map.removeLayer("point");
            }
            var mpSource = map.getSource("point");
            if (typeof mpSource != 'undefined') {
                map.removeSource("point");
            }
            map.loadImage(
                marker,
                function (error, image) {
                    if (error) console.log(error);
                    map.addImage('markerIcon', image);
                    map.addSource('point', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [map.getCenter().lng, map.getCenter().lat]
                                    }
                                }
                            ]
                        }
                    });

                    // map.removeLayer('points');
                    map.addLayer({
                        'id': 'point',
                        'type': 'symbol',
                        'source': 'point',
                        'layout': {
                            'icon-image': 'markerIcon',
                            'icon-size': 1
                        }
                    });
                }
            );*/
        });
        map.on('moveend', (ev) => {
            setLat(map.getCenter().lat)
            setLng(map.getCenter().lng)
            let _url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + [map.getCenter().lng, map.getCenter().lat] + '.json?access_token=pk.eyJ1IjoibWFuZGVnYXJ5IiwiYSI6ImNrOWx0OG82azAwaHUza252em12a3o2NXQifQ.y5-IWYHLAXW5KH5chssYGg';
            fetch(_url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    setDescription(responseJson.features[0].text)
                    //setOrderData({...orderData, description: responseJson.features[0].text})
                    setOrderData({...orderData, lng: map.getCenter().lng, lat: map.getCenter().lat, description: responseJson.features[0].text})

                })

            setBtnDisabled(false)
            /*var mpSource = map.getSource("point");
            if (typeof mpSource != 'undefined') {
                map.getSource('point').setData(
                    {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [map.getCenter().lng, map.getCenter().lat]
                                }
                            }
                        ]
                    }
                );
            }*/


            //console.log(map.getCenter())
            //console.log(ev.lngLat)
            //const {lngCenter, latCenter} = map.getCenter();
            /*if (map.hasImage('markerIcon')) {
                map.removeImage('markerIcon');
            }
            var mpLayer = map.getLayer("point");
            if (typeof mpLayer != 'undefined') {
                map.removeLayer("point");
            }
            var mpSource = map.getSource("point");
            if (typeof mpSource != 'undefined') {
                map.removeSource("point");
            }
            map.loadImage(
                marker,
                function (error, image) {
                    if (error) console.log(error);
                    map.addImage('markerIcon', image);
                    map.addSource('point', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [map.getCenter().lng, map.getCenter().lat]
                                    }
                                }
                            ]
                        }
                    });

                    // map.removeLayer('points');
                    map.addLayer({
                        'id': 'point',
                        'type': 'symbol',
                        'source': 'point',
                        'layout': {
                            'icon-image': 'markerIcon',
                            'icon-size': 1
                        }
                    });
                }
            );*/

        });
        map.on('load', function () {
            map.resize();
            var mpLayer = map.getLayer("point");
            if (typeof mpLayer != 'undefined') {
                map.removeLayer("point");
            }
            if (map.hasImage('markerIcon')) {
                map.removeImage('markerIcon');
            }
            var mpSource = map.getSource("point");
            if (typeof mpSource != 'undefined') {
                map.removeSource("point");
            }


            if(!isEmpty(props.mapData)){
                map.flyTo({
                    center: [
                        props.mapData.lng,
                        props.mapData.lat
                        //51.32054074325396, 35.70663504245073
                    ],
                    zoom: 14,
                    essential: false // this animation is considered essential with respect to prefers-reduced-motion
                });
                map.loadImage(
                    marker,
                    function (error, image) {
                        if (error) throw error;
                        map.addImage('markerIcon', image);
                        map.addSource('point', {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': [
                                    {
                                        'type': 'Feature',
                                        'geometry': {
                                            'type': 'Point',
                                            'coordinates': [props.mapData.lng,
                                                props.mapData.lat]
                                        }
                                    }
                                ]
                            }
                        });

                        // map.removeLayer('points');
                        map.addLayer({
                            'id': 'point',
                            'type': 'symbol',
                            'source': 'point',
                            'layout': {
                                'icon-image': 'markerIcon',
                                'icon-size': 1
                            }
                        });
                    }
                );
                setBtnDisabled(false)
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(position => {
                            setShowUserLocation(true)
                        },
                        function (error) {
                            /*switch(error.code) {
                                case error.PERMISSION_DENIED:
                                    alert("User denied the request for Geolocation.")
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    alert("Location information is unavailable.")
                                    break;
                                case error.TIMEOUT:
                                    alert( "The request to get user location timed out.")
                                    break;
                                case error.UNKNOWN_ERROR:
                                    alert("An unknown error occurred.")
                                    break;
                                default:
                                    alert(error)

                            }*/
                        },{ enableHighAccuracy: true })
                    ;
                }
            }
            else {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(position => {
                            map.flyTo({
                                center: [
                                    position.coords.longitude,
                                    position.coords.latitude
                                    //51.32054074325396, 35.70663504245073
                                ],
                                zoom: 14,
                                essential: false // this animation is considered essential with respect to prefers-reduced-motion
                            });
                            /*var mpLayer = map.getLayer("point");
                            if (typeof mpLayer != 'undefined') {
                                map.removeLayer("point");
                            }
                            if (map.hasImage('markerIcon')) {
                                map.removeImage('markerIcon');
                            }
                            var mpSource = map.getSource("point");
                            if (typeof mpSource != 'undefined') {
                                map.removeSource("point");
                            }

                            map.loadImage(
                                marker,
                                function (error, image) {
                                    //if (error) throw error;
                                    map.addImage('markerIcon', image);
                                    map.addSource('point', {
                                        'type': 'geojson',
                                        'data': {
                                            'type': 'FeatureCollection',
                                            'features': [
                                                {
                                                    'type': 'Feature',
                                                    'geometry': {
                                                        'type': 'Point',
                                                        'coordinates': [position.coords.longitude, position.coords.latitude]
                                                    }
                                                }
                                            ]
                                        }
                                    });

                                    // map.removeLayer('points');
                                    map.addLayer({
                                        'id': 'point',
                                        'type': 'symbol',
                                        'source': 'point',
                                        'layout': {
                                            'icon-image': 'markerIcon',
                                            'icon-size': 1
                                        }
                                    });
                                }
                            );*/
                            setLat(lat == 0 ? position.coords.latitude.toFixed(4) : lat)
                            setLng(lng == 0 ? position.coords.longitude.toFixed(4) : lng)


                            setShowUserLocation(true)

                        },
                        function (error) {
                            /*switch(error.code) {
                                case error.PERMISSION_DENIED:
                                    alert("User denied the request for Geolocation.")
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    alert("Location information is unavailable.")
                                    break;
                                case error.TIMEOUT:
                                    alert( "The request to get user location timed out.")
                                    break;
                                case error.UNKNOWN_ERROR:
                                    alert("An unknown error occurred.")
                                    break;
                                default:
                                    alert(error)

                            }*/
                        },{ enableHighAccuracy: true })
                    ;
                }
                else { /* geolocation IS NOT available, handle it */
                    /*map.loadImage(
                        marker,
                        function (error, image) {
                            //if (error) throw error;
                            map.addImage('markerIcon', image);
                            map.addSource('point', {
                                'type': 'geojson',
                                'data': {
                                    'type': 'FeatureCollection',
                                    'features': [
                                        {
                                            'type': 'Feature',
                                            'geometry': {
                                                'type': 'Point',
                                                'coordinates': [lng, lat]
                                            }
                                        }
                                    ]
                                }
                            });

                            // map.removeLayer('points');
                            map.addLayer({
                                'id': 'point',
                                'type': 'symbol',
                                'source': 'point',
                                'layout': {
                                    'icon-image': 'markerIcon',
                                    'icon-size': 1
                                }
                            });
                        }
                    );*/
            }
        }

        });
        map.on('render', function () {
            //map.resize();
        })
        /*map.on('click', (ev) => {

            const {lng, lat} = ev.lngLat;
            setLat(lat.toFixed(4))
            setLng(lng.toFixed(4))

            setZoom(map.getZoom().toFixed(2))
            if (map.hasImage('markerIcon')) {
                map.removeImage('markerIcon');
            }
            var mpLayer = map.getLayer("point");
            if (typeof mpLayer != 'undefined') {
                map.removeLayer("point");
            }
            var mpSource = map.getSource("point");
            if (typeof mpSource != 'undefined') {
                map.removeSource("point");
            }
            map.loadImage(
                marker,
                function (error, image) {
                    //if (error) throw error;
                    map.addImage('markerIcon', image);
                    map.addSource('point', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [lng, lat]
                                    }
                                }
                            ]
                        }
                    });

                    // map.removeLayer('points');
                    map.addLayer({
                        'id': 'point',
                        'type': 'symbol',
                        'source': 'point',
                        'layout': {
                            'icon-image': 'markerIcon',
                            'icon-size': 1
                        }
                    });
                }
            );
            let _url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + [lng, lat] + '.json?access_token=pk.eyJ1IjoibWFuZGVnYXJ5IiwiYSI6ImNrOWx0OG82azAwaHUza252em12a3o2NXQifQ.y5-IWYHLAXW5KH5chssYGg';
            fetch(_url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    setDescription(responseJson.features[0].text)
                    //setOrderData({...orderData, description: responseJson.features[0].text})
                    setOrderData({...orderData, lng: lng, lat: lat, description: responseJson.features[0].text})

                })

            setBtnDisabled(false)

            //this.props.setLocation(lng, lat);
            map.resize();
        });*/

        window.addEventListener('click', function (e) {
            if (e.target.className != "delete" && (e.target.className == "favoriteLocation" || e.target.parentElement.className == "favoriteLocation")) {
                let lat = e.target.getAttribute("lat");
                let lng = e.target.getAttribute("lng");
                let id = e.target.getAttribute("id");
                let addressName = e.target.getAttribute("name");
                let address = e.target.getAttribute("description");
                //document.getE('fly').addEventListener('click', function () {
                // Fly to a random location by offsetting the point -74.50, 40
                // by up to 5 degrees.
                map.flyTo({
                    center: [
                        lng, lat
                        //51.32054074325396, 35.70663504245073
                    ],
                    zoom: 14,
                    essential: false // this animation is considered essential with respect to prefers-reduced-motion
                });
                /*var mpLayer = map.getLayer("point");
                if (typeof mpLayer != 'undefined') {
                    map.removeLayer("point");
                }
                var mpSource = map.getSource("point");
                if (typeof mpSource != 'undefined') {
                    map.removeSource("point");
                }
                map.loadImage(
                    marker,
                    function (error, image) {
                        //if (error) throw error;
                        map.addImage('markerIcon', image);
                        map.addSource('point', {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': [
                                    {
                                        'type': 'Feature',
                                        'geometry': {
                                            'type': 'Point',
                                            'coordinates': [lng, lat]
                                        }
                                    }
                                ]
                            }
                        });

                        // map.removeLayer('points');
                        map.addLayer({
                            'id': 'point',
                            'type': 'symbol',
                            'source': 'point',
                            'layout': {
                                'icon-image': 'markerIcon',
                                'icon-size': 1
                            }
                        });
                    }
                );*/
                //});
                setLat(lat)
                setLng(lng)
                setUserAddress(id)
                setUserAddressName(addressName);
                setDescription(address)
                setOrderData({...orderData, lng: lng, lat: lat, description: address, userAddress: id})
                setFavoriteLocationsClass("favorites close")
                setShowFavoriteLocations(true)
                setBtnDisabled(false)
            }
            else if(e.target.className == "userLocation")
            {
                if ("geolocation" in navigator) {

                    navigator.geolocation.getCurrentPosition(position => {

                            map.flyTo({
                                center: [
                                    position.coords.longitude,
                                    position.coords.latitude
                                    //51.32054074325396, 35.70663504245073
                                ],
                                zoom: 14,
                                essential: false // this animation is considered essential with respect to prefers-reduced-motion
                            });
                            /*map.loadImage(
                                marker,
                                function (error, image) {
                                    var mpLayer = map.getLayer("point");
                                    if (typeof mpLayer != 'undefined') {
                                        map.removeLayer("point");
                                    }
                                    if (map.hasImage('markerIcon')) {
                                        map.removeImage('markerIcon');
                                    }
                                    var mpSource = map.getSource("point");
                                    if (typeof mpSource != 'undefined') {
                                        map.removeSource("point");
                                    }

                                    map.addImage('markerIcon', image);
                                    map.addSource('point', {
                                        'type': 'geojson',
                                        'data': {
                                            'type': 'FeatureCollection',
                                            'features': [
                                                {
                                                    'type': 'Feature',
                                                    'geometry': {
                                                        'type': 'Point',
                                                        'coordinates': [position.coords.longitude, position.coords.latitude]
                                                    }
                                                }
                                            ]
                                        }
                                    });

                                    // map.removeLayer('points');
                                    map.addLayer({
                                        'id': 'point',
                                        'type': 'symbol',
                                        'source': 'point',
                                        'layout': {
                                            'icon-image': 'markerIcon',
                                            'icon-size': 1
                                        }
                                    });
                                }
                            );*/
                            setLat(position.coords.latitude.toFixed(4))
                            setLng(position.coords.longitude.toFixed(4))
                            setBtnDisabled(false)
                        },
                        function (error) {

                            /*switch(error.code) {
                                case error.PERMISSION_DENIED:
                                    alert("User denied the request for Geolocation.")
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    alert("Location information is unavailable.")
                                    break;
                                case error.TIMEOUT:
                                    alert( "The request to get user location timed out.")
                                    break;
                                case error.UNKNOWN_ERROR:
                                    alert("An unknown error occurred.")
                                    break;
                                default:
                                    alert(error)

                            }*/
                        })
                    ;
                }
            }
        })
        fetchLocations();

    }, [])
    const createLocation = () => {
        if(props.edit)
        {
            props.callback(userAddressName,description,lng,lat,userAddress)
        }
        else props.callback("map", {...orderData, lng: lng, lat: lat, description: description})
        //if(description==""){
            /*let _url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + [lng, lat] + '.json?access_token=pk.eyJ1IjoibWFuZGVnYXJ5IiwiYSI6ImNrOWx0OG82azAwaHUza252em12a3o2NXQifQ.y5-IWYHLAXW5KH5chssYGg';
            fetch(_url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    setDescription(responseJson.features[0].text)
                    //setOrderData({...orderData, description: responseJson.features[0].text})
                    setOrderData({...orderData, lng: lng, lat: lat, description: responseJson.features[0].text})
                    props.callback("map", {...orderData, lng: lng, lat: lat, description: responseJson.features[0].text})
                })*/
        /*}
        else {
            let _description = document.getElementById("filled-basic").value;
            setOrderData({...orderData, lng: lng, lat: lat, description: _description})
            props.callback("map", {...orderData, lng: lng, lat: lat, description: _description})
        }*/

    }
    const prev = () => {
        props.callback("editOrder", props.orderData)
    }
    const descriptionHandler = (e) => {
        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
        }
        //setOrderData({...orderData, description: e.target.value})
        setDescription(e.target.value)
        setBtnDisabled(false)
    }
    const showFavoriteLocationsFunc = () => {
        if (showFavoriteLocations)
            setFavoriteLocationsClass("favorites open")
        else setFavoriteLocationsClass("favorites close")
        setShowFavoriteLocations(!showFavoriteLocations)
    }
    const fetchLocations = () => {
        const abortController = new AbortController()
        const promise = window
            .fetch(url + '/user_address', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'dataType': 'jsonp',   //you may use jsonp for cross origin request
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': "Bearer " + token
                },
                method: 'GET',
                mode: 'cors',
                signal: abortController.signal
            })
            .then(res => res.json())
            .then(responseJson => {

                if (responseJson.message == "آدرس‌ها با موفقیت دریافت شد.") {
                    setLocations(responseJson.user_addresses.map((address, index) =>
                            <li className="favoriteLocation" lat={address.latitude} lng={address.longitude} id={address.id}
                                name={address.name} description={address.description}>
                                <p className="title" lat={address.latitude} lng={address.longitude} id={address.id}
                                   name={address.name} description={address.description}>{address.name}</p>
                                <p className="address" lat={address.latitude} lng={address.longitude} id={address.id}
                                   name={address.name} description={address.description}>{address.description}</p>
                                <img className="delete" src={delBtn} alt="delete"
                                     onClick={() => deleteLocation(address.id)}/>
                            </li>
                        )
                    )
                    setFavoriteLocationsClass("favorites close")
                    setShowFavoriteLocations(true)
                    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixNotifyWrap");
                        myobj.remove();
                    }
                    if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixLoadingWrap");
                        myobj.remove();
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        // Cancel the request if it takes more than delayFetch seconds
        setTimeout(() => abortController.abort(), process.env.delayFetch)
    };
    const deleteLocation = (id) => {
        Notiflix.Loading.Dots();
        const abortController = new AbortController()
        const promise = window
            .fetch(url + '/user_address/' + id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'dataType': 'jsonp',   //you may use jsonp for cross origin request
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': "Bearer " + token
                },
                method: 'DELETE',
                mode: 'cors',
                signal: abortController.signal
            })
            .then(res => res.json())
            .then(responseJson => {
                if (responseJson.message == "با موفقیت حذف شد.") {
                    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixNotifyWrap");
                        myobj.remove();
                    }
                    Notiflix.Notify.Success('آدرس با موفقیت حذف شد.');
                    fetchLocations();
                }
            })
            .catch(err => {
                console.log(err)
            })
        // Cancel the request if it takes more than delayFetch seconds
        setTimeout(() => abortController.abort(), process.env.delayFetch)
    };

    return (
        <MuiThemeProvider theme={theme}>
            <div className="mapForm">
                <Container>
                    {
                        locations != "" ?
                            <React.Fragment>
                                <Row>
                                    <div className="favoriteBtn">
                                        <Button className="" variant="outlined" color="secondary"
                                                onClick={showFavoriteLocationsFunc}>
                                            مکان های منتخب
                                        </Button>
                                    </div>
                                </Row>

                                <div className={favoriteLocationsClass}>
                                    <span onClick={showFavoriteLocationsFunc}>X</span>
                                    <ul>
                                        {locations}
                                    </ul>
                                </div>
                            </React.Fragment>
                            : null
                    }

                    <div className="orderMapDescription" dir="rtl" style={{top: locations != "" ? "80px" : "20px"}}>
                        <TextField id="filled-basic" multiline value={description} onChange={descriptionHandler}
                                   rows={3} label="آدرس دقیق و پلاک (اختیاری):" variant="filled"/>
                    </div>
                    <img title="مکان من" src={userLocation} className="userLocation" style={{display : showUserLocation?"block":"none"}}/>
                    <div style={{display: "none"}}
                         className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                    </div>
                    <div style={{width: "100%", position: "relative", height: "100%", display: "flex"}} id="map"
                         ref={mapRef} className="absolute top right left bottom"/>
                    <Row className="orderBtn orderMapBtn">
                        <Button className="" variant="contained" color="secondary"
                                onClick={createLocation}
                                disabled={btnDisabled}>ثبت محل خودرو</Button>
                    </Row>
                    {
                        !props.edit && <Row className="backBtn">
                            <img src={back} onClick={prev}/>
                            {/*<Button className="" variant="contained" color="secondary"
                                    onClick={prev}>مرحله قبل</Button>*/}
                        </Row>
                    }

                </Container>
            </div>

        </MuiThemeProvider>
    );
}
export default HomePageForm
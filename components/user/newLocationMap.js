import React, {useEffect, useState} from 'react';
import "./profile.css"
import PropTypes from 'prop-types';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import axios from "axios";
import delBtn from "../../assets/images/del.svg";
import Notiflix from "notiflix";
import mapboxgl from "mapbox-gl";
import marker from "../../assets/images/mark.png";
import userLocation from "../../assets/images/mylocation.png";

const theme = createMuiTheme({
    direction: 'rtl',
});
mapboxgl.accessToken = 'pk.eyJ1IjoibWFuZGVnYXJ5IiwiYSI6ImNra3V4aHFuZjRkYjkycHF0YnA3eXVpd2kifQ.M1TpZFI8ZVRvjEHgy7uEsw';

export default function FavoriteLocations(props) {
    const mapRef = React.createRef();
    const [addressName, setAddressName] = useState("");
    const [addressDescription, setAddressDescription] = useState("");
    const [locations, setLocations] = useState("");
    const [zoom, setZoom] = useState(14);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [showModal, setShowModal] = React.useState(false);
    const [addressId, setAddressId] = useState("");
    const [showUserLocation, setShowUserLocation] = useState(false);

    Notiflix.Notify.Init({
        width: '250px',
        useIcon: false,
        fontSize: '14px',
        fontFamily: "IRANSansWeb",
        position: "center-top",
        closeButton: true,
        rtl: true,
        cssAnimationStyle: 'from-top'
    });
    Notiflix.Loading.Init({
        svgColor: process.env.loadingDotsColor
    });

    let url = process.env.url;
    let token;
    if (process.browser)
        token = JSON.parse(localStorage.getItem('accessToken'));
    const addressHandler = (event) =>
    {
        setAddressId(event.target.value)
    }

    useEffect(() => {
        if(props.edit)
        {
            setLocations(props.locations.map((item, index) =>
                <MenuItem key={index} value={item.id}>{item.description}</MenuItem>
            ))
        }
        if (mapboxgl.getRTLTextPluginStatus() != "loaded")
            mapboxgl.setRTLTextPlugin(
                'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
                null,
                false // Lazy load the plugin
            );

        let map;
        //const {lng, lat, zoom} = this.state;
        map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [51.3205, 35.7066],
            zoom: 14,
            trackResize: true
        });

        map.resize();
        map.on('move', (ev) => {
            map.off('render')
            const {lng, lat} = map.getCenter();
            setZoom(map.getZoom().toFixed(2))
        });
        /*map.once('load', () => {
            map.resize();
        });*/
        map.on('load', function () {
            map.resize();

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
                            var mpLayer = map.getLayer("point");
                            if (typeof mpLayer != 'undefined') {
                                map.removeLayer("point");
                            }
                            if (map.hasImage('markerIcon')) {
                                map.removeImage('markerIcon');
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
                            );
                            setLatitude(latitude == 0 ? position.coords.latitude.toFixed(4) : latitude)
                            setLongitude(longitude == 0 ? position.coords.longitude.toFixed(4) : longitude)


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
            }
        });
        map.on('render', function () {
            //map.resize();
        })
        map.on('click', (ev) => {
            const {lng, lat} = ev.lngLat;
            setLatitude(lat.toFixed(4))
            setLongitude(lng.toFixed(4))
            setZoom(map.getZoom().toFixed(2))
            var mpLayer = map.getLayer("point");
            var mpSource = map.getSource("point");
            if (typeof mpLayer != 'undefined') {
                map.removeLayer("point");
            }
            if (map.hasImage('markerIcon')) {
                map.removeImage('markerIcon');
            }
            if (typeof mpSource != 'undefined') {
                map.removeSource("point");
            }

            map.loadImage(
                marker,
                function (error, image) {
                    if (error) alert( error);
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

                    map.resize();

                    let _url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + [lng, lat] + '.json?access_token=pk.eyJ1IjoibWFuZGVnYXJ5IiwiYSI6ImNrOWx0OG82azAwaHUza252em12a3o2NXQifQ.y5-IWYHLAXW5KH5chssYGg';
                    fetch(_url, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                        }
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            setAddressDescription(responseJson.features[0].text)
                            setAddressName(responseJson.features[0].text)
                        })

                    //this.props.setLocation(lng, lat);
                    map.resize();
                });

            window.addEventListener('click', function (e) {
                if (e.target.className == "userLocation") {
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
                                map.loadImage(
                                    marker,
                                    function (error, image) {
                                        var mpLayer = map.getLayer("point");
                                        var mpSource = map.getSource("point");
                                        if (typeof mpLayer != 'undefined') {
                                            map.removeLayer("point");
                                        }
                                        if (map.hasImage('markerIcon')) {
                                            map.removeImage('markerIcon');
                                        }
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
                                );
                                setLatitude(position.coords.latitude.toFixed(4))
                                setLongitude(position.coords.longitude.toFixed(4))
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
            });
        });
    }, [])
    const addressNameHandler = (event) => {
        setAddressName(event.target.value);
        //validate(event.target.value != "" && addressDescription != "" && longitude != 0 && latitude != 0)
    };
    const addressDescriptionHandler = (event) => {
        setAddressDescription(event.target.value);
        //validate(addressName != "" && event.target.value != "" && longitude != 0 && latitude != 0)
    };

    const create = () => {
        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
        }
        if(props.edit && addressId !="")
            props.createLocation(addressName, addressDescription, longitude, latitude , addressId)
        else if (props.edit && addressName != "" && addressDescription != "" && longitude != 0 && latitude != 0)
            props.createLocation(addressName, addressDescription, longitude, latitude, addressId)
        else if (addressName != "" && addressDescription != "" && longitude != 0 && latitude != 0)
            props.createLocation(addressName, addressDescription, longitude, latitude)
        else Notiflix.Notify.Failure('لطفا مشخصات آدرس جدید را به طور کامل وارد کنید!');
    }
    return (
        <MuiThemeProvider theme={theme}>
            <div className="userEditProfile" dir="rtl">
                {
                    props.edit ?
                        <div className="editItems">
                            <FormControl variant="filled">
                                <InputLabel id="demo-simple-select-filled-label">انتخاب از مکان های منتخب</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={addressId}
                                    onChange={addressHandler}
                                    label="مکان های منتخب">
                                    {locations}
                                </Select>
                            </FormControl>
                            <span className="newItemTitle">یا ایجاد آدرس جدید</span>
                        </div>
                        : ""
                }

                <TextField id="outlined-basic" label="عنوان آدرس" variant="filled" value={addressName}
                           onChange={addressNameHandler} className="inputField"/>
                <TextField id="outlined-basic" label="آدرس کامل" variant="filled" multiline rows={4}
                           value={addressDescription}
                           onChange={addressDescriptionHandler} className="inputField"/>
                <div className="mapContainer">
                    <div style={{width: "100%", position: "relative", height: "200px !important", display: "flex"}}
                         id="map"
                         ref={mapRef} className="absolute top right left bottom"/>
                    <img title="مکان من" src={userLocation} className="userLocation" style={{display : showUserLocation?"block":"none"}}/>
                </div>
                <div className="newLocationActions">
                    <Button onClick={props.closeModal} color="primary" variant="fill" className="dialogBtn">
                        لغو
                    </Button>
                    {
                        props.edit ?
                            <Button onClick={create} color="primary" variant="fill" className="dialogBtn">
                                تایید
                            </Button>
                            :
                            <Button onClick={create} color="primary" variant="fill" className="dialogBtn">
                                ایجاد آدرس جدید
                            </Button>
                    }

                </div>
            </div>
        </MuiThemeProvider>

    );
}

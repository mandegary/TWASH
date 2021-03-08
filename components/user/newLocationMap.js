import React, {useEffect, useState} from 'react';
import "./profile.css"
import PropTypes from 'prop-types';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, TextField} from "@material-ui/core";
import axios from "axios";
import delBtn from "../../assets/images/del.svg";
import Notiflix from "notiflix";
import mapboxgl from "mapbox-gl";
import marker from "../../assets/images/mark.png";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import cloudComputing from "../../assets/images/cloud-computing.png";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

const theme = createMuiTheme({
    direction: 'rtl',
});
mapboxgl.accessToken = 'pk.eyJ1IjoibWFuZGVnYXJ5IiwiYSI6ImNrbHh1djFuNDB4dmsydm82bG5kYXhqaTgifQ.xCsvcrN041OMUoQtaiLE-g';

export default function FavoriteLocations(props) {
    const mapRef = React.createRef();
    const [addressName, setAddressName] = useState("");
    const [addressDescription, setAddressDescription] = useState("");
    const [locations, setLocations] = useState("");
    const [zoom, setZoom] = useState(14);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [showModal, setShowModal] = React.useState(false);
    /*const [btnDisabled, setBtnDisabled] = useState(true);*/

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

    useEffect(() => {
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
            //validate(addressName != "" && addressDescription != "" && lng != 0 && lat != 0)
            map.resize();
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
        if(addressName!="" && addressDescription!="" && longitude !=0 && latitude!=0)
            props.createLocation(addressName,addressDescription,longitude,latitude)
        else Notiflix.Notify.Failure('لطفا مشخصات آدرس جدید را به طور کامل وارد کنید!');
    }
    return (
        <MuiThemeProvider theme={theme}>
            <div className="userEditProfile" dir="rtl">
                <TextField id="outlined-basic" label="عنوان آدرس" variant="filled" value={addressName}
                           onChange={addressNameHandler} className="inputField"/>
                <TextField id="outlined-basic" label="آدرس کامل" variant="filled" multiline rows={4}
                           value={addressDescription}
                           onChange={addressDescriptionHandler} className="inputField"/>
                <div className="mapContainer">
                    <div style={{width: "100%", position: "relative", height: "200px !important", display: "flex"}} id="map"
                         ref={mapRef} className="absolute top right left bottom"/>
                </div>
                <div className="newLocationActions">
                    <Button onClick={props.closeModal} color="primary" variant="fill" className="dialogBtn">
                        لغو
                    </Button>
                    <Button onClick={create} color="primary" variant="fill" className="dialogBtn">
                        ایجاد آدرس جدید
                    </Button>
                </div>
            </div>
        </MuiThemeProvider>

    );
}

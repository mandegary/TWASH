//pk.eyJ1IjoibWFuZGVnYXJ5IiwiYSI6ImNrOWx0ZjZwZTA0NTkzZW53NHl2cGI1MnIifQ.90Bm2gcNDY9hu2SjBrS3Bw
import React from 'react';
import mapboxgl from 'mapbox-gl';
//import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
/*import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';*/
import marker from "../../assets/images/mark.png"
import { Container, Col, Form, Row} from "react-bootstrap";
import {Button} from "@material-ui/core";
import { withRouter, NextRouter } from 'next/router'
mapboxgl.accessToken = 'pk.eyJ1IjoibWFuZGVnYXJ5IiwiYSI6ImNrY2gzYXZ0NzB2N3UydHAwcWQxY3ZjNnYifQ.RpdJja3uX4ErssxJP2fKSA';

class OrderMap extends React.Component{
    mapRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            lng:  51.3379 ,//59.6151 51.33791667536528 35.6997736875483
            lat:  35.6997 ,//36.2882
            zoom: 14,
            index: 0,
            btnDisabled:true
            //modalClosed: props.modalClosed
            //setLocation:props.setLocation//(this.state.lng , this.state.lat);
        };

    }
    createLocation(){
        alert(2)
        this.props.router.replace("/orderInfo")
    }
    componentDidMount() {
        let x = true;
        const {lng, lat, zoom} = this.state;
        let map = new mapboxgl.Map({
            container: this.mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng == 0 || lng == "" ? 59.6151 : lng, lat == 0 || lat == "" ? 36.2882 : lat],
            zoom: zoom,
            trackResize: true
        });
        mapboxgl.setRTLTextPlugin(
            'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
            null,
            true // Lazy load the plugin
        );
        /* var geocoder = new MapboxGeocoder({
             accessToken: mapboxgl.accessToken,
             language: 'fa-IR',
             country: 'ir',
             mapboxgl: mapboxgl
         });*/
        /*map.addControl(geocoder);
        // Add geolocate control to the map.
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );*/
        map.resize();
        map.on('move', (ev) => {
            map.off('render')
            const {lng, lat} = map.getCenter();
            this.setState({
                //lng: lng.toFixed(2),
                //lat: lat.toFixed(2),
                zoom: map.getZoom().toFixed(2)
            });
        });
        /*map.once('load', () => {
            map.resize();
        });*/
        map.on('load', function () {
            map.resize();
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
        });
        map.on('render', function () {
            //map.resize();
        })
        map.on('click', (ev) => {
            const {lng, lat} = ev.lngLat;
            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
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
            console.log(lng, lat)

            this.setState({btnDisabled : false})
            //this.props.setLocation(lng, lat);
            map.resize();
        });
        /*if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    lng: lng==0?position.coords.longitude.toFixed(4):lng,
                    lat: lat==0?position.coords.latitude.toFixed(4):lat,
                    //zoom: map.getZoom().toFixed(2)
                });
                //alert(position.coords.longitude)

            },
                function(error) {
                    switch(error.code) {
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
                    }
                })
                ;
        } else { /!* geolocation IS NOT available, handle it *!/ }*/


    }

    render() {
        const {lng, lat, zoom} = this.state;
        return (
            <div className="mapForm">
                <Container>
                    <div style={{display: "none"}}
                         className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                    </div>
                    <div style={{width: "100%",position:"relative",height: "100%",display: "flex"}} id="map" ref={this.mapRef} className="absolute top right left bottom"/>
                    <Row className="orderBtn orderMapBtn">
                        <Button className="" variant="contained" color="secondary" onClick={this.createLocation}
                            disabled={this.state.btnDisabled}>ثبت محل خودرو</Button>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default withRouter(OrderMap)
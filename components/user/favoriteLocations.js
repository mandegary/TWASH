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
import NewLocationForm from "./newLocationMap"

const theme = createMuiTheme({
    direction: 'rtl',
});
mapboxgl.accessToken = 'pk.eyJ1IjoibWFuZGVnYXJ5IiwiYSI6ImNra3V4aHFuZjRkYjkycHF0YnA3eXVpd2kifQ.M1TpZFI8ZVRvjEHgy7uEsw';

export default function FavoriteLocations() {
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
        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
        }
        fetchLocations()
    }, [])

    const addressNameHandler = (event) => {
        setAddressName(event.target.value);
        validate(event.target.value != "" && addressDescription != "" && longitude != 0 && latitude != 0)
    };
    const addressDescriptionHandler = (event) => {
        setAddressDescription(event.target.value);
        validate(addressName != "" && event.target.value != "" && longitude != 0 && latitude != 0)
    };
    const fetchLocations = () => {
        Notiflix.Loading.Dots();
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
                            <li className="favoriteLocation" lat={address.latitude} lng={address.longitude}>
                                <p className="title">{address.name}</p>
                                <p className="address">{address.description}</p>
                                <img className="delete" src={delBtn} alt="delete"
                                     onClick={() => deleteLocation(address.id)}/>
                            </li>
                        )
                    )
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
    const validate = (result) => {
        /*if (result) {
            setBtnDisabled(false)
        }
        else setBtnDisabled(true)*/
    }
    const createLocation = (addressName,addressDescription,longitude,latitude) => {
        setShowModal(false)
        Notiflix.Loading.Dots();
        let data = new FormData()
        data.append('address_longitude', longitude)
        data.append('address_latitude', latitude)
        data.append('address_name', addressName) //orderData.absence
        data.append('address_description', addressDescription)
        axios.post(url + '/user_address', data, {
            headers: {
                'Accept': 'application/json',
                'dataType': 'json',   //you may use jsonp for cross origin request
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': "Bearer " + token
            }
        })
            .then((responseJson) => {
                if (responseJson.data.message == "آدرس با موفقیت ساخته شد.") {
                    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixNotifyWrap");
                        myobj.remove();
                    }
                    Notiflix.Notify.Success('آدرس جدید با موفقیت ایجاد شد.');
                    setAddressName("")
                    setAddressDescription("")
                    fetchLocations();
                } else {
                    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixNotifyWrap");
                        myobj.remove();
                    }
                    Notiflix.Notify.Failure('لطفا دوباره تلاش کنید!');
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
                    Notiflix.Notify.Failure('آدرس با موفقیت حذف شد.');
                    fetchLocations()
                }
            })
            .catch(err => {
                console.log(err)
            })
        // Cancel the request if it takes more than delayFetch seconds
        setTimeout(() => abortController.abort(), process.env.delayFetch)
    };
    const closeModal = () => {
        setShowModal(false);
    }

    const showModalNew = () => {
        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
        }
        setShowModal(true)
        /*if(file!="" && carTag!=""){
            setShowModal(false);
            setToggle(true)
            setShowCarItems("block")
        }
        else if(carTag=="") Notiflix.Notify.Failure('لطفا پلاک ماشین خود را وارد کنید.');
        else if(file=="") Notiflix.Notify.Failure('لطفا تصویر کارت ماشین خود را آپلود کنید.');*/

    };

    return (
        <MuiThemeProvider theme={theme}>
            <div className="favoritesList">
                <ul>
                    {locations}
                </ul>
                <Button className="userProfileBtn" variant="contained" color="secondary" onClick={showModalNew}>ایجاد
                    آدرس جدید</Button>
            </div>
            <Dialog open={showModal} onClose={closeModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/*برای استفاده از خدمات کارواش در غیاب مشتری لطفا پلاک خودرو خود را وارد کرده و کارت ماشین را
                        آپلود نمایید.*/}
                    </DialogContentText>
                    <NewLocationForm createLocation={createLocation} closeModal={closeModal}/>
                </DialogContent>
            </Dialog>


        </MuiThemeProvider>
    );
}

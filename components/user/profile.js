import React, {useContext, useEffect, useState} from 'react';
import "./profile.css"
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Button, TextField} from "@material-ui/core";
import axios from "axios";
import {verifyToken} from "../../components/Helpers";
import Notiflix from "notiflix";
import delBtn from "../../assets/images/del.svg";
import {AuthContext} from "../../context/Auth/authContext";

const theme = createMuiTheme({
    direction: 'rtl',
});
export default function Profile() {
    const [name, setName] = useState("");
    const [family, setFamily] = useState("");
    const [email, setEmail] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false);
    const {dispatch} = useContext(AuthContext);
    Notiflix.Notify.Init({ width:'350px',useIcon:false, fontSize:'14px',fontFamily:"IRANSansWeb", position:"center-top",closeButton:true , rtl: true,cssAnimationStyle: 'from-top' });
    Notiflix.Loading.Init({
        svgColor: process.env.loadingDotsColor
    });
    let url = process.env.url;
    let token = null;
    if (typeof window != "undefined")
        token = JSON.parse(localStorage.getItem('accessToken'));
    useEffect(() => {
        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
        }
        fetchUser();
    },[])
    const fetchUser = () => {
        Notiflix.Loading.Dots();
        const abortController = new AbortController()
        const promise = window
            .fetch(url + '/auth/me', {
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
                if (responseJson.message == "کاربر با موفقیت دریافت شد.") {
                    setName(responseJson.user.name=="null" ? "" : responseJson.user.name )
                    setEmail(responseJson.user.email=="null" ? "" : responseJson.user.email)
                    setFamily(responseJson.user.last_name =="null" ? "" : responseJson.user.last_name)
                    setBtnDisabled(false)
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
    }
    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameHandler = (event) => {
        setName(event.target.value);
        //validate(event.target.value != "" && family !="" && (email == "" || emailPattern.test(email)));
    };
    const familyHandler = (event) => {
        setFamily(event.target.value);
        //validate(event.target.value != "" && name!="" && (email == "" || emailPattern.test(email)));
    };
    const emailHandler = (event) => {
        setEmail(event.target.value);
        //validate(name != "" && family!="" && (event.target.value == "" || emailPattern.test(event.target.value)));
    };
    const validate = (result) => {
        if (result) {
            setBtnDisabled(false)
        } else setBtnDisabled(true)
    }
    const updateUser = () => {
        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
        }
        Notiflix.Loading.Dots();
        let data = new FormData()
        data.append('name', name)
        data.append('last_name', family)
        data.append('email', email)
        axios.post(url + '/auth/update', data, {
            headers: {
                'Accept': 'application/json',
                'dataType': 'json',   //you may use jsonp for cross origin request
                'Access-Control-Allow-Origin': '*',
                'Authorization': "Bearer " + token
            }
        })
            .then((responseJson) => {
                if (verifyToken(responseJson.data)) {
                    dispatch({
                        type: 'user', payload:
                            {
                                fName: responseJson.data.user.name,
                                lName: responseJson.data.user.last_name
                            }
                    });
                    if (document.getElementById("NotiflixLoadingWrap") != undefined)
                    {
                        var myobj = document.getElementById("NotiflixLoadingWrap");
                        myobj.remove();
                    }
                    Notiflix.Notify.Success("مشخصات کاربر با موفقیت به روزرسانی شد.");

                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <MuiThemeProvider theme={theme}>
            <div className="userEditProfile" dir="rtl">
                <TextField id="outlined-basic" label="نام" variant="filled" value={name}
                           onChange={nameHandler} className="inputField"/>
                <TextField id="outlined-basic" label="نام خانوادگی" variant="filled" value={family}
                           onChange={familyHandler} className="inputField"/>
                <TextField id="outlined-basic" label="ایمیل" variant="filled" value={email}
                           onChange={emailHandler} className="inputField"/>
                <Button className="userProfileBtn" variant="contained" color="secondary"
                        onClick={updateUser} disabled={btnDisabled}>ویرایش</Button>
            </div>
        </MuiThemeProvider>
    );
}

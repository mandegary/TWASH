import React, {useContext} from "react";
import {AuthContext} from "../context/Auth/authContext";

export function fetchWithTimeout(url, options, delay, onTimeout, onSuccessFetch, onCatch) {
    const timer = new Promise((resolve) => {
        setTimeout(resolve, delay, {
            timeout: true,
        });
    });
    return Promise.race([
        fetch(url, options),
        timer
    ]).then(response => {
        if (response.timeout) {
            onTimeout();
        } else {
            return response.json();
        }
    }).then((responseJson) => {
        if (responseJson != undefined) {
            onSuccessFetch(responseJson)
        }
    }).catch((error) => {
        onCatch();
    });
}

export function verifyToken(responseJson) {
    if (responseJson.message != undefined) {
        if (responseJson.message == "Unauthenticated.") {
            localStorage.removeItem('user');
            localStorage.removeItem('balance');
            localStorage.removeItem('accessToken');
            window.location.href = "/";
            return false;
        } else return true;
    }
    else return true;
}

export function VerifyToken() {
    localStorage.removeItem('user');
    localStorage.removeItem('balance');
    localStorage.removeItem('accessToken');
    window.location.href = "/";
    return false;
}



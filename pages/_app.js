import React from "react";
import '../public/css/globals.css'
import '../public/fonts.css'
import Head from "./Head";
import {create} from 'jss';
import rtl from 'jss-rtl';
import {StylesProvider, jssPreset} from '@material-ui/core/styles';
import AuthContextProvider from '../context/Auth/authContext';
// Configure JSS
const jss = create({plugins: [...jssPreset().plugins, rtl()]});

function MyApp({Component, pageProps}) {
    return <StylesProvider jss={jss}>
        <AuthContextProvider>
            <Head/>
            {typeof window !== 'undefined' && (<Component {...pageProps} />)}
        </AuthContextProvider>
    </StylesProvider>
}

export default MyApp

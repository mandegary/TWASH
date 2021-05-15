import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Toolbar from "../containers/Header/Toolbar/Toolbar";
import Order from "../components/order/order"
import Map from "../components/order/mapp"
import OrderInfo from "../components/order/orderInfo"
import axios from "axios";
import Notiflix from "notiflix";
import {route} from "next/dist/next-server/server/router";
import {VerifyToken} from "../components/Helpers"
export default function CreateOrder() {
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [showOrder, setShowOrder] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [showOrderInfo, setShowOrderInfo] = useState(false);
    const [orderData, setOrderData] = useState({});
    const [mapData, setMapData] = useState({});
    const [orderInfo, setOrderInfo] = useState({});

    let url = process.env.url;
    let token;
    if (process.browser)
        token = JSON.parse(localStorage.getItem('accessToken'));
    useEffect(() => {
        if (token != null)
            setShow(true)
        else router.push('/')
    }, []);
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
    const createOrder = (orderInfos) => {
        Notiflix.Loading.Dots();
        let data = new FormData()
        data.append('car_model_id', orderData.carModel)
        if(orderData.selectedCar>0) data.append('user_car_id', orderData.selectedCar)
        if(orderData.carTag!=undefined) data.append('car_plaque', orderData.carTag)
        if(orderData.cardImg!=undefined) data.append('car_card_image', orderData.cardImg)
        data.append('absence', orderData.absence)
        data.append('services', JSON.stringify(orderData.services))
        data.append('reserve_day', orderData.date)
        data.append('reserve_time', orderData.time)
        data.append('address_longitude', mapData.lng)
        data.append('address_latitude', mapData.lat)
        data.append('address_name', "")
        if(mapData.description!=undefined) data.append('address_description', mapData.description)
        if(mapData.userAddress!=undefined && mapData.userAddress!=0) data.append('user_address_id', mapData.userAddress)
        if(mapData.description!=undefined) data.append('description', orderInfos.orderDescription)
        data.append('payment_method', orderInfos.PaymentType)

        axios.post(url + '/order', data, {
            headers: {
                'Accept': 'application/json',
                'dataType': 'json',   //you may use jsonp for cross origin request
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': "Bearer " + token
            }
        })
            .then((responseJson) => {
                    if (responseJson.data.message == "درخواست با موفقیت ثبت شد.") {
                        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                            var myobj = document.getElementById("NotiflixNotifyWrap");
                            myobj.remove();
                        }
                        if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                            var myobj = document.getElementById("NotiflixLoadingWrap");
                            myobj.remove();
                        }

                        if (responseJson.data.payment_data != null) {
                            Notiflix.Notify.Success('به درگاه پرداخت منتقل می شوید...');
                            router.push(responseJson.data.payment_data.original.action)
                        }
                        else{
                            Notiflix.Notify.Success('درخواست با موفقیت ثبت شد.');
                            router.push("/payment/cash")
                        }

                    }
            })
            .catch((error) => {
                if(error.message=="Request failed with status code 401")
                    VerifyToken();
            })
    }

    const toggleForms = (form, Data) => {
        switch (form) {
            case "order" :
                setShowOrder(false)
                setShowMap(true)
                setShowOrderInfo(false)
                setOrderData(Data)
                console.log(Data)
                break;
            case "map" :
                if (document.getElementById("NotiflixLoadingWrap") != undefined) {
                    var myobj = document.getElementById("NotiflixLoadingWrap");
                    myobj.remove();
                }
                setShowOrder(false)
                setShowMap(false)
                setShowOrderInfo(true)
                setMapData(Data)
                console.log(Data)
                /*if(Data.description!="" && Data.description!=undefined && Data.description!=null)
                {
                    setShowOrder(false)
                    setShowMap(false)
                    setShowOrderInfo(true)
                    setMapData(Data)
                }
                else Notiflix.Notify.Failure('لطفا آدرس خود را وارد کنید.');*/
                break;
            case "orderInfo" :
                setOrderInfo(Data)
                createOrder(Data);
                break;
            case "editOrder" :
                setOrderInfo(Data)
                setShowOrder(true)
                setShowMap(false)
                setShowOrderInfo(false)
                break;
            default:
                setShowOrder(true)
                setShowMap(false)
                setShowOrderInfo(false)
        }
    }
    return (
        show && <React.Fragment>
            <Toolbar/>
            {showOrder && <Order show={showOrder} callback={toggleForms} orderData={orderData} mapData={mapData}/>}
            {showMap && <Map show={showMap} callback={toggleForms} orderData={orderData} mapData={mapData}/>}
            {showOrderInfo && <OrderInfo show={showOrderInfo} callback={toggleForms} orderData={orderData} mapData={mapData} orderInfo={orderInfo}/>}
        </React.Fragment>
    )
}

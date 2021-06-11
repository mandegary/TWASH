import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Notiflix from "notiflix";
import {route} from "next/dist/next-server/server/router";
import Toolbar from "../../containers/Header/Toolbar/Toolbar";
import Order from "../../components/order/order"
import Map from "../../components/order/mapp"
import OrderInfo from "../../components/order/orderInfo"
import {VerifyToken} from "../../components/Helpers"
import delBtn from "../../assets/images/del.svg";

export default function CreateOrder() {
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showOrderInfo, setShowOrderInfo] = useState(false);
    const [orderData, setOrderData] = useState({});
    const [mapData, setMapData] = useState({});
    const [orderInfo, setOrderInfo] = useState({});

    let url = process.env.url;
    let token;
    if (process.browser)
        token = JSON.parse(localStorage.getItem('accessToken'));
    let link, code;
    useEffect(() => {
        if (token != null)
            setShow(true)
        else router.push('/')
        link = window.location.href.split('/');
        if (link[link.length - 2] == "order") {
            code = link[link.length - 1];
            fetchOrder(code)
        }
    }, []);
    let timesHolder = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "24:00", "00:30", "01:00", "01:30", "02:00"
    ];
    const fetchOrder = (id) => {
        Notiflix.Loading.Dots();
        const abortController = new AbortController()
        const promise = window
            .fetch(url + '/order/' + id, {
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
                if (responseJson.message == "سفارش با موفقیت دریافت شد") {
                    let services=[]
                    for(let item in responseJson.order.items){
                        if(responseJson.order.items[item].carwash_service_id=="1")
                        {
                            services.push(1)
                        }
                        else if(responseJson.order.items[item].carwash_service_id=="2")
                        {
                            services.push(2)
                        }
                        else if(responseJson.order.items[item].carwash_service_id=="3")
                        {
                            services.push(1)
                            services.push(2)
                        }
                        else if(responseJson.order.items[item].carwash_service_id=="4")
                        {
                            services.push(4)
                        }
                        else if(responseJson.order.items[item].carwash_service_id=="5")
                        {
                            services.push(5)
                        }
                    }

                    let _orderData = {
                        services: services,
                        //servicesTitle: servicesTitle,
                        absence: responseJson.order.absence,
                        time: [responseJson.order.human_reserved_time.toString().slice(0, 2), ":", responseJson.order.human_reserved_time.toString().slice(2)].join(''),
                        endTime: timesHolder[timesHolder.indexOf([responseJson.order.human_reserved_time.toString().slice(0, 2), ":", responseJson.order.human_reserved_time.toString().slice(2)].join('')) + 4],
                        price: responseJson.order.total,
                        carModel: responseJson.order.user_car != undefined ? responseJson.order.user_car.model != undefined ? responseJson.order.user_car.model.id : responseJson.order.user_car.car_model_id : 0,
                        modelTitle: responseJson.order.user_car != undefined ?responseJson.order.user_car.model != undefined ?responseJson.order.user_car.model.name : "": "",
                        carBrand: responseJson.order.user_car != undefined ? responseJson.order.user_car.model != undefined ?responseJson.order.user_car.model.brand_id : 0: 0,
                        brandTitle: responseJson.order.user_car != undefined ? responseJson.order.user_car.model != undefined ?responseJson.order.user_car.model.brand.name :"":"",
                        selectedCar: responseJson.order.user_car_id,
                        selectedCarTitle:responseJson.order.user_car.model.name,
                        date: responseJson.order.reserved_day,
                        carTag: responseJson.order.user_car != undefined ? responseJson.order.user_car.plaque : "",
                        cardFile:responseJson.order.user_car != undefined ? responseJson.order.user_car.card_image : ""

                    }
                    let _mapData = {
                        description: responseJson.order.user_address.description,
                        lat: responseJson.order.user_address.latitude,
                        lng: responseJson.order.user_address.longitude,
                        userAddress: responseJson.order.user_address.id
                    }
                    let _orderInfo = {
                        orderDescription: responseJson.order.description,
                        PaymentType: responseJson.order.payment.payment_method,
                    }

                    setOrderData(_orderData);
                    setMapData(_mapData)
                    setOrderInfo(_orderInfo)
                    setShowOrder(true)
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
        if (orderData.user_cars) data.append('user_cars', orderData.user_cars)
        if (orderData.carTag != undefined) data.append('car_plaque', orderData.carTag)
        if (orderData.cardImg != undefined) data.append('car_card_image', orderData.cardImg)
        data.append('absence', orderData.absence)
        data.append('services', JSON.stringify(orderData.services))
        data.append('reserve_day', orderData.date / 1000)
        data.append('reserve_time', orderData.time)
        data.append('address_longitude', mapData.lng)
        data.append('address_latitude', mapData.lat)
        data.append('address_name', "")
        if (mapData.description != undefined) data.append('address_description', mapData.description)
        if (mapData.userAddress != undefined && mapData.userAddress != 0) data.append('user_address_id', mapData.userAddress)
        if (mapData.description != undefined) data.append('description', orderInfos.orderDescription)
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
                    } else {
                        Notiflix.Notify.Success('درخواست با موفقیت ثبت شد.');
                        router.push("/payment/cash")
                    }

                }
            })
            .catch((error) => {
                if (error.message == "Request failed with status code 401")
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
            {showOrderInfo &&
            <OrderInfo show={showOrderInfo} callback={toggleForms} orderData={orderData} mapData={mapData}
                       orderInfo={orderInfo}/>}
        </React.Fragment>
    )
}

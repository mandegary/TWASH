import React, {useState, useEffect} from "react";
import "./order.css"
import {
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Modal
} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Col, Container, Row} from "react-bootstrap";
import DatePicker from 'react-datepicker2';
import momentJalaali from "moment-jalaali";
import {useRouter} from "next/router";
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import down from "../../assets/images/down.png";
import cloudComputing from "../../assets/images/cloud-computing.png";
import {addCommas} from "persian-tools2";
import Notiflix from "notiflix";

const theme = createMuiTheme({
    direction: 'rtl'
});

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Order = (props) => {
    const router = useRouter()
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [errorMessage, setErrorMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [carBrandTitle, setCarBrandTitle] = useState("");
    const [carModelTitle, setCarModelTitle] = useState("");
    const [carBrands, setCarBrands] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [carBrand, setCarBrand] = useState(0);
    const [carModel, setCarModel] = useState(0);
    const [selectedCar, setSelectedCar] = useState(0);
    const [selectedCarTitle, setSelectedCarTitle] = useState("");
    const [selectedCarModelTitle, setSelectedCarModelTitle] = useState("");
    const [selectedCarBrandTitle, setSelectedCarBrandTitle] = useState("");
    const [selectedCarIsSelected, setSelectedCarIsSelected] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [time, setTime] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [date, setDate] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [times, setTimes] = useState([]);
    const [carTag, setCarTag] = useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [orderData, setOrderData] = useState([]);
    const [services, setServices] = useState([]);
    const [servicesTitle, setServicesTitle] = useState([]);
    const [price, setPrice] = useState("...");
    const [cars, setCars] = useState([]);
    const [carsHolder, setCarsHolder] = useState([]);
    const [rooShoyi, setRooShoyi] = useState(false);
    const [rooShoyiClass, setRooShoyiClass] = useState("false");
    const [rooShoyiTooShooyi, setRooShoyiTooShooyi] = useState(false);
    const [rooShoyiTooShooyiClass, setRooShoyiTooShooyiClass] = useState("false");
    const [tooShooyi, setTooShooyi] = useState(false);
    const [tooShooyiClass, setTooShooyiClass] = useState("false");
    const [dashboardWax, setDashboardWax] = useState(false);
    const [dashboardWaxClass, setDashboardWaxClass] = useState("false");
    const [lastikWax, setLastikWax] = useState(false);
    const [lastikWaxClass, setLastikWaxClass] = useState("false");
    const [file, setFile] = useState("");
    const [loadingPrice, setLoadingPrice] = useState(false);
    const [showFile, setshowFile] = useState("");
    const [showCarItems, setShowCarItems] = useState(false);
    const [editCar, setEditCar] = useState(false);
    const [isTooOrRooSelected, setIsTooOrRooSelected] = useState(false);
    const [num0, setNum0] = useState("");
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [num3, setNum3] = useState("");
    const [num4, setNum4] = useState("");
    const [num5, setNum5] = useState("");
    const [num6, setNum6] = useState("");
    const [num7, setNum7] = useState("");
    const [enabledRange, setEnabledRange] = useState({
        min: momentJalaali().add(-1, 'days'),
        max: momentJalaali().add(14, 'days')
    });
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
    const [state, setState] = useState({
        rooShoyi: rooShoyi,
        tooShooyi: tooShooyi,
        rooShoyiTooShooyi: rooShoyiTooShooyi,
        lastikWax: lastikWax,
        dashboardWax: dashboardWax
    })
    var KEY_CODE = {
        backspace: 8,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };
    const numHandler = (event) => {
        let id = parseInt(event.target.id);
        /*if(((event.keyCode<47&&event.keyCode>58)||(event.keyCode<95&&event.keyCode>106)))
            event.preventDefault();
        else*/
        if (!event.target.validity.valid) {
            return;
        } else if (event.keyCode === KEY_CODE.backspace) {
            switch (id) {
                case 0:
                    setNum0("")
                    break;
                case 1:
                    setNum1("")
                    break;
                case 2:
                    setNum2("")
                    break;
                case 3:
                    setNum3("")
                    break;
                case 4:
                    setNum4("")
                    break;
                case 5:
                    setNum5("")
                    break;
                case 6:
                    setNum6("")
                    break;
                case 7:
                    setNum7("")
                    break;

            }
            if (document.getElementById((id - 1).toString()) != null)
                document.getElementById((id - 1).toString()).focus();
            else document.getElementById((id).toString()).focus();
        } else if (event.keyCode === KEY_CODE.left) {
            if (document.getElementById((id - 1).toString()) != null)
                document.getElementById((id - 1).toString()).focus();
            else document.getElementById((id).toString()).focus();
        } else if (event.keyCode === KEY_CODE.right) {
            if (document.getElementById((id + 1).toString()) != null)
                document.getElementById((id + 1).toString()).focus();
            else document.getElementById((id).toString()).focus();
        } else if (event.keyCode === KEY_CODE.up || event.keyCode === KEY_CODE.down) {
            //event.preventDefault();
        } else if (event.target.value != "") {
            switch (id) {
                case 0:
                    setNum0(event.target.value)
                    break;
                case 1:
                    setNum1(event.target.value)
                    break;
                case 2:
                    setNum2(event.target.value)
                    break;
                case 3:
                    setNum3(event.target.value)
                    break;
                case 4:
                    setNum4(event.target.value)
                    break;
                case 5:
                    setNum5(event.target.value)
                    break;
                case 6:
                    setNum6(event.target.value)
                    break;
                case 7:
                    setNum7(event.target.value)
                    setCarTag(num0 + num1 + num2 + num3 + num4 + num5 + num6 + event.target.value);
                    //alert(num0 + num1 + num2 + num3 + num4 + num5 + num6 + event.target.value)
                    setOrderData({
                        ...orderData,
                        carTag: num0 + num1 + num2 + num3 + num4 + num5 + num6 + event.target.value
                    })
                    break;

            }
            //n[id]=event.target.value
            if (document.getElementById((id + 1).toString()) != null)
                document.getElementById((id + 1).toString()).focus();
            else document.getElementById((id).toString()).focus();
        }
    };
    /*let enabledRange = {
        min: momentJalaali().add(-1, 'days'),
        max: momentJalaali().add(14, 'days')
    };*/
    let timesHolder = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00",
        "20:00", "21:00", "22:00", "23:00", "24:00"
    ];
    const timesHandler = (newDate) => {
        let today = new Date();
        let currentH = (today.getHours() + 1).toString()
        if (currentH.length == 1) currentH = "0" + currentH
        let currentM = today.getMinutes().toString()
        if (currentM.length == 1) currentM = "0" + currentM
        let current = currentH + ":" + currentM;
        if (momentJalaali(today).jDate() == momentJalaali(newDate).jDate()
            && momentJalaali(today).jMonth() == momentJalaali(newDate).jMonth()
            && momentJalaali(today).jYear() == momentJalaali(newDate).jYear())
            setTimes(timesHolder.map((time, index) =>
                current < time ?
                    <MenuItem key={index} value={time}>{time}</MenuItem> :
                    null
            ))
        else
            setTimes(timesHolder.map((time, index) =>
                <MenuItem key={index} value={time}>{time}</MenuItem>
            ))
        /*if(today.getHours()==23)
        {
            setEnabledRange({...enabledRange,min:momentJalaali().add(1, 'days')})
        }*/
        setTime("")
        setTimeEnd("")
    }
    useEffect(() => {

        fetchCarModels("")
        fetchCars()
        const abortController = new AbortController()
        const promise = window
            .fetch(url + '/cars/brands', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'dataType': 'jsonp',   //you may use jsonp for cross origin request
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'GET',
                mode: 'cors',
                signal: abortController.signal
            })
            .then(res => res.json())
            .then(responseJson => {
                if (responseJson.message == "برند‌ها با موفقیت دریافت شد.") {
                    setCarBrands(responseJson.brands)
                    if (!isEmpty(props.orderData)) {
                        if (props.orderData.selectedCar > 0) {
                            setCarBrand(0)
                            setCarModel(0)
                            setCarBrandTitle("")
                            setCarModelTitle("")
                            setOrderData({
                                ...orderData,
                                selectedCar: props.orderData.selectedCar,
                                carModel: 0,
                                modelTitle: "",
                                carBrand: 0,
                                brandTitle: ""
                            })
                            setSelectedCarIsSelected(true)
                        } else {
                            setCarBrandTitle(props.orderData.brandTitle)
                            setCarBrand(props.orderData.carBrand)
                            setOrderData({
                                ...orderData,
                                carBrand: props.orderData.carBrand,
                                brandTitle: props.orderData.brandTitle
                            })
                        }
                        validate(true)
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        // Cancel the request if it takes more than delayFetch seconds
        setTimeout(() => abortController.abort(), process.env.delayFetch)

        if (!isEmpty(props.orderData)) {
            setOrderData(props.orderData)
            if (props.orderData.services.includes(1)) {
                setRooShoyi(true)
                setRooShoyiClass("true")
            }
            if (props.orderData.services.includes(2)) {
                setTooShooyi(true)
                setTooShooyiClass("true")
            }
            if (props.orderData.services.includes(4)) {
                setLastikWax(true)
                setLastikWaxClass("true")
            }
            if (props.orderData.services.includes(5)) {
                setDashboardWax(true)
                setDashboardWaxClass("true")
            }
            setServicesTitle(props.orderData.servicesTitle)
            setServices(props.orderData.services);
            setState({
                ...state,
                rooShoyi: props.orderData.services.includes(1) ? true : false,
                tooShooyi: props.orderData.services.includes(2) ? true : false,
                dashboardWax: props.orderData.services.includes(4) ? true : false,
                lastikWax: props.orderData.services.includes(5) ? true : false
            })
            //calculatePrice(props.orderData.services, props.orderData.carModel)

            setDate(momentJalaali(props.orderData.date), 'jYYYY/jM/jD')
            setOrderData({...orderData, date: props.orderData.date});
            setTimes(timesHolder.map((time, index) =>
                <MenuItem key={index} value={time}>{time}</MenuItem>
            ))
            validate(true)
            setTime(props.orderData.time)
            setTimeEnd(props.orderData.endTime)
            calculatePrice(props.orderData.services, props.orderData.carModel)
            setPrice(props.orderData.price)
            setToggle(props.orderData.absence)
            if (props.orderData.carTag != undefined) {
                let tag = props.orderData.carTag.split("");
                setCarTag(props.orderData.carTag)
                setNum0(tag[0])
                setNum1(tag[1])
                setNum2(props.orderData.carTag[2])
                setNum3(props.orderData.carTag[3])
                setNum4(props.orderData.carTag[4])
                setNum5(props.orderData.carTag[5])
                setNum6(props.orderData.carTag[6])
                setNum7(props.orderData.carTag[7])

            }
            if (props.orderData.cardImg != undefined) {
                setFile(props.orderData.cardFile)
            }

            if (props.orderData.absence && props.orderData.carTag != undefined && props.orderData.cardImg != undefined) {
                setShowCarItems(true)
                setTooShooyi(false)
                setTooShooyiClass("false disabled")
                setDashboardWax(false)
                setDashboardWaxClass("false disabled")
            }
        } else {
            let t = momentJalaali().add(0, 'days')
            setDate(t, 'jYYYY/jM/jD')
            if (document.getElementsByClassName("datepicker-input")[0] != undefined)
                document.getElementsByClassName("datepicker-input")[0].setAttribute("readonly", "readonly");
            timesHandler(t);
        }
    }, [])

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    let token = null;
    let ordersCount = 0
    if (typeof window != "undefined") {
        token = JSON.parse(localStorage.getItem('accessToken'));
        ordersCount = JSON.parse(localStorage.getItem('orders'));
    }
    const fetchCars = () => {
        const abortController = new AbortController()
        const promise = window
            .fetch(url + '/user_car', {
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
                if (responseJson.message == "ماشین‌ها با موفقیت دریافت شد.") {
                    setCarsHolder(responseJson.user_cars)
                    let x = [];
                    responseJson.user_cars.map((car, index) =>
                        car.name != "" ? x.push({title: car.model.name, id: car.id}) : null
                    )
                    setCars(x)
                    if (!isEmpty(props.orderData)) {

                        if (props.orderData.selectedCar > 0) {
                            setSelectedCar(props.orderData.selectedCar)
                            setCarModel(props.orderData.selectedCar)
                            for (let i = 0; i < responseJson.user_cars.length; i++)
                                if (responseJson.user_cars[i].id == props.orderData.selectedCar) {
                                    setSelectedCarTitle(responseJson.user_cars[i].model.name)
                                    setSelectedCarIsSelected(true)
                                    if (props.orderData.carTag == undefined) {
                                        setCarTag(responseJson.user_cars[i].plaque)
                                        setNum0(responseJson.user_cars[i].plaque[0])
                                        setNum1(responseJson.user_cars[i].plaque[1])
                                        setNum2(responseJson.user_cars[i].plaque[2])
                                        setNum3(responseJson.user_cars[i].plaque[3])
                                        setNum4(responseJson.user_cars[i].plaque[4])
                                        setNum5(responseJson.user_cars[i].plaque[5])
                                        setNum6(responseJson.user_cars[i].plaque[6])
                                        setNum7(responseJson.user_cars[i].plaque[7])
                                    }
                                    if (props.orderData.cardImg == undefined) setFile(responseJson.user_cars[i].card_image)
                                    setShowCarItems(true)
                                    setCarBrandTitle(responseJson.user_cars[i].model.brand.name);
                                    setCarModelTitle(responseJson.user_cars[i].model.name);
                                    setSelectedCarBrandTitle(responseJson.user_cars[i].model.brand.name)
                                    setSelectedCarModelTitle(responseJson.user_cars[i].model.name);
                                }
                            validate(true)
                        }
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
        if (result) {
            setBtnDisabled(false)
        } else setBtnDisabled(true)
    }
    const fetchCarModels = (id) => {
        let q = "";
        if (id == "")
            q = ""
        else q = '?brand_id=' + id
        const abortController = new AbortController()
        const promise = window
            .fetch(url + '/cars/models' + q, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'dataType': 'jsonp',   //you may use jsonp for cross origin request
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'GET',
                mode: 'cors',
                signal: abortController.signal
            })
            .then(res => res.json())
            .then(responseJson => {
                if (responseJson.message == "مدل‌ها با موفقیت دریافت شد.") {
                    setCarModels(responseJson.models)
                    if (!isEmpty(props.orderData)) {
                        if (props.orderData.selectedCar > 0) {
                            setCarBrand(0)
                            setCarModel(props.orderData.selectedCar)
                            setCarBrandTitle("")
                            setCarModelTitle("")
                            setOrderData({
                                ...orderData,
                                selectedCar: props.orderData.selectedCar,
                                carModel: 0,
                                modelTitle: "",
                                carBrand: 0,
                                brandTitle: ""
                            })
                            setSelectedCarIsSelected(true)
                        } else {
                            setCarModel(props.orderData.carModel)
                            setCarModelTitle(props.orderData.modelTitle)
                            setOrderData({
                                ...orderData,
                                selectedCar: 0,
                                carModel: props.orderData.carModel,
                                modelTitle: props.orderData.modelTitle,
                                carBrand: props.orderData.carBrand,
                                brandTitle: props.orderData.brandTitle
                            })
                        }


                        validate(true)
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        // Cancel the request if it takes more than delayFetch seconds
        setTimeout(() => abortController.abort(), process.env.delayFetch)
    }
    const reset = () => {
        setServicesTitle([])
        setServices([])
        setPrice("...")
        setShowCarItems(false)
        setFile("")
        setCarTag("")
        setShowCarItems(false)
        setToggle(false)
        setRooShoyi(false)
        setRooShoyiClass("false")
        setTooShooyi(false)
        setTooShooyiClass("false")
        setRooShoyiTooShooyi(false)
        setRooShoyiTooShooyiClass("false")
        setDashboardWax(false)
        setDashboardWaxClass("false")
        setLastikWax(false)
        setLastikWaxClass("false")
        setOrderData({...orderData, absence: 0})
        setState({
            ...state,
            rooShoyi: false,
            tooShooyi: false,
            rooShoyiTooShooyi: false,
            dashboardWax: false,
            lastikWax: false
        })
        /*resetToggleState()*/
        setNum0("")
        setNum1("")
        setNum2("")
        setNum3("")
        setNum4("")
        setNum5("")
        setNum6("")
        setNum7("")
    }
    const carBrandHandler = (e, value) => {
        if (value == null) {
            setFile("")
            setCarTag("")
            setCarModel(0)
            setCarModelTitle("")
            setCarBrand(0)
            setCarBrandTitle("")
            fetchCarModels("")
            reset();
        } else {
            let cBrand = 0
            for (let i = 0; i < carBrands.length; i++) {
                if (carBrands[i].name == value) {
                    cBrand = carBrands[i].id
                    setCarBrandTitle(carBrands[i].name)
                    fetchCarModels(cBrand)
                    setCarBrand(cBrand)
                    setCarModelTitle("")
                    setCarModel(0);
                    setOrderData({...orderData, carBrand: cBrand, brandTitle: carBrands[i].name})
                    /*if (services.length > 0)
                        calculatePrice(services)*/
                    let result = ((cBrand != 0 && carModel != 0) || selectedCar != 0) && date != "" && time != "" && services.length > 0 && isTooOrRooSelected;
                    validate(result);

                }
            }
        }

    }
    const carModelHandler = (e, value) => {
        let cModel = 0
        let cTitle = "";
        let cBrand = 0;
        let cBrandTitle = "";
        if (value == null) {
            setFile("")
            setCarTag("")
            setCarModel(0)
            setCarModelTitle("")
            /*setCarBrand(0)
            setCarBrandTitle("")*/
            reset();
        } else {
            for (let i = 0; i < carModels.length; i++) {
                if (carModels[i].name == value) {
                    cModel = carModels[i].id;
                    setCarModelTitle(carModels[i].name)
                    setCarModel(cModel);
                    cTitle = carModels[i].name;
                    cBrand = carModels[i].brand_id;
                    setCarBrand(carModels[i].brand_id)
                    for (let j = 0; j < carBrands.length; j++)
                        if (carModels[i].brand_id == carBrands[j].id) {
                            setCarBrandTitle(carBrands[j].name)
                            cBrandTitle = carBrands[j].name
                        }
                    //setOrderData({...orderData, carModel: cModel, modelTitle: carModels[i].name})
                    if (services.length > 0)
                        calculatePrice(services, cModel)
                }
            }
        }
        if (cBrandTitle == "")
            setOrderData({...orderData, selectedCar: 0, carModel: cModel, modelTitle: cTitle})
        else setOrderData({
            ...orderData,
            selectedCar: 0,
            carModel: cModel,
            modelTitle: cTitle,
            carBrand: cBrand,
            brandTitle: cBrandTitle
        })
        let result = ((carBrand != 0 && cModel != 0) || selectedCar != 0) && date != "" && time != "" && services.length > 0 && isTooOrRooSelected;
        validate(result);
    }
    const selectedCarHandler = (e, value) => {
        let cSelected = 0;
        let cSelectedTitle = "";
        let cPlaque = "";
        let cFile = "";
        let cModel = ""
        setFile("")
        setCarTag("")
        setSelectedCar(0)
        setSelectedCarTitle("")
        if (value == null) {
            setFile("")
            setCarTag("")
            setSelectedCar(0)
            reset();
        } else {
            for (let i = 0; i < carsHolder.length; i++) {
                if (value != null && carsHolder[i].model.name == value) {
                    cSelected = carsHolder[i].id;
                    cPlaque = carsHolder[i].plaque;
                    cModel = carsHolder[i].car_model_id;
                    cFile = carsHolder[i].card_image
                    setFile(carsHolder[i].card_image)
                    setSelectedCarTitle(carsHolder[i].model.name)
                    setSelectedCarBrandTitle(carsHolder[i].model["brand"].name)
                    setSelectedCarModelTitle(carsHolder[i].model.name);
                    setCarTag(cPlaque)
                    if (cPlaque != "" && cPlaque != null) {
                        setNum0(cPlaque[0])
                        setNum1(cPlaque[1])
                        setNum2(cPlaque[2])
                        setNum3(cPlaque[3])
                        setNum4(cPlaque[4])
                        setNum5(cPlaque[5])
                        setNum6(cPlaque[6])
                        setNum7(cPlaque[7])
                    }
                else {
                        setNum0("")
                        setNum1("")
                        setNum2("")
                        setNum3("")
                        setNum4("")
                        setNum5("")
                        setNum6("")
                        setNum7("")
                    }

                    if (toggle && cPlaque != "" && cPlaque != null && cFile != "" && cFile != null)
                        setShowCarItems(true)
                    else if (cPlaque != "" && cPlaque != null && cFile != "" && cFile != null)
                        setShowCarItems(true)
                    else if (toggle)  {
                        setShowCarItems(false)
                        setShowModal(true)
                    }
                    else {
                        setShowCarItems(false)
                    }
                    setOrderData({...orderData, selectedCar: 0, carModel: cModel})
                    if (services.length > 0)
                        calculatePrice(services, cModel)
                }

            }
        }
        if (cSelected != 0) {
            setCarBrand(0)
            setCarModel(0)
            setCarBrandTitle("")
            setCarModelTitle("")
            setSelectedCarIsSelected(true)
        } else setSelectedCarIsSelected(false)
        setSelectedCar(cSelected)
        setCarModel(cModel)
        setOrderData({...orderData, selectedCar: cSelected, carModel: cModel})
        let result = ((carBrand != 0 && carModel != 0) || cSelected != 0) && date != "" && time != "" && services.length > 0 && isTooOrRooSelected;
        validate(result);
    }
    const toggleState = (e) => {
        setServices([])
        setServicesTitle([])
        setPrice("...")
        if (e.target.value == "بله") {
            setToggle(true)
            setRooShoyi(false)
            setRooShoyiClass("false")
            setTooShooyi(false)
            setTooShooyiClass("false disabled")
            setRooShoyiTooShooyi(false)
            setRooShoyiTooShooyiClass("false disabled")
            setDashboardWax(false)
            setDashboardWaxClass("false disabled")
            setLastikWax(false)
            setLastikWaxClass("false")
            setOrderData({...orderData, absence: 1})
            setState({
                ...state,
                rooShoyi: false,
                tooShooyi: false,
                rooShoyiTooShooyi: false,
                dashboardWax: false,
                lastikWax: false
            })
            //if(selectedCar==0)
            setShowModal(true)
        } else if (e.target.value == "خیر") {
            setShowCarItems(false)
            setToggle(false)
            setRooShoyi(false)
            setRooShoyiClass("false")
            setTooShooyi(false)
            setTooShooyiClass("false")
            setRooShoyiTooShooyi(false)
            setRooShoyiTooShooyiClass("false")
            setDashboardWax(false)
            setDashboardWaxClass("false")
            setLastikWax(false)
            setLastikWaxClass("false")
            setOrderData({...orderData, absence: 0})
            setState({
                ...state,
                rooShoyi: false,
                tooShooyi: false,
                rooShoyiTooShooyi: false,
                dashboardWax: false,
                lastikWax: false
            })
        }
    }
    const resetToggleState = (value) => {
        setServices([])
        setServicesTitle([])
        setPrice("...")

        setShowCarItems(false)
        setToggle(false)
        setRooShoyi(false)
        setRooShoyiClass("false")
        setTooShooyi(false)
        setTooShooyiClass("false")
        setRooShoyiTooShooyi(false)
        setRooShoyiTooShooyiClass("false")
        setDashboardWax(false)
        setDashboardWaxClass("false")
        setLastikWax(false)
        setLastikWaxClass("false")
        setOrderData({...orderData, absence: 0})
        setState({
            ...state,
            rooShoyi: false,
            tooShooyi: false,
            rooShoyiTooShooyi: false,
            dashboardWax: false,
            lastikWax: false
        })

    }
    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }
    const servicesHandler = (event) => {
        let _services = {...state, [event.target.name]: event.target.checked}
        let _selectedServices = [];
        let _selectedServicesTitle = []
        let _rooShoyi, _tooShooyi, _rooShoyiTooShooyi, _lastikWax, _dashboardWax;
        if (_services["rooShoyi"]) {
            setRooShoyi(true)
            setRooShoyiClass("true")
            _selectedServices.push(1)
            _selectedServicesTitle.push("روشویی")
            _rooShoyi = true
            _rooShoyiTooShooyi = false
            setRooShoyiTooShooyi(false)
            if (toggle)
                setRooShoyiTooShooyiClass("false disabled")
            else setRooShoyiTooShooyiClass("false")
        } else {
            removeItemOnce(_selectedServices, 1)
            removeItemOnce(_selectedServicesTitle, "روشویی")
            setRooShoyi(false)
            setRooShoyiClass("false")
            setRooShoyiTooShooyi(false)
            if (toggle)
                setRooShoyiTooShooyiClass("false disabled")
            else {
                setRooShoyiTooShooyiClass("false")
            }
            _rooShoyi = false
        }
        if (_services["tooShooyi"]) {
            setTooShooyi(true)
            setTooShooyiClass("true")
            _selectedServices.push(2)
            _selectedServicesTitle.push("توشویی")
            _tooShooyi = true
            _rooShoyiTooShooyi = false
            setRooShoyiTooShooyi(false)
            setRooShoyiTooShooyiClass("false disabled")
        } else {
            removeItemOnce(_selectedServices, 2)
            removeItemOnce(_selectedServicesTitle, "توشویی")
            if (!toggle) {
                setTooShooyi(false)
                setTooShooyiClass("false")
                setRooShoyiTooShooyi(false)
                if (toggle)
                    setRooShoyiTooShooyiClass("false disabled")
                else setRooShoyiTooShooyiClass("false")
                _tooShooyi = false
            } else {
                setTooShooyi(false)
                setTooShooyiClass("false disabled")
                setRooShoyiTooShooyi(false)
                if (toggle)
                    setRooShoyiTooShooyiClass("false disabled")
                else setRooShoyiTooShooyiClass("false")
                _tooShooyi = false
            }

        }
        if (_services["rooShoyiTooShooyi"]) {
            _selectedServices.push(3)
            _selectedServicesTitle.push("روشویی-توشویی")
            setRooShoyiTooShooyi(true)
            setRooShoyiTooShooyiClass("true")
            setRooShoyi(false)
            setRooShoyiClass("false disabled")
            setTooShooyi(false)
            setTooShooyiClass("false disabled")
            _rooShoyiTooShooyi = true
            _rooShoyi = false
            _tooShooyi = false
            removeItemOnce(_selectedServices, 1)
            removeItemOnce(_selectedServices, 2)
            removeItemOnce(_selectedServicesTitle, "روشویی")
            removeItemOnce(_selectedServicesTitle, "توشویی")
        } else {
            setRooShoyiTooShooyi(false)
            if (_services["rooShoyi"] || _services["tooShooyi"])
                setRooShoyiTooShooyiClass("false disabled")
            else if (toggle)
                setRooShoyiTooShooyiClass("false disabled")
            else setRooShoyiTooShooyiClass("false")
            if (!_services["rooShoyi"]) {
                setRooShoyi(false)
                if (toggle)
                    setRooShoyiClass("false")
                _rooShoyi = false
                removeItemOnce(_selectedServices, 1)
                removeItemOnce(_selectedServicesTitle, "روشویی")
            }
            if (!_services["tooShooyi"]) {
                if (toggle)
                    setTooShooyiClass("false disabled")
                else
                    setTooShooyiClass("false")
                setTooShooyi(false)
                _tooShooyi = false
                removeItemOnce(_selectedServices, 2)
                removeItemOnce(_selectedServicesTitle, "توشویی")
            }
            removeItemOnce(_selectedServices, 3)
            removeItemOnce(_selectedServicesTitle, "روشویی-توشویی")
            _rooShoyiTooShooyi = false
        }
        if (_services["lastikWax"]) {
            setLastikWax(true)
            setLastikWaxClass("true")
            _selectedServices.push(4)
            _selectedServicesTitle.push("واکس لاستیک")
            _lastikWax = true;
        } else {
            removeItemOnce(_selectedServices, 4)
            removeItemOnce(_selectedServicesTitle, "واکس لاستیک")
            setLastikWax(false)
            setLastikWaxClass("false")
            _lastikWax = false
        }
        if (_services["dashboardWax"]) {
            setDashboardWax(true)
            setDashboardWaxClass("true")
            _selectedServices.push(5)
            _selectedServicesTitle.push("واکس داشبورد")
            _dashboardWax = true
        } else {
            removeItemOnce(_selectedServices, 5)
            removeItemOnce(_selectedServicesTitle, "واکس داشبورد")
            setDashboardWax(false)
            if (toggle)
                setDashboardWaxClass("false disabled")
            else setDashboardWaxClass("false")
            _dashboardWax = false
        }
        setServicesTitle(_selectedServicesTitle)
        setServices(_selectedServices);
        setOrderData({...orderData, services: _selectedServices, servicesTitle: _selectedServicesTitle})
        setState({
            ...state,
            rooShoyi: _rooShoyi,
            tooShooyi: _tooShooyi,
            rooShoyiTooShooyi: _rooShoyiTooShooyi,
            dashboardWax: _dashboardWax,
            lastikWax: _lastikWax
        })
        calculatePrice(_selectedServices, carModel)
        setIsTooOrRooSelected(_rooShoyi || _tooShooyi)
        let result = ((carBrand != 0 && carModel != 0) || selectedCar != 0) && date != "" && time != "" && (_selectedServices.length > 0 && (_rooShoyi || _tooShooyi));
        validate(result);
    };
    const timeHandler = (event) => {
        setTime(event.target.value);
        let index = timesHolder.indexOf(event.target.value);
        switch (event.target.value) {
            case "23:00":
                setTimeEnd("01:00")
                break;
            case "24:00":
                setTimeEnd("02:00")
                break;
            default:
                setTimeEnd(timesHolder[index + 2])

        }
        setOrderData({...orderData, time: event.target.value, endTime: timesHolder[index + 1], absence: toggle ? 1 : 0})
        let result = ((carBrand != 0 && carModel != 0) || selectedCar != 0) && date != "" && event.target.value != "" && services.length > 0 && isTooOrRooSelected;
        validate(result);
    }
    function getTimeStamp(input) {
        var parts = input.trim().split(' ');
        var date = parts[0].split('-');
        var time = (parts[1] ? parts[1] : '00:00:00').split(':');

        // NOTE:: Month: 0 = January - 11 = December.
        var d = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        return d.getTime() / 1000;
    }
    const dateHandler = (value) => {
        let _d = value.format('YYYY-M-D HH:mm:ss')
        let _timestamp = getTimeStamp(_d)
        //var date = new Date(timestamp*1000);

        setDate(value);
        if (isEmpty(props.orderData))
            timesHandler(value)
        setTimestamp(_timestamp * 1000)
        setOrderData({...orderData, date: _timestamp * 1000})
        let result = ((carBrand != 0 && carModel != 0) || selectedCar != 0) && value != "" && time != "" && services.length > 0 && isTooOrRooSelected;
        validate(result);
    }
    const createOrder = () => {
        let _orderData = {
            ...orderData,
            services: services,
            servicesTitle: servicesTitle,
            absence: toggle ? 1 : 0,
            time: time,
            endTime: timeEnd,
            price: price,
            carModel: carModel,
            modelTitle: selectedCar > 0 ? selectedCarModelTitle : carModelTitle,
            carBrand: carBrand,
            brandTitle: selectedCar > 0 ? selectedCarBrandTitle : carBrandTitle,
            selectedCar: selectedCar,
            date: isEmpty(props.orderData) ? timestamp : props.orderData.date == timestamp ? props.orderData.date : timestamp
        }

        props.callback("order", _orderData)
    }
    const showModalEdit = () => {
        setShowModal(true);
        setShowCarItems(false)
        setEditCar(true)
    };
    const closeModal = () => {
        setShowModal(false);
        setToggle(false)
        setRooShoyi(false)
        setRooShoyiClass("false")
        setTooShooyi(false)
        setTooShooyiClass("false")
        setRooShoyiTooShooyi(false)
        setRooShoyiTooShooyiClass("false")
        setDashboardWax(false)
        setDashboardWaxClass("false")
        setLastikWax(false)
        setLastikWaxClass("false")
        setOrderData({...orderData, absence: 0})
        setState({
            ...state,
            rooShoyi: false,
            tooShooyi: false,
            rooShoyiTooShooyi: false,
            dashboardWax: false,
            lastikWax: false
        })
        setShowCarItems(false)
        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
        }
    };
    const carTagHandler = (e) => {
        setCarTag(e.target.value);
        //setOrderData({...orderData, carTag: e.target.value})
    };
    const subscribeModal = () => {
        /*setRooShoyi(false)
        setServices([])
        setServicesTitle([])
        setRooShoyiClass("false")
        setPrice("...")
        setState({
            ...state,
            rooShoyi: false,
            tooShooyi: false,
            rooShoyiTooShooyi: false,
            dashboardWax: false,
            lastikWax: false
        })*/

        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
        }
        if (file != "" && carTag != "" && file != null && carTag != null) {
            setShowModal(false);
            if (!setEditCar) setToggle(true)
            setShowCarItems(true)
            setEditCar(false)
        } else if (carTag == "" || carTag == null) Notiflix.Notify.Failure('لطفا پلاک ماشین خود را وارد کنید.');
        else if (file == "" || file == null) Notiflix.Notify.Failure('لطفا تصویر کارت ماشین خود را آپلود کنید.');

    };

    const calculatePrice = (selectedServices, model) => {
        setPrice("...")
        //setBtnDisabled(true)
        if ((model != 0) && selectedServices.length > 0) {
            setLoadingPrice(true)
            let data = new FormData()
            data.append('model_id', model)
            data.append('services', JSON.stringify(selectedServices))

            axios.post(url + '/prices/guess', data, {
                headers: {
                    'Accept': 'application/json',
                    'dataType': 'json',   //you may use jsonp for cross origin request
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': "Bearer " + token
                }
            })
                .then((responseJson) => {
                    if (responseJson.data.message == "هزینه‌ها با موفقیت دریافت شد.") {
                        setPrice(responseJson.data.prices.price)
                        setOrderData({...orderData, price: responseJson.data.prices.price})
                        setLoadingPrice(false)
                        /*let result = ((carBrand != 0 && carModel != 0) || selectedCar != 0) && date != "" && time != "" && services.length > 0 && isTooOrRooSelected;
                        validate(result);*/
                        /*alert(result)*/
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };
    const imageHandler = async (event) => {
        //fileObj1.push(event.target.files)
        let _name = event.target.files[0].name;
        let _lastModified = event.target.files[0].lastModified;
        setFile(URL.createObjectURL(event.target.files[0]));
        let _file = new File([event.target.files[0]], _name, {type: "image/jpeg"});
        //setFile(_file)
        setOrderData({...orderData, cardImg: _file, cardFile: URL.createObjectURL(event.target.files[0])})
    }

    return (
        <MuiThemeProvider theme={theme}>
            <div className="orderForm" dir="rtl">
                <Container>
                    <Row className="orderRow car">
                        <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                            <label className="formLabel">انتخاب خودرو</label>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                            <FormControl variant="filled" disabled={selectedCarIsSelected}>
                                <Autocomplete
                                    id="tags-filled"
                                    value={carBrandTitle}
                                    disabled={selectedCarIsSelected}
                                    options={carBrands.map((option) => option.name)}
                                    noOptionsText="موردی یافت نشد"
                                    onChange={carBrandHandler}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            label="برند خودرو را انتخاب کنید"
                                            placeholder="برای جستجو تایپ کنید..."
                                        />
                                    )}
                                />
                            </FormControl>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                            <FormControl variant="filled" disabled={selectedCarIsSelected}>
                                <Autocomplete
                                    id="tags-filled"
                                    value={carModelTitle}
                                    disabled={selectedCarIsSelected}
                                    options={carModels.map((option) => option.name)}
                                    noOptionsText="موردی یافت نشد"
                                    onChange={carModelHandler}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            label="مدل خودرو را انتخاب کنید"
                                            placeholder="برای جستجو تایپ کنید..."
                                        />
                                    )}
                                />
                            </FormControl>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={12} xs={12} className="selectedCar">
                            {cars.length > 0 &&
                            <FormControl variant="filled">
                                <Autocomplete
                                    id="tags-filled"
                                    value={selectedCarTitle}
                                    options={cars.map((option) => option.title)}
                                    noOptionsText="موردی یافت نشد"
                                    onChange={selectedCarHandler}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            label="خودروهای منتخب"
                                            placeholder="برای جستجو تایپ کنید..."
                                        />
                                    )}
                                />
                                {/*<Autocomplete
                                    id="tags-filled"
                                    value={selectedCarTitle}
                                    options={cars.map((option) => option.name)}
                                    noOptionsText="موردی یافت نشد."
                                    renderOption={(option, {selected}) => (
                                        <React.Fragment>
                                            {option.title}
                                        </React.Fragment>
                                    )}
                                    noOptionsText="موردی یافت نشد"
                                    onChange={selectedCarHandler}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            label="خوروهای منتخب"
                                            placeholder="برای جستجو تایپ کنید..."
                                        />
                                    )}
                                />*/}

                            </FormControl>}
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={12} xs={12}>
                        </Col>
                    </Row>
                    <Row className="orderRow" style={{border: "none"}}>
                        <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                            <label className="formLabel">انتخاب خدمات</label>
                        </Col>
                        <Col xl={4} lg={4} md={10} sm={12} xs={12}>
                            {
                                ordersCount > 0 ?
                                    <form className="switch-field">
                                        <input
                                            type="radio"
                                            name="switchToggle"
                                            value="خیر"
                                            id="switch_right"
                                            onChange={toggleState}
                                            checked={!toggle}
                                        />
                                        <label htmlFor="switch_right" className="switch_right">خیر</label>
                                        <input
                                            type="radio"
                                            name="switchToggle"
                                            value="بله"
                                            id="switch_left"
                                            onChange={toggleState}
                                            checked={toggle}
                                        />
                                        <label htmlFor="switch_left" className="switch_left">بله</label>
                                        <label className="switchTile">در غیاب مشتری</label>
                                    </form>
                                    : null
                            }
                        </Col>
                        {
                            showCarItems ?
                                <Col xl={6} lg={6} md={10} sm={12} xs={12} className="carItems">
                                    <img src={file} className="carImg"/>
                                    {
                                        carTag != "" && carTag != null ? <span>پلاک ماشین : {carTag}</span>
                                            : null
                                    }
                                    <button onClick={showModalEdit}>ویرایش مدارک خودرو</button>
                                </Col>
                                :
                                /*toggle && selectedCar != 0
                                || toggle && carModel != 0 ?
                                    <button onClick={showModalEdit}>آپلود مدارک خودرو</button>
                                    :*/
                                null
                        }

                    </Row>
                    <Row className="orderRow" style={{paddingTop: "0", margin: "0 20px"}}>
                        <Col xl={9} lg={9} md={12} sm={12} xs={12}>
                            <FormControl className="checkServices" component="fieldset">
                                <div className="form-check">
                                    <label className={rooShoyiClass}>
                                        <input type="checkbox" name="rooShoyi" value={rooShoyi} checked={rooShoyi}
                                               disabled={rooShoyiTooShooyi}
                                               onChange={servicesHandler} className="form-check-input"/>روشویی
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className={tooShooyiClass}>
                                        <input type="checkbox" name="tooShooyi" value={tooShooyi} checked={tooShooyi}
                                               disabled={rooShoyiTooShooyi || toggle}
                                               onChange={servicesHandler} className="form-check-input"/>توشویی
                                    </label>
                                </div>
                                {/*<div className="form-check form-check-25">
                                    <label className={rooShoyiTooShooyiClass}>
                                        <input type="checkbox" name="rooShoyiTooShooyi" value={rooShoyiTooShooyi} checked={rooShoyiTooShooyi}
                                               disabled={rooShoyi || tooShooyi || toggle}
                                               onChange={servicesHandler} className="form-check-input"/>روشویی-توشویی
                                    </label>
                                </div>*/}
                                <div className="form-check form-check-25">
                                    <label className={lastikWaxClass}>
                                        <input type="checkbox" name="lastikWax" value={lastikWax} checked={lastikWax}
                                               onChange={servicesHandler} className="form-check-input"/>واکس
                                        لاستیک
                                    </label>
                                </div>
                                <div className="form-check form-check-25">
                                    <label className={dashboardWaxClass}>
                                        <input type="checkbox" name="dashboardWax" value={dashboardWax}
                                               checked={dashboardWax}
                                               disabled={toggle}
                                               onChange={servicesHandler} className="form-check-input"/>واکس
                                        داشبورد
                                    </label>
                                </div>
                            </FormControl>
                        </Col>
                        <Col xl={3} lg={3} md={12} sm={12} xs={12}>
                            {
                                loadingPrice ?
                                    <div className="loader"></div>
                                    :
                                    <label className="servicesPrice">هزینه خدمات : {addCommas(price)} تومان</label>
                            }

                        </Col>
                    </Row>
                    <Row className="orderRow timeSelect" style={{border: "none"}}>
                        <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                            <label className="formLabel">انتخاب زمان</label>
                        </Col>
                        <Col xl={3} lg={3} md={3} sm={12} xs={12} className="form-item">
                            <div>
                                <img src={down} className="down"/>
                            </div>
                            <div>
                                <DatePicker
                                    label="تاریخ کارواش"
                                    placeholder="تاریخ کارواش"
                                    isGregorian={false}
                                    timePicker={false}
                                    min={enabledRange.min}
                                    max={enabledRange.max}
                                    value={date}
                                    showTodayButton={false}
                                    inputFormat="YYYY-M-D"
                                    onChange={dateHandler}
                                />
                            </div>

                        </Col>

                        <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                            <FormControl variant="filled">
                                <InputLabel id="demo-simple-select-filled-label">ساعت شروع</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={time}
                                    onChange={timeHandler}
                                    label="ساعت شروع">
                                    {times}
                                </Select>
                            </FormControl>
                        </Col>
                        <Col xl={4} lg={10} md={12} sm={12} xs={12}>
                            {
                                time != "" && timeEnd != "" &&
                                <label className="servicesTime">خودرو شما در بازه زمانی {time} تا {timeEnd} شسته خواهد
                                    شد.</label>
                            }

                        </Col>
                    </Row>
                    <Row className="orderBtn">
                        <Button className="" variant="contained" color="secondary"
                                onClick={() => createOrder()}
                                disabled={btnDisabled}>
                            مرحله بعد (انتخاب محل شست و شو)
                        </Button>
                    </Row>
                </Container>
            </div>
            {/*<Modal
                open={showModal}
                onClose={closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>*/}
            <Dialog open={showModal} onClose={closeModal} aria-labelledby="form-dialog-title" className="absenseDialog">
                <DialogTitle id="form-dialog-title">ارسال مدارک</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        لطفا برای استفاده از خدمات درغیاب مشتری به نکات زیر توجه داشته باشید:
                        <br/>
                        - محل پارک کردن ماشین باید به گونه ای باشد که
                        دسترسی به همه نقاط ماشین امکان پذیر باشد (کنار دیوار یا چسبیده به جدول
                        و ... نباشد، نقاطی که دست کارواشمن نرسد شسته نخواهد شد.)
                        <br/>
                        - هم چنین داخل شیشه ها دستمال کشیده نخواهد شد.
                        <br/>
                        برای حفظ امنیت در استفاده از خدمات کارواش در غیاب مشتری لطفا پلاک خودرو خود را وارد کرده و کارت
                        ماشین را
                        آپلود نمایید.
                    </DialogContentText>
                    <MuiThemeProvider theme={theme}>
                        <div dir="rtl">
                            <div className="carPlate orderPlate">
                                <input type="tel" inputMode="number" maxLength={1} value={num0} id="0"
                                       onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                                <input type="tel" inputMode="number" maxLength={1} value={num1} id="1"
                                       onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                                <select value={num2} id="2" onChange={numHandler} onKeyDown={numHandler}>
                                    <option value="ا"> الف</option>
                                    <option value="ب"> ب</option>
                                    <option value="پ"> پ</option>
                                    <option value="ت"> ت</option>
                                    <option value="ث"> ث</option>
                                    <option value="ج"> ج</option>
                                    {/*<option value="�"> �</option>*/}
                                    <option value="ح"> ح</option>
                                    <option value="خ"> خ</option>
                                    <option value="د"> د</option>
                                    <option value="ذ"> ذ</option>
                                    <option value="ر"> ر</option>
                                    <option value="ز"> ز</option>
                                    <option value="س"> س</option>
                                    <option value="ش"> ش</option>
                                    <option value="ص"> ص</option>
                                    <option value="ض"> ض</option>
                                    <option value="ط"> ط</option>
                                    <option value="ظ"> ظ</option>
                                    <option value="ع"> ع</option>
                                    <option value="غ"> غ</option>
                                    <option value="ف"> ف</option>
                                    <option value="ق"> ق</option>
                                    <option value="ک"> ک</option>
                                    <option value="گ"> گ</option>
                                    <option value="ل"> ل</option>
                                    <option value="م"> م</option>
                                    <option value="ن"> ن</option>
                                    <option value="و"> و</option>
                                    <option value="هـ"> هـ</option>
                                    <option value="ی"> ی</option>
                                    <option value="D"> D</option>
                                    <option value="S"> S</option>
                                </select>
                                <input type="tel" inputMode="number" maxLength={1} value={num3} id="3"
                                       onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                                <input type="tel" inputMode="number" maxLength={1} value={num4} id="4"
                                       onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                                <input type="tel" inputMode="number" maxLength={1} value={num5} id="5"
                                       onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                                <input type="tel" inputMode="number" maxLength={1} value={num6} id="6"
                                       onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                                <input type="tel" inputMode="number" maxLength={1} value={num7} id="7"
                                       onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                            </div>
                            {/*<TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="پلاک خودرو"
                                type="text"
                                value={carTag}
                                onChange={carTagHandler}
                                variant="filled"
                                fullWidth
                            />*/}
                            <div className="uploadInput">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="inputfile"
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    onClick={(e) => e.target.value = ''}//به خاطر مشکل آپلود در کروم
                                    onChange={imageHandler}
                                />
                                <span className="inputFileLabel">
                        <img src={cloudComputing}/>
                        <label htmlFor="file">آپلود تصویر کارت ماشین
                        </label>
                    </span>
                                <img src={file} className="carImg"/>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary" variant="fill" className="dialogBtn">
                        لغو
                    </Button>
                    <Button onClick={subscribeModal} color="primary" variant="fill" className="dialogBtn">
                        تایید
                    </Button>
                </DialogActions>
            </Dialog>
        </MuiThemeProvider>
    );
}
export default Order
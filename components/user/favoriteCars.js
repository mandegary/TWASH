import React, {useEffect, useState} from 'react';
import "./profile.css"
import PropTypes from 'prop-types';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, FormControl, TextField} from "@material-ui/core";
import axios from "axios";
import delBtn from "../../assets/images/del.svg";
import Autocomplete from "@material-ui/lab/Autocomplete";
import cloudComputing from "../../assets/images/cloud-computing.png";
import Notiflix from "notiflix";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {Col, Container, Row} from "react-bootstrap";

const theme = createMuiTheme({
    direction: 'rtl',
});
export default function FavoriteCars() {
    const [carBrandTitle, setCarBrandTitle] = useState("");
    const [carModelTitle, setCarModelTitle] = useState("");
    const [plaque, setPlaque] = useState("");
    const [carBrands, setCarBrands] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [carBrand, setCarBrand] = useState(0);
    const [carModel, setCarModel] = useState(0);
    const [cars, setCars] = useState("");
    const [file, setFile] = useState("");
    const [showFile, setshowFile] = useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [num, setNum] = useState([]);
    const [num0, setNum0] = useState("");
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [num3, setNum3] = useState("");
    const [num4, setNum4] = useState("");
    const [num5, setNum5] = useState("");
    const [num6, setNum6] = useState("");
    const [num7, setNum7] = useState("");

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
                }
            })
            .catch(err => {
                console.log(err)
            })
        // Cancel the request if it takes more than delayFetch seconds
        setTimeout(() => abortController.abort(), process.env.delayFetch)

    }, []);
    const fetchCarModels = (id) => {
        setCarModels([])
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
                }
            })
            .catch(err => {
                console.log(err)
            })
        // Cancel the request if it takes more than delayFetch seconds
        setTimeout(() => abortController.abort(), process.env.delayFetch)
    }
    const ENTER_KEY = 13;
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
                    break;

            }
            //n[id]=event.target.value
            if (document.getElementById((id + 1).toString()) != null)
                document.getElementById((id + 1).toString()).focus();
            else document.getElementById((id).toString()).focus();
        }

    };

    const handleKeyDown = (e) => {
        if (e.keyCode === Backspace_KEY) {
            let id = parseInt(e.target.id);
            let n = num
            n[id] = ""
            console.log(n)
            setNum(n)
            if (document.getElementById((id - 1).toString()) != null)
                document.getElementById((id - 1).toString()).focus();
            else document.getElementById((id).toString()).focus();
        }
    }
    const plaqueHandler = (event) => {
        setPlaque(event.target.value);
    };
    const addressDescriptionHandler = (event) => {
        setAddressDescription(event.target.value);
    };
    const fetchCars = () => {
        Notiflix.Loading.Dots();
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
                    setCars(responseJson.user_cars.map((car, index) =>
                            <li className="favoriteLocation">
                                <p className="title">{car.model.name}</p>
                                <img className="delete" src={delBtn} alt="delete" onClick={() => deleteCar(car.id)}/>
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

    const createCar = () => {
        if (document.getElementById("NotiflixNotifyWrap") != undefined) {
            var myobj = document.getElementById("NotiflixNotifyWrap");
            myobj.remove();
        }
        if (carModel != 0) {
            let _plaque = num0 + num1 + num2 + num3 + num4 + num5 + num6 + num7
                //num7+num6+num5+num4+num3+num2+num1+num0
                //num0 + num1 + num2 + num3 + num4 + num5 + num6 + num7
            console.log(_plaque)
            Notiflix.Loading.Dots();
            let data = new FormData()
            data.append('model_id', carModel)
            data.append('car_plaque', _plaque)
            data.append('car_card_image', file)

            axios.post(url + '/user_car', data, {
                headers: {
                    'Accept': 'application/json',
                    'dataType': 'json',   //you may use jsonp for cross origin request
                    'Content-Type': "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': "Bearer " + token
                }
            })
                .then((responseJson) => {
                    if (responseJson.data.message == "ماشین با موفقیت ساخته شد.") {
                        Notiflix.Notify.Success('ماشین جدید با موفقیت ایجاد شد.');
                        setCarBrand(0)
                        setCarBrandTitle("")
                        setCarModel(0)
                        setCarModelTitle("")
                        setshowFile("")
                        setPlaque("")
                        setShowModal(false);
                        fetchCars();
                    }
                })
                .catch((error) => {
                    setShowModal(false);
                    console.log(error)
                })
        } else Notiflix.Notify.Failure('لطفا برند و مدل خودرو جدید را وارد کنید!');
    }

    const deleteCar = (id) => {
        Notiflix.Loading.Dots();
        const abortController = new AbortController()
        const promise = window
            .fetch(url + '/user_car/' + id, {
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
                console.log(responseJson)
                if (responseJson.message == "ماشین با موفقیت حذف شد.") {
                    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
                        var myobj = document.getElementById("NotiflixNotifyWrap");
                        myobj.remove();
                    }
                    Notiflix.Notify.Failure('ماشین با موفقیت حذف شد.');
                    fetchCars()
                }
            })
            .catch(err => {
                console.log(err)
            })
        // Cancel the request if it takes more than delayFetch seconds
        setTimeout(() => abortController.abort(), process.env.delayFetch)
    };
    const carBrandHandler = (e, value) => {
        if (value == null) {
            setCarModel(0)
            setCarModelTitle("")
            setCarBrand(0)
            setCarBrandTitle("")
            fetchCarModels("")
        } else {
            let cBrand = 0

            for (let i = 0; i < carBrands.length; i++) {
                if (carBrands[i].name == value) {
                    cBrand = carBrands[i].id
                    setCarBrandTitle(carBrands[i].name)
                    fetchCarModels(cBrand)
                }
            }
        }


    }
    const carModelHandler = (e, value) => {
        if (value == null) {
            setCarModel(0)
            setCarModelTitle("")
        } else {
            let cModel = 0
            for (let i = 0; i < carModels.length; i++) {
                if (carModels[i].name == value) {
                    cModel = carModels[i].id;
                    setCarModelTitle(carModels[i].name)
                    setCarModel(cModel);
                    for (let j = 0; j < carBrands.length; j++)
                        if (carModels[i].brand_id == carBrands[j].id) {
                            setCarBrandTitle(carBrands[j].name)
                        }
                }
            }
        }

    }
    const imageHandler = async (event) => {
        //fileObj1.push(event.target.files)
        let _name = event.target.files[0].name;
        let _lastModified = event.target.files[0].lastModified;
        //setFile(event.target.files[0])
        /*const [{size, name, type}] = fileArray1[0];
        if (type != "image/png" && type != "image/jpeg" && type != "image/jpg")
            setErrorMessage("فقط مجاز به آپلود عکس می باشید.");*/
        setshowFile(URL.createObjectURL(event.target.files[0]));
        let _file = new File([event.target.files[0]], _name, {type: "image/jpeg"});
        setFile(_file)
    }
    const closeModal = () => {
        setShowModal(false);
    }
    const showModalNew = () => {
        setShowModal(true);
    }
    return (
        <MuiThemeProvider theme={theme}>
            <div className="favoritesList">
                <ul>
                    {cars}
                </ul>
                <Button className="userProfileBtn" variant="contained" color="secondary" onClick={showModalNew}>ایجاد
                    خودرو جدید</Button>
            </div>
            <Dialog open={showModal} onClose={closeModal} aria-labelledby="form-dialog-title">
                {/*<DialogTitle id="form-dialog-title">ارسال مدارک</DialogTitle>*/}
                <DialogContent>
                    <DialogContentText>
                        {/*برای استفاده از خدمات کارواش در غیاب مشتری لطفا پلاک خودرو خود را وارد کرده و کارت ماشین را
                        آپلود نمایید.*/}
                    </DialogContentText>
                    <div className="userEditProfile userCar" dir="rtl">
                        <FormControl variant="filled">
                            <Autocomplete
                                id="tags-filled"
                                value={carBrandTitle}
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
                        <FormControl variant="filled">
                            <Autocomplete
                                id="tags-filled"
                                value={carModelTitle}
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
                        <Row>
                            <div className="carPlate">
                                <input type="tel" inputMode="number" maxLength={1} value={num0} id="0" onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                                <input type="tel" inputMode="number" maxLength={1} value={num1} id="1" onChange={numHandler}
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
                                <input type="tel" inputMode="number" maxLength={1} value={num3} id="3" onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                                <input type="tel" inputMode="number" maxLength={1} value={num4} id="4" onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                                <input type="tel" inputMode="number" maxLength={1} value={num5} id="5" onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                                <input type="tel" inputMode="number" maxLength={1} value={num6} id="6" onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                                <input type="tel" inputMode="number" maxLength={1} value={num7} id="7" onChange={numHandler}
                                       pattern="[0-9]*" onKeyDown={numHandler}/>
                            </div>
                        </Row>
                        {/*<TextField id="outlined-basic" label="پلاک ماشین" variant="filled" value={plaque}
                                   onChange={plaqueHandler} className="inputField"/>*/}
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
                            <img src={showFile} className="carImg"/>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary" variant="fill" className="dialogBtn">
                        لغو
                    </Button>
                    <Button onClick={createCar} color="primary" variant="fill" className="dialogBtn">
                        ایجاد خودرو جدید
                    </Button>
                </DialogActions>
            </Dialog>

        </MuiThemeProvider>
    );
}

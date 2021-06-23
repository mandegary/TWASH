import React, { useState, useContext, useRef, useEffect } from "react";
import "./Toolbar.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, TextField } from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "../logo/logo";
import MenuItems from "../MenuItems/MenuItems";
import SideDrawer from "../SideDrawer/SideDrawer";
import drawer from "../../../assets/images/menu.png";
import InstallPWA from "../InstallPWA/InstallPWA";
import Avatar from "@material-ui/core/Avatar";
import { AuthContext } from "../../../context/Auth/authContext";
import Notiflix from "notiflix";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { MuiThemeProvider } from "@material-ui/core/styles";
import cloudComputing from "../../../assets/images/cloud-computing.png";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { VerifyToken } from "../../../components/Helpers";
import Rating from "../../../components/orders/rating";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";

const scrollToRef = (ref) =>
  ref.current != undefined ? window.scrollTo(0, ref.current.offsetTop) : null;
const Toolbar = (props) => {
  const router = useRouter();
  const startRef = useRef(null);
  const [openSideDrawer, setOpenSideDrawer] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showRatingModal, setShowRatingModal] = React.useState(false);

  //const [code, setCode] = useState("")
  const [balance, setBalance] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const { dispatch } = useContext(AuthContext);
  const title =
    "با ثبت نام در سی تپ با استفاده از این کد از تی سپ اعتبار بگیرید.";
  Notiflix.Notify.Init({
    width: "250px",
    useIcon: false,
    fontSize: "14px",
    fontFamily: "IRANSansWeb",
    position: "center-top",
    closeButton: true,
    rtl: true,
    cssAnimationStyle: "from-top",
  });
  Notiflix.Loading.Init({
    svgColor: process.env.loadingDotsColor,
  });
  let _class = "header " + props.class;
  let url = process.env.url;
  //let isChrome = /chrome/.test( navigator.userAgent.toLowerCase());
  let token = "",
    code = "",
    name,
    family;
  if (typeof window != "undefined") {
    token = JSON.parse(localStorage.getItem("accessToken"));
    code = JSON.parse(localStorage.getItem("refferalCode"));
    if (JSON.parse(localStorage.getItem("name")) != undefined)
      name = JSON.parse(localStorage.getItem("name"));
    if (JSON.parse(localStorage.getItem("family")) != undefined)
      family = JSON.parse(localStorage.getItem("family"));
  }

  useEffect(() => {
    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
      var myobj = document.getElementById("NotiflixNotifyWrap");
      myobj.remove();
    }
    if (token != "" && token != null) {
      const abortController = new AbortController();
      const promise = window
        .fetch(url + "/init", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            dataType: "jsonp", //you may use jsonp for cross origin request
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token,
          },
          method: "GET",
          mode: "cors",
          signal: abortController.signal,
        })
        .then((res) => res.json())
        .then((responseJson) => {
          if (responseJson.message == "Unauthenticated.") VerifyToken();
          else if (responseJson.message == "اطلاعات با موفقیت دریافت شد.") {
            //setCode(responseJson.user.referral_code)
            setBalance(responseJson.balance);
            dispatch({
              type: "balance",
              payload: {
                token: token,
                balance: responseJson.balance,
                orders: responseJson.orders,
              },
            });
            if (document.getElementById("NotiflixLoadingWrap") != undefined) {
              var myobj = document.getElementById("NotiflixLoadingWrap");
              myobj.remove();
            }
            if (responseJson.should_get_rating != null) {
              setShowRatingModal(true);
              setOrderId(responseJson.should_get_rating.id);
            }
          }
        })
        .catch((err) => {
          /*alert(err.message)
                    if(err.message=="Unauthenticated.")
                        VerifyToken();*/
        });
      // Cancel the request if it takes more than delayFetch seconds
      setTimeout(() => abortController.abort(), process.env.delayFetch);
    }
  }, []);
  const DrawerHandler = () => {
    setOpenSideDrawer(true);
  };
  const closeDrawer = () => {
    setOpenSideDrawer(false);
  };
  const showBackdrop = () => {
    setOpenBackdrop(true);
  };
  const closeBackdrop = () => {
    setOpenBackdrop(false);
  };
  const closeModal = () => {
    if (document.getElementById("NotiflixNotifyWrap") != undefined) {
      var myobj = document.getElementById("NotiflixNotifyWrap");
      myobj.remove();
    }
    if (document.getElementById("NotiflixLoadingWrap") != undefined) {
      var myobj = document.getElementById("NotiflixLoadingWrap");
      myobj.remove();
    }
    setShowRatingModal(false);
    setShowModal(false);
  };
  const showCodeModal = () => {
    setShowModal(true);
    setOpenBackdrop(false);
    setOpenSideDrawer(false);
  };
  const copyLink = async (copyMe) => {
    try {
      if (document.getElementById("NotiflixNotifyWrap") != undefined) {
        var myobj = document.getElementById("NotiflixNotifyWrap");
        myobj.remove();
      }
      await navigator.clipboard.writeText(code);
      Notiflix.Notify.Success("کد شما کپی شد.");
    } catch (err) {
      Notiflix.Notify.Failure("لطفا دوباره تلاش کنید.");
    }
  };

  const logout = () => {
    Notiflix.Loading.Dots();
    const abortController = new AbortController();
    const promise = window
      .fetch(url + "/sanctum/logout", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Host: "teb724.com",
          dataType: "jsonp", //you may use jsonp for cross origin request
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + token,
        },
        method: "POST",
        mode: "cors",
        signal: abortController.signal,
      })
      .then((res) => res.json())
      .then((responseJson) => {
        if (responseJson.message == "خروج با موفقیت انجام شد.") {
          if (document.getElementById("NotiflixLoadingWrap") != undefined) {
            var myobj = document.getElementById("NotiflixLoadingWrap");
            myobj.remove();
          }
          dispatch({ type: "logout" });
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // Cancel the request if it takes more than 5 seconds
    setTimeout(() => abortController.abort(), process.env.delayFetch);
  };

  return (
    <header className={_class} id="header" ref={startRef}>
      <Container>
        <Row>
          <Col xl={1} lg={1} md={2} sm={2} xs={2}>
            {
              <React.Fragment>
                {props.isHome ? <InstallPWA /> : null}

                {token ? (
                  <div className="avatar userLnk">
                    <Avatar src="/broken-image.jpg" />
                    <div className="userMenu">
                      {name != null && family != null ? (
                        <span>{name + " " + family} خوش آمدید.</span>
                      ) : (
                        <span>کاربر عزیز خوش آمدید.</span>
                      )}

                      <span className="wallet">
                        اعتبار من ({balance} تومان)
                      </span>
                      <Link href="/user">
                        <a href="/user">
                          <span className="userInfoEditLnk">پروفایل من</span>
                        </a>
                      </Link>
                      <span className="exitLnk" onClick={logout}>
                        خروج
                      </span>
                    </div>
                  </div>
                ) : (
                  /*<div className="userIsLoginLinks">
                                        <Link href="/user">
                                            <a>پروفایل من</a>
                                        </Link>
                                        <span>اعتبار من ({balance} تومان)</span>

                                    </div>*/
                  ""
                )}
              </React.Fragment>
            }
          </Col>
          <Col xl={8} lg={8} md={1} sm={1} xs={1} className="topMenu">
            <MenuItems
              isHome={props.isHome}
              showMenu={props.showMenu}
              showCodeModal={showCodeModal}
            />
          </Col>
          <Col xl={3} lg={3} md={8} sm={8} xs={8}>
            <Logo />
          </Col>
          <Col
            xl={2}
            lg={2}
            md={2}
            sm={2}
            xs={2}
            className="drawer"
            onClick={DrawerHandler}
          >
            <img src={drawer} />
          </Col>
          <SideDrawer
            show={openSideDrawer}
            closeDrawer={closeDrawer}
            showCodeModal={showCodeModal}
          />
        </Row>
        <Dialog
          open={showModal}
          onClose={closeModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">دعوت از دوستان</DialogTitle>
          <DialogContent>
            <DialogContentText>
              با اشتراک گذاری این کد با دوستانتان هم شما و هم دوستانتان اعتبار
              هدیه دریافت نمایید.
            </DialogContentText>
            <div className="refferal">
              <div>
                <span>کد شما</span>
                {code}
              </div>
              <TelegramShareButton
                url={code}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <WhatsappShareButton
                url={code}
                title={title}
                separator=" :: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TwitterShareButton
                url={code}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <EmailShareButton
                url={code}
                subject={title}
                body="body"
                className="Demo__some-network__share-button"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              <FacebookShareButton
                url={code}
                quote={title}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={closeModal}
              color="primary"
              variant="fill"
              className="dialogBtn"
            >
              لغو
            </Button>
            <Button
              onClick={copyLink}
              color="primary"
              variant="fill"
              className="dialogBtn"
            >
              کپی کردن کد
            </Button>
          </DialogActions>
        </Dialog>
        <Rating open={showRatingModal} onClose={closeModal} orderId={orderId} />
      </Container>
    </header>
  );
};
export default React.memo(Toolbar);

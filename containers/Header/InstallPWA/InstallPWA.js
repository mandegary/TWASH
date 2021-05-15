import React, { useEffect, useState } from "react";
import "./InstallPWA.css";
import {Button} from "@material-ui/core";

const InstallPWA = () => {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            //console.log("we are being triggered :D");
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    const onClick = evt => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    };
    if (!supportsPWA) {
        return null;
    }
    return (
        <Button className="downloadBtn" variant="contained" color="secondary"
                title="افزودن به صفحه اصلی" onClick={onClick}>
            دانلود اپلیکیشن تیسپ
        </Button>
    );
};

export default InstallPWA;


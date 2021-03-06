
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function () {
            // alert('Service worker registered!');
        }).catch(function (e) {
        console.log("error", e)
        //alert('Service worker error!');
    });
}
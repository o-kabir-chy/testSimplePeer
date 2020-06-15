define([], function () {
    return {



        captureOwnVideo : function (ElementId) {
            if (navigator.getUserMedia) {
                const promise = navigator.getUserMedia({ audio: true, video: true });
                promise.then(stream => {
                    captureVideo(stream, ElementId);
                }).catch(error => console.error(error));
            }
        },
        captureVideo : function (stream, elementId) {
            let video = document.getElementById(elementId);
            if ('srcObject' in video) {
                video.srcObject = stream;
            }
            else {
                video.src = window.URL.createObjectURL(stream); // for older browsers
            }
            video.play();
        },

        getDisplayMedia :function (gdmOptions) {
            return new Promise((resolve, reject) => {
                var promise = navigator.mediaDevices.getDisplayMedia(gdmOptions);
                promise.then(stream => {
                    resolve(stream);
                }).catch(e => {
                    reject(e);
                });
            });
        },
        initGetUserMedia : function () {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        }
    }
});

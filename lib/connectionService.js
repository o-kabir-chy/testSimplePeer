define(["./uiService"], function (uiService) {
    return function connectionService(socket) {
        this.gdmOptions=gdmOptions = {
            video: {
              cursor: "always"
            },
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              sampleRate: 44100
            }
          };

        this.ui = new uiService(socket);
        this.Connect = function(sec) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('after %s sec', sec);
                    console.log('after %s sec', sec);
                    // var ui = new UI(socket);
                    console.log('just connecting!');
                    //let stream;
                    this.ui.Connect(null);
                    resolve(true);
                }, sec * 1000);
            });
        };
        this.Disconnect = function(sec) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('after %s sec', sec);
                    this.ui.Disconnect();
                    resolve(true);
                }, sec * 1000);
            });
        }
        this.Reconnect = function (sec) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('after %s sec', sec);
                    this.ui.Connect();
                    resolve(true);
                }, sec * 3000);
            });
        }
        this.connectWithDisplayMedia = function (sec) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('after %s sec', sec);
                    var promise = navigator.mediaDevices.getDisplayMedia(this.gdmOptions);
                    promise.then(stream => {
                        //var ui = new UI(socket);
                        console.log('connecting with stream');
                        this.ui.Connect(stream);
                        resolve(true);
                    });
                }, sec * 1000);
            });
        }

    }
});







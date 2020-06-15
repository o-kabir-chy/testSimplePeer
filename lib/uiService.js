
define(['./PrimaryPeer2', './SecondaryPeer','./MediaManager'],function (pp,sp,mediaManager) {
  return function uiService(socket) {
    this.toUser = "";
    this.socket = socket;

    this.p2 = new sp(socket, 'your-video');
    
    this.Connect = function (stream) {

      if (this.socket) {
        this.p = new pp(this.socket, this.toUser);
        if (stream) {
          console.log('ui called connect with stream');
          this.p.Connect(stream);
        }
        else {
          this.p.Connect(null);
        }
        // this.p.Connect();
      } else {
        console.log("signaling is not properly initialized");
      }
      //  return this.p;
    }
    this.SelectUser = function (name) {
      toUser = name;
    }
    this.Disconnect = function () {
      this.p.Disconnect();
    }
    this.AddStreamToPrimary = function () {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      var promise = navigator.getUserMedia({ audio: true, video: true });

      promise.then(stream => {
        console.log('trying to stream added');
        this.p.AddStream(stream);
      }).catch(error => console.error(error));
    }
  }
});



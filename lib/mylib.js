
//var events = require('events');

class PrimaryPeer {

  constructor(socket, toUser) {
    this.toUser = toUser;
    this.p = new SimplePeer({
      initiator: false,
      //  wrtc: wrtc,
      trickle: false
    });
    this.socket = socket;

  }

  InstantiatePeer = function () {
    this.p = new SimplePeer({
      initiator: true,
      //  wrtc: wrtc,
      trickle: false
    });
    // this.isActive=true;
    if (this.p) {
      console.log('Primary peer instantiated!');
    };

    this.p.debug = console.log;
    this.p.on('signal', data => {
      this.offer_ = data;
      console.log('offer generated');
      console.log(data);
      console.log("Offer emited");
      this.socket.emit('offer', JSON.stringify(this.offer_));
    });
    this.p.on('connect', () => {
      console.log('Primary:Connection Established!');
    });
    this.p.on('close', () => {
      console.log('Primary:disconnected!');
      this.isActive = false;
    });
    this.socket.on('answer', data => {
      this.answer_ = JSON.parse(data);
      console.log('Answer Received');
      console.log(data);
      // if(!this.isActive)
      //   this.InstantiatePeer();
      if (this.p) {
        try {
          this.p.signal(this.answer_);
        }
        catch (error) {
          alert(error);
        }
      }



    });
  }

  Disconnect = function () {
    if (this.p) {
      this.p.destroy();
    }
    delete this.p;
  };

  Connect = function () {
    this.InstantiatePeer();
  };
  AddStream = function (stream) {
    if (this.p) {
      this.p.addStream(stream);
      console.log('stream added to Primary');
    }
  }
}
class PrimaryPeer2 {

  constructor(socket, toUser) {
    this.toUser = toUser;

    this.p = new SimplePeer({
      initiator: false,
      //  wrtc: wrtc,
      trickle: false
    });
    this.socket = socket;

  }

  InstantiatePeer = function (stream) {
    if (stream) {
      this.p = new SimplePeer({
        initiator: true,
        stream: stream,
        //  wrtc: wrtc,
        trickle: false
      });
      console.log('instantiate peer with stream!');
    }
    else {
      this.p = new SimplePeer({
        initiator: true,
        //stream:stream,
        //  wrtc: wrtc,
        trickle: false
      });
    }

    // this.isActive=true;
    if (this.p) {
      console.log('Primary peer instantiated!');
    };

    this.p.debug = console.log;
    this.p.on('signal', data => {
      this.offer_ = data;
      console.log('offer generated');
      console.log(data);
      console.log("Offer emited");
      this.socket.emit('offer', JSON.stringify(this.offer_));
    });
    this.p.on('connect', () => {
      console.log('Primary:Connection Established!');
    });
    this.p.on('close', () => {
      console.log('Primary:disconnected!');
      this.isActive = false;
    });
    this.p.on('stream', stream => {
      console.log('Primary:stream received');
    });
    this.socket.on('answer', data => {
      this.answer_ = JSON.parse(data);
      console.log('Answer Received');
      console.log(data);
      // if(!this.isActive)
      //   this.InstantiatePeer();
      if (this.p) {
        try {
          this.p.signal(this.answer_);
        }
        catch (error) {
          alert(error);
        }
      }
    });
  }

  Disconnect = function () {
    if (this.p) {
      this.p.destroy();
    }
    delete this.p;
  };

  Connect = function (stream) {
    this.InstantiatePeer(stream);
  };
  AddStream = function (stream) {
    if (this.p) {
      this.p.addStream(stream);
      console.log('stream added to Primary');
    }
  }
  // InstantiatePeer = function (stream) {
  //   this.p.debug = console.log;
  //   this.p.on('signal', data => {
  //     this.offer_ = data;
  //     console.log('offer generated');
  //     console.log(data);
  //     console.log("Offer emited");
  //     this.socket.emit('offer', JSON.stringify(this.offer_));
  //   });
  //   this.p.on('connect', () => {
  //     console.log('Primary:Connection Established!');
  //   });
  //   this.p.on('close', () => {
  //     console.log('Primary:disconnected!');
  //     this.isActive = false;
  //   });
  //   this.on('stream', stream => {
  //     console.log('stream received');
  //   });
  // }
}
class SecondaryPeer {
  //var connectTo="";

  constructor(socket, videoElementId) {
    this.videoElementId = videoElementId;
    this.connectTo = "";
    this.socket = socket;
    this.remoteStream = {};

    //  if (SimplePeer.WEBRTC_SUPPORT) {
    this.p = new SimplePeer({
      initiator: false,
      //  wrtc: wrtc,
      trickle: false
    });
    this.isActive = true;
    this.p.debug = console.log;
    this.p.on('signal', data => {
      this.answer_ = data;
      console.log('secondary peer sent answer');
      console.log(data);
      this.socket.emit('answer', JSON.stringify(data));
    });
    this.p.on('stream', stream => {
      console.log('Secondary: Stream received!');
      captureRemoteVideo(stream, this.videoElementId);
    });

    this.p.on('connect', () => {
      console.log('Secondary:Connection Established!');
    });
    this.p.on('close', () => {
      console.log('Secondary:disconnected!');
      this.isActive = false;
    });
    //peer.on('stream'


    this.socket.on('offer', data => {
      this.p = new SimplePeer({
        initiator: false,
        //  wrtc: wrtc,
        trickle: false
      });
      this.isActive = true;
      this.p.debug = console.log;
      this.p.on('signal', data => {
        this.answer_ = data;
        console.log('secondary peer sent answer');
        console.log(data);
        this.socket.emit('answer', JSON.stringify(data));
      });
      this.p.on('stream', stream => {
        console.log('Secondary: Stream received!');
        captureRemoteVideo(stream, this.videoElementId);
      });

      this.p.on('connect', () => {
        console.log('Secondary:Connection Established!');
      });
      this.p.on('close', () => {
        console.log('Secondary:disconnected!');
        this.isActive = false;
      });
      this.remoteOffer_ = JSON.parse(data);
      console.log('offer Received');
      console.log(data);
      // this.InstantiatePeer();
      // console.log('new peer instantiated!');  

      // console.log(this.p.destroyed());
      console.log('about to signal offer');
      this.p.signal(this.remoteOffer_);
    });

  }
};
class UI {

  constructor(socket) {
    this.toUser = "";
    this.socket = socket;
    this.p2 = new SecondaryPeer(socket, 'your-video');
    // this.p2.on('gotStream', stream=>{
    //   captureRemoteVideo(stream,'your-video');
    // });
    this.Connect = function (stream) {

      if (this.socket) {

        this.p = new PrimaryPeer2(this.socket, this.toUser);
        if (stream) {
          console.log('ui called connect with stream');
          this.p.Connect(stream);
        }
        else {
          this.p.Connect();
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
}
function captureOwnVideo() {
  if (navigator.getUserMedia) {
    const promise = navigator.getUserMedia({ audio: true, video: true });
    promise.then(stream => {
      p = new SimplePeer({
        initiator: true,
        stream: stream,
        trickle: false
      });
      p.on('signal', data => {
        console.log(data);
        p2.signal(data);
      });
      p.on('connect', () => {
        console.log("Connection Established!");
      });
    }).catch(error => console.error(error));
  }
}
function captureRemoteVideo(stream, elementId) {
  let video = document.getElementById(elementId);

  if ('srcObject' in video) {
    video.srcObject = stream;
  } else {
    video.src = window.URL.createObjectURL(stream); // for older browsers
  }
  video.play();
}
function initGetUserMedia() {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
}

module.exports.PrimaryPeer = PrimaryPeer;
module.exports.SecondaryPeer = SecondaryPeer;
module.exports.UI = UI;
module.exports.captureOwnVideo = captureOwnVideo;
module.exports.captureRemoteVideo = captureRemoteVideo;
module.exports.initGetUserMedia = initGetUserMedia;

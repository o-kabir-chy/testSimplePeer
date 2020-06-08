define(function () {
  return function PrimaryPeer2(socket, toUser) {
    this.toUser = toUser;
    this.p = new SimplePeer({
      initiator: false,
      //  wrtc: wrtc,
      trickle: false
    });
    this.socket = socket;
  }
  this.InstantiatePeer = function (stream) {
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
    }
    ;
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
  };
  this.Disconnect = function () {
    if (this.p) {
      this.p.destroy();
    }
    delete this.p;
  };
  this.Connect = function (stream) {
    this.InstantiatePeer(stream);
  };
  this.AddStream = function (stream) {
    if (this.p) {
      this.p.addStream(stream);
      console.log('stream added to Primary');
    }
  };
});

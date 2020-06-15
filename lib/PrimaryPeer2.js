define(['./peerService'], function (peerService) {

  return function PrimaryPeer2(socket, toUser) {
    this.ps = new peerService(socket, 'my-video', 'your-video');
    this.toUser = toUser;
    this.p = new SimplePeer({
      initiator: false,
      //  wrtc: wrtc,
      trickle: false
    });
    this.socket = socket;

    this.InstantiatePeer = function (stream) {
      if (stream) {
        this.p = this.ps.create(true, stream, false);
        console.log('instantiate peer with stream!');
      }
      else {
        this.p = this.ps.create(true, stream, false);
      }
      // this.isActive=true;
      if (this.p) {
        console.log('Primary peer instantiated!');
      }
      this.socket.on('answer', data => {
        this.answer_ = JSON.parse(data);
        console.log('Answer Received');
        console.log(data);
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
  }
});

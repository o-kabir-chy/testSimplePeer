define(['./peerService'], function (peerService) {
  
  return function PrimaryPeer(socket, toUser) {
    this.ps=new peerService(socket,'my-video','your-video');

    this.toUser = toUser;
    this.p = new SimplePeer({
      initiator: false,
      //  wrtc: wrtc,
      trickle: false
    });
    this.socket = socket;

    this.InstantiatePeer = function () {
      this.p = this.ps.InstantiatePeer(true);
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
    this.Connect = function () {
      this.InstantiatePeer();
    };
    this.AddStream = function (stream) {
      if (this.p) {
        this.p.addStream(stream);
        console.log('stream added to Primary');
      }
    };
  }
});



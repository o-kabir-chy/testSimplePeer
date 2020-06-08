define(function () {
  return function SecondaryPeer(socket, videoElementId) {
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
      captureVideo(stream, this.videoElementId);
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
});

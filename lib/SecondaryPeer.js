define(['./peerService'], function (peerService) {
  return function SecondaryPeer(socket, videoElementId) {
    this.videoElementId = videoElementId;
    this.connectTo = "";
    this.socket = socket;
   // this.remoteStream = {};
    //  if (SimplePeer.WEBRTC_SUPPORT) {
    this.ps=new peerService(socket, '',videoElementId);  
   // this.p = this.ps.create(false,null,false);
    this.socket.on('offer', data => {
      this.p=this.ps.create(false,null,false);
      this.remoteOffer_ = JSON.parse(data);
      console.log('offer Received');
      console.log(data);
      console.log('about to signal offer');
      this.p.signal(this.remoteOffer_);
    });
  }
});

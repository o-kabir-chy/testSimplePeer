define(['./MediaManager'], function (mediaManager) {
    return function peerService(socket, localVideoId,remoteVideoId) {
         this.localVideoId=localVideoId;
         this.remoteVideoId=remoteVideoId;
         this.socket=socket;
        this.instantiatePrimaryPeerWithStream=function(stream,trickle){
           var p= new SimplePeer({
                initiator: true,
                //  wrtc: wrtc,
                stream:stream,
                trickle: trickle
            });
            if (p) {
                console.log('Primary peer instantiated!');
            }
            p.debug = console.log;
            p.on('signal', data => {
                this.offer_ = data;
                console.log('offer generated');
                console.log(data);
                console.log("Offer emited");
                this.socket.emit('offer', JSON.stringify(this.offer_));
            });
            p.on('connect', () => {
                console.log('Primary:Connection Established!');
            });
            p.on('close', () => {
                console.log('Primary:disconnected!');
              //  this.isActive = false;
            });
            return p;
        }
        this.instantiateSecondaryPeerWithStream=function(stream,trickle){
            p = new SimplePeer({
                initiator: false,
                stream:stream,
                //  wrtc: wrtc,
                trickle: trickle
            });
            //this.isActive = true;
            p.debug = console.log;
            p.on('signal', data => {
                this.answer_ = data;
                console.log('secondary peer sent answer');
                console.log(data);
                this.socket.emit('answer', JSON.stringify(data));
            });
            p.on('stream', stream => {
                console.log('Secondary: Stream received!');
                mediaManager.captureVideo(stream, this.remoteVideoId);
            });
            p.on('connect', () => {
                console.log('Secondary:Connection Established!');
            });
            p.on('close', () => {
                console.log('Secondary:disconnected!');
              //  this.isActive = false;
            });
            return p;
        }
        this.instantiatePrimaryPeerWithoutStream=function (trickle){
            var p= new SimplePeer({
                initiator: true,
                //  wrtc: wrtc,
                //stream:stream,
                trickle: trickle
            });
            if (p) {
                console.log('Primary peer instantiated!');
            }
            p.debug = console.log;
            p.on('signal', data => {
                this.offer_ = data;
                console.log('offer generated');
                console.log(data);
                console.log("Offer emited");
                this.socket.emit('offer', JSON.stringify(this.offer_));
            });
            p.on('connect', () => {
                console.log('Primary:Connection Established!');
            });
            p.on('close', () => {
                console.log('Primary:disconnected!');
              //  this.isActive = false;
            });
            return p;
        }
        this.instantiateSecondaryPeerWithoutStream=function(trickle){
            p = new SimplePeer({
                initiator: false,
               // stream:stream,
                //  wrtc: wrtc,
                trickle: trickle
            });
           // this.isActive = true;
            p.debug = console.log;
            p.on('signal', data => {
                this.answer_ = data;
                console.log('secondary peer sent answer');
                console.log(data);
                this.socket.emit('answer', JSON.stringify(data));
            });
            p.on('stream', stream => {
                console.log('Secondary: Stream received!');
                mediaManager.captureVideo(stream, this.remoteVideoId);
            });
            p.on('connect', () => {
                console.log('Secondary:Connection Established!');
            });
            p.on('close', () => {
                console.log('Secondary:disconnected!');
                this.isActive = false;
            });
            return p;
        }
        this.create=function (mode, stream, trickle)
        {
            if (stream) {

                if (mode) this.p= this.instantiatePrimaryPeerWithStream(stream,trickle) 
                else this.p= this.instantiateSecondaryPeerWithStream(stream,trickle);
            }else{
                if (mode) {
                   this.p=this.instantiatePrimaryPeerWithoutStream(trickle);
                } else {
                    this.p= this.instantiateSecondaryPeerWithoutStream(trickle);
                }
            }
            return this.p;
        }

    }
})
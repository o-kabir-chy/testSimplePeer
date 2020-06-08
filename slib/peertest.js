var peer =require('simple-peer');
var events = require('events');
var wrtc = require('wrtc');
var io=require('socket.io-client');
var signalingService =new events.EventEmitter();
//signialingService.on('offer',data=>{
// signalingService.on('offer',data=>{
//    console.log("server Received offer");
// });
//});
// io.on('connection',socket=>{

// });

var socket=io();
if(socket)
console.log('socket resolved');

class UI
{

  constructor(signialingService)
  {
    this.signialingService=signialingService;
    this.p2=new SecondaryPeer(signialingService);
    this.Connect=function()
    {
      if(this.signialingService){
      this.p= new PrimaryPeer(this.signialingService);
      }else {
         console.log("signaling is not properly initialized");
      }
    //  return this.p;
    }
  }
  // var p2=new SecondaryPeer(this.signialingService);

}
class UI_io
{

  constructor(io)
  {
    this.io=io;
    this.p2=new SecondaryPeer(signialingService);
    this.Connect=function()
    {
      if(this.signialingService){
      this.p= new PrimaryPeer(this.signialingService);
      }else {
         console.log("signaling is not properly initialized");
      }
    //  return this.p;
    }
  }
  // var p2=new SecondaryPeer(this.signialingService);

}

class PrimaryPeer
{
  constructor(signialingService)
  {
    this.signalingService=signialingService;
    this.p=new peer({
        initiator:true,
        wrtc: wrtc,
        trickle:false
      });
    //  console.log('constructor called!');
      this.p.debug=console.log;
      this.p.on('signal',data=>{
        this.offer_=data;
        console.log('offer generated');
        console.log(data);
        this.Connect();
      });
      this.signalingService.on('answer',data=>{
        this.answer_=data;
        console.log('Answer Received');
        console.log(data);
        this.p.signal(data);

      });
      this.p.on('connect',()=>{
        console.log('Primary:Connection Established!');
      });
      console.log('primary peer sent offer');
      console.log(this.offer_);
    this.Connect=function()
    {

      if(this.offer_){
      this.signalingService.emit('offer',this.offer_);
    }
      else {
       console.log("Offer not generated");
      }
    }
  }
};

  class SecondaryPeer
  {
    constructor(signialingService)
    {

      this.signialingService=signialingService;
      this.p=new peer({
        initiator:false,
          wrtc: wrtc,
        trickle:false
      });

      this.p.debug=console.log;
      this.p.on('signal',data=>{
        this.answer_=data;
        console.log('secondary peer sent answer');
        console.log(data);
        this.signialingService.emit('answer',data);
      });
      this.signialingService.on('offer',data=>{
        this.remoteOffer_=data;
        console.log('offer Received');
        console.log(data);
        this.p.signal(data);
      });
      this.p.on('connect',()=>{
        console.log('Secondary:Connection Established!');
      });
    }
  };
  // var p2=new SecondaryPeer(signalingService);
  // var p1=new PrimaryPeer(signalingService);
 // new UI(signalingService).Connect();
  //  p1.Connect();

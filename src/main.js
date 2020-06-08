var peer=require('simple-peer');
var wrtc=require('wrtc');

var p=new peer({
  initiator:true,
  wrtc: wrtc,
  trickle:false
});
var p2=new peer({
  initiator:false,
  wrtc: wrtc,
  trickle:false
});

p.on('signal',data=>{
  console.log(data);
  p2.signal(data);
});
p.on('connect',()=>console.log('Primary: Connected!'));
p.on('close',()=>console.log('Primary:connection Closed!'));
p.on('error',err=>console.log(err));
p2.on('signal',data=>{
  console.log(data);
  p.signal(data);
});

p2.on('connect',()=>console.log('Secondary: Connected!'));
p2.on('close',()=>console.log('Primary:connection Closed!'));
p2.on('error',err=>console.log(err));
setTimeout(()=>{
   console.log('after 10 sec');
   p.destroy();
 },10000);

//console.log(ns);

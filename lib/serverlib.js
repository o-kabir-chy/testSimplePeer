class User
{
    constructor(name,password,isOnline,SocketId)
    {
        this.name=name;
        this.password=password;
        this.isOnline=isOnline;
        this.socketId=socketId;
    }
}

class UserManager
{
    constractor()
    {
        this.users=[{}];
        this.initWithTestUsers()
          .then(()=>console.log('test Users initialized!'))
          .catch((error)=>{
              console.log(error);
          });
    }

  
   AddUser=async function(u)
    {
        return new Promise((resolve, reject) =>{
            var n= this.users.push(u);
            if(n>0)
            resolve('success');
            else
            reject('failed');
        });
    }
    initWithTestUsers=async function()
    {
        return new Promise((resolve, reject) =>{
         var result1=  this.AddUser({name:'Kabir', password:'1234',isOnline:false, socketId:'' });
         var result2=  this.AddUser({name:'Manik', password:'2365',isOnline:false, socketId:'' });
         var result3=  this.AddUser({name:'Boshir', password:'9857',isOnline:false, socketId:'' });  
         var result4=  this.AddUser({name:'Samia', password:'5695',isOnline:false, socketId:'' });
         if(result=='success' && result2=='success' && result3=='success' && result4=='success')
          resolve('success');
          else reject('failed');    
        });
    }
   RemoveUser=async function(name)
    {
        return new Promise((resolve, reject) =>{
            var index=users.map(x=>x.name).indexOf(name);
            if(index>=0){
                this.users.splice( index,1);
                resolve('success');
            }
            reject('failed');
        });
    }
    Find=async function(name)
    {
        return new Promise((resolve, reject) =>{
          var u= this.users.Find(x=>x.name==name);
          if(u)
            resolve(u);
            else
            reject('falied'); 
        });
    }
    GetAll=async function()
    {
        return new Promise((resolve,reject)=>{
          if(this.users.length==0) reject('Error:List is empty');
            return this.users;
          resolve('success');
        });
    }
    LogIn=async (name)=>
    {
       return new Promise((resolve,reject)=>{
        var u= user.Find(x=>x.name==name);
        if(u)
        {
            u.isOnline=true;
            resolve('success');
        }
        else{
            reject('ERROR:User '+name+' not Found');
        }
       });  
    }
    LogOut=async (name)=>
    {
        return new Promise((resolve,reject)=>{
            var u= user.Find(x=>x.name==name);
            if(u)
            {
                u.isOnline=false;
                resolve('success');
            }
            else{
                reject('ERROR:User '+name+' not Found');
            }
           });  
    }
}

class SignalingService{
    constructor(userManager,io)
    {
        this.userManager=userManager;
        this.io=io;
    }
    offerTo=async function(offerObj)
    {
       return new Promise((resolve,reject)=>{
        var offerObj_=JSON.parse(offerObj);
        if(!offerObj_) reject('ERROR:offerObj Empty');
        if(offerObj_.offerTo=='') reject('ERROR:offerObj.offerTo is not set');
        userManager.Find(offerObj_.offerTo).then((u)=>{
                if(!u.isOnline){
                    reject('user '+offerObj_.offerTo +' is not Online Now' );
                } 
                if(io.socketId=='') reject('socketId not Found');               
                io.to(u.socketId).emit('offer',offerObj);
                console.log(offerObj_);
                resolve('offer sent to '+u.name);
           }).catch((error)=>
           {
               console.log(error);
           })
        });
    }
    answerTO=async function(answerObj){
        return new Promise((resolve,reject)=>{
            var answerObj_=JSON.parse(answerObj);
            if(!answerObj_){
                reject('ERROR:offerObj Empty');
            } 
            if(answerObj_.answerTo==''){
                reject('ERROR:offerObj.offerTo is not set');
            } 
            userManager.Find(answerObj_.answerTo).then(u=>{
                if(!u.isOnline){
                    reject('user '+answerObj_.answerTo +' is not Online Now' );
                } 
                if(io.socketId==''){
                    reject('socketId not Found');
                } 
                console.log(answerObj_);
                io.to(u.socketId).emit('answer',answerObj);
                resolve('answer sent to '+u.name);
           }).catch(error=> {
               console.log(error);
           });
        });
    }
} 
module.exports={
    User:User,
    UserManager:UserManager,
    SignalingService:SignalingService
};
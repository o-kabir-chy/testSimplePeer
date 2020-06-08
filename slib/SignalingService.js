class SignalingService {
    constructor(userManager, io) {
        this.userManager = userManager;
        this.io = io;
    }
    offerTo = async function (offerObj) {
        return new Promise((resolve, reject) => {
            var offerObj_ = JSON.parse(offerObj);
            if (!offerObj_)
                reject('ERROR:offerObj Empty');
            if (offerObj_.offerTo == '')
                reject('ERROR:offerObj.offerTo is not set');
            userManager.Find(offerObj_.offerTo).then((u) => {
                if (!u.isOnline) {
                    reject('user ' + offerObj_.offerTo + ' is not Online Now');
                }
                if (io.socketId == '')
                    reject('socketId not Found');
                io.to(u.socketId).emit('offer', offerObj);
                console.log(offerObj_);
                resolve('offer sent to ' + u.name);
            }).catch((error) => {
                console.log(error);
            });
        });
    };
    answerTO = async function (answerObj) {
        return new Promise((resolve, reject) => {
            var answerObj_ = JSON.parse(answerObj);
            if (!answerObj_) {
                reject('ERROR:offerObj Empty');
            }
            if (answerObj_.answerTo == '') {
                reject('ERROR:offerObj.offerTo is not set');
            }
            userManager.Find(answerObj_.answerTo).then(u => {
                if (!u.isOnline) {
                    reject('user ' + answerObj_.answerTo + ' is not Online Now');
                }
                if (io.socketId == '') {
                    reject('socketId not Found');
                }
                console.log(answerObj_);
                io.to(u.socketId).emit('answer', answerObj);
                resolve('answer sent to ' + u.name);
            }).catch(error => {
                console.log(error);
            });
        });
    };
}
exports.SignalingService = SignalingService;

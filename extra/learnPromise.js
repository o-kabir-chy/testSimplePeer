

function ut(expected, actual, param) {
    return new Promise((resolve, rejected) => {
        if (param == 'equals') {
            if (expected == actual) resolve('passed'); else rejected('failed');
        }
    })
}

function add(n1, n2) { return n1 + n2; }
// ut(3, add(1, 2), 'equals').then(result => console.log('add(1,2)==3 : ' + result)).catch(r => console.log('add(1,2)==3 :' + r));
// ut(4, add(2, 3), 'equals').then(result => console.log('add(2,3)==4 : ' + result)).catch(r => console.log('add(2,3)==4 :' + r));

function getMedia() {
    return new Promise((resolve, reject) => {
        resolve('streamObj');
    });
}

function createPeer(stream) {
    return new Promise((resolve, reject) => {
        if (stream === 'streamObj') resolve('p with stream');
        else reject('p without stream');
    });
}
function sendOffer(p) {
    return new Promise((resolve, reject) => {
        if (p === 'p with stream') resolve('answer');
        else reject('p not initialized properly');
    });
}

function getRemoteStream(result) {
    return new Promise((resolve, reject) => {
        if (result == 'answer') resolve('stream');
        else reject('connection failed');
    });
}
function ShowVideo(stream) {
    return new Promise((resolve, reject) => {
        if (stream == 'stream') resolve('Done!');
        else reject('no stream found!');
    });
}

getMedia().then(stream => {
    console.log('got media ');
    return createPeer(stream);
}).then(p => {
    if (p == 'p with stream') {
        console.log('peer created with stream');
        return sendOffer(p);
    }
    else console.log('peer cteated with out stream');
}).then(result => {
    if (result === 'answer') {
        console.log('answer received!');
        return getRemoteStream(result);
    }

}).then(s => {
    if (s == 'stream') {
        console.log('get remote stream!');
        return ShowVideo(s);
    }

}).then(r => {
    console.log(r);
})
    .catch(e => console.log(e));

function authenticate(username, password) {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}
function getUserRole(isAuthentic) {
    return new Promise((resolve, reject) => {
        if(isAuthentic)
        resolve(['admin']);
        else resolve(['guest']);
    });
}
function getWorkDone(roles){
    return new Promise((resolve,reject)=>{
        if(roles[0]=='admin')
       resolve('Work done!');
        else reject('Work not Done!');
    });
}

authenticate('Kabir','1234').then(r=>
    {
        if(r){
            console.log('User authencicated!');
            return getUserRole(r);
        } 
    }).then(roles=>{
        console.log('user has roles');
        roles.forEach(x=> console.log(x));
        return getWorkDone(roles);
    }).then(r=>{
        console.log(r);
    }).catch(e=>console.log(e));
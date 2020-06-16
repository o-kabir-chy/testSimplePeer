// const { SignalingService } = require("./SignalingService");

//const { User } = require("./User");

class UserManager {
    constractor() {
        this.users = [{}];
        this.initWithTestUsers()
            .then(() => console.log('test Users initialized!'))
            .catch((error) => {
                console.log(error);
            });
    }
    AddUser(u) {
        return new Promise((resolve, reject) => {
            var n = this.users.push(u);
            if (n > 0)
                resolve('success');
            else
                reject('failed');
        });
    }
    initWithTestUsers () {
        return new Promise((resolve, reject) => {
            var result1 = this.AddUser({ name: 'Kabir', password: '1234', isOnline: false, socketId: '' });
            var result2 = this.AddUser({ name: 'Manik', password: '2365', isOnline: false, socketId: '' });
            var result3 = this.AddUser({ name: 'Boshir', password: '9857', isOnline: false, socketId: '' });
            var result4 = this.AddUser({ name: 'Samia', password: '5695', isOnline: false, socketId: '' });
            if (result == 'success' && result2 == 'success' && result3 == 'success' && result4 == 'success')
                resolve('success');
            else reject('failed');
        });
    }
    RemoveUser (name) {
        return new Promise((resolve, reject) => {
            var index = users.map(x => x.name).indexOf(name);
            if (index >= 0) {
                this.users.splice(index, 1);
                resolve('success');
            }
            reject('failed');
        });
    }
    Find (name) {
        return new Promise((resolve, reject) => {
            var u = this.users.Find(x => x.name == name);
            if (u)
                resolve(u);
            else
                reject('falied');
        });
    }
    GetAll  () {
        return new Promise((resolve, reject) => {
            if (this.users.length == 0) reject('Error:List is empty');
            return this.users;
            resolve('success');
        });
    }
    LogIn (name)  {
        return new Promise((resolve, reject) => {
            var u = user.Find(x => x.name == name);
            if (u) {
                u.isOnline = true;
                resolve('success');
            }
            else {
                reject('ERROR:User ' + name + ' not Found');
            }
        });
    }
    LogOut (name) {
        return new Promise((resolve, reject) => {
            var u = user.Find(x => x.name == name);
            if (u) {
                u.isOnline = false;
                resolve('success');
            }
            else {
                reject('ERROR:User ' + name + ' not Found');
            }
        });
    }
}
module.exports.UserManager = UserManager;
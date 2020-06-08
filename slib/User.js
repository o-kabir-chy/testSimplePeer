class User {
    constructor(name, password, isOnline, SocketId) {
        this.name = name;
        this.password = password;
        this.isOnline = isOnline;
        this.socketId = socketId;
    }
}
exports.User = User;

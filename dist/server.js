"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const router_1 = __importDefault(require("./Router/router"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', router_1.default);
io.on('connection', socket => {
    console.log('A client has connected');
    socket.emit('connected-client', true);
    socket.on('notifyOrders', data => {
        console.log('new order occures');
        console.log('data: ', data);
        io.emit('incomingNeworder', data);
        console.log('emitted');
    });
    socket.on('secondApp', data => {
        console.log('second app connected');
    });
    socket.on('notifyUsers', data => {
        console.log('incomning new user');
        console.log('data: ', data);
        io.emit('incominguser', data);
        console.log('emited');
    });
    socket.on('disconnect', function () {
        console.log('Socket disconnected');
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log('socket server running on: ', PORT);
});

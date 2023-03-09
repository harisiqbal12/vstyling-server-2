import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import { email } from './Router';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('<h2>Explore Creation Socket Server</h2>');
});

app.use('/email', email);

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

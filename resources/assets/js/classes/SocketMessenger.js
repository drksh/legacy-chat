class SocketMessenger {

	constructor(socket) {
		this.socket = socket;
	}

	internal(message) {
		this.socket.emit('user-tell', message);
	}

	external(command) {
		this.socket.emit('message-send', command);
	}

}

export default SocketMessenger;
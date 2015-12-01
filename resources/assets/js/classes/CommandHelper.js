import SocketMessenger from './SocketMessenger';

class CommandHelper {

	constructor(socket) {
		this.socket = socket;
		this.messenger = new SocketMessenger(socket);
	}

	connect() {
		this.messenger.internal("syntax: /connect <channel> <nick>");
	}

	here() {
		this.messenger.internal("syntax: /here <nick>");
	}

}

export default CommandHelper;
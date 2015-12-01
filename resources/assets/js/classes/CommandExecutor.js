import CommandHelper from './CommandHelper';
import SocketMessenger from './SocketMessenger';

class CommandExecutor {

	constructor(socket) {
		this.socket = socket;
		this.commandHelper = new CommandHelper(socket)
		this.socketMessenger = new SocketMessenger(socket);
	}

	help(parameters = null) {
		try {
			if( ! parameters.length) {
				throw "No arguments passed to /help";
			}

			this.commandHelper[parameters[0]]();
		} catch(e) {
			this.socketMessenger.internal('what do you want help with?');
		}
	}

	connect(parameters = []) {
		let nick = "darkee";
		let channel = "general";

		if(parameters.length > 0) {
			channel = parameters[0];
		}
		if(parameters.length > 1) {
			nick = parameters[1];
		}

		this.socket.emit('user-connect', {
			nick,
			channel
		});
	}

	here(parameters) {
		try {
			if(! parameters.length)
				throw "No arguments passed to /here";

			this.socket.emit('user-exists', parameters[0]);
		} catch(e) {
			console.log(e);
			this.socketMessenger.internal('please supply a nick to search for.');
		}
	}

}

export default CommandExecutor;
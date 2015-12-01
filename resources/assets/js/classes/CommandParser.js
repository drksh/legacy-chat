import CommandExecutor from './CommandExecutor';
import SocketMessenger from './SocketMessenger';

class CommandParser {

	constructor(socket) {
		this.socket = socket;
		this.commandExecutor = new CommandExecutor(socket);
		this.socketMessenger = new SocketMessenger(socket);
	}

	parse(command) {
		if(command.startsWith("/")) {
			this.parseCommand(command);
			return;
		}

		this.socketMessenger.external(command);
	}

	parseCommand(command) {
		let commandString = command.substr(1);
		let commandParameters = commandString.split(" ");
		command = commandParameters.shift();

		try {
			this.commandExecutor[command](commandParameters);
		} catch(e) {
			this.socketMessenger.internal('command '+command+' not found.');
		}
	}
}

export default CommandParser;
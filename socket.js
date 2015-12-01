var server = require('http').Server();
var io = require('socket.io')(server);
var Redis = require('ioredis');
var redis = new Redis();

var nickList = [];

server.listen(3000);

io.on('connect', function(socket) {

	socket.on('user-connect', function(user) {
		if(isConnected(socket)) {
			socket.emit('message-internal', "already connected");
			return;
		}
		socket.nick = user.nick;
		socket.channel = user.channel;
		nickList.push(user.nick);

		// tell the user they've been connected and 
		// tell what their info is
		socket.emit('user-sync', {
			nick: user.nick,
			channel: user.channel
		});
	});

	socket.on('user-exists', function(nick) {
		if(! isConnected(socket, true)) {
			return;
		}

		var isHere = nickList.indexOf(nick) > -1;
		socket.emit('user-here', {
			nick: nick,
			result: isHere
		});
	});

	socket.on('user-tell', function(message) {
		socket.emit('message-internal', message);
	});

	socket.on('message-send', function(message) {
		if(! isConnected(socket, true)) {
			return;
		}

		io.emit('message-retrieve', message);
	});
});

function isConnected(socket, shouldInform) {
	var isConnected = socket.nick && socket.channel;

	if(shouldInform == true && ! isConnected) {
		socket.emit('message-internal', "not yet connected.");
		socket.emit('message-internal', "/help for more info.");
	}

	return isConnected
}

var http = require('http')
var ecstatic = require('ecstatic');
var fs = require('fs')
var Engine = require('engine.io-stream')

var httpServer = http.createServer(ecstatic({
	root: __dirname
})).listen(8080);

console.log("listening on port 8080");

var browserify = require('browserify')();
browserify.add('./client.js')
browserify.bundle().pipe(fs.createWriteStream(__dirname+'/bundle.js'));

var clients = [];
function broadcast (data, sender) {
	for(var i=0; i < clients.length; i++) {
		clients[i].write(data);
	}
}

var engine = Engine(function (socket) {

	clients.push(socket);

	socket.on('data', function (data) {
		console.log('client says: ', data);
		broadcast(data, socket);
	})

});

engine.attach(httpServer, "/engine");


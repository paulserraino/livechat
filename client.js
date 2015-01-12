var Engine = require('engine.io-stream');
var videoSocket = Engine('/video');
var roomSocket = Engine('/room');
var hat = require('hat');
var VideoChat = require("./lib/videochat");

document.addEventListener("DOMContentLoaded", main, false);

function main() {
	var hash = window.location.hash;
	if (hash === "" || !hash) hash = hat();
	
	//emit hash id to server first
	videoSocket.write(hash);

	var join = document.getElementById("join");

	join.addEventListener("submit", function (evt) {
		evt.preventDefault();

		roomSocket.write(JSON.stringify({
			id: hash,
			username: evt.target.children[0].value
		}));

	}, false);

	roomSocket.on('data', function (data) {
		console.log("room ", data);
	});

	var videochat = VideoChat({socket: videoSocket});
	videochat.start();

}
var Engine = require('engine.io-stream');
var videoSocket = Engine('/video');
var roomSocket = Engine('/room');
var hat = require('hat');
var VideoChat = require("./lib/videochat");
var ChatRoom = require("./lib/ChatRoom")

function main() {
	var hash = window.location.hash;
	if (hash === "" || !hash) hash = hat();
	
	//emit hash id to server first
	videoSocket.write(hash);

	var videochat = VideoChat({socket: videoSocket});
	var chatroom = ChatRoom({socket: roomSocket, hash: hash});
	videochat.start();
	chatroom.start();

}

document.addEventListener("DOMContentLoaded", main, false);

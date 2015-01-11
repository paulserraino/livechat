var Engine = require('engine.io-stream');
var con = Engine('/engine');
var hat = require('hat');

document.addEventListener("DOMContentLoaded", function () {

	var hash = window.location.hash;
	if (hash === "" || !hash) {
		hash = hat();
	}

	var msg = document.getElementById('msg'),
		msgList = document.getElementById('msgList'),
		video = document.getElementById('video');
		

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia; 
	navigator.getUserMedia({video: true, audio: true}, function (videoStream) {
		video.src = window.URL.createObjectURL(videoStream);
	}, function failed(){});

	msg.addEventListener("keyup", function (evt) {
		if (evt.keyCode === 13 && evt.target.value) {
			con.write(JSON.stringify({
				id: hash,
				message: evt.target.value
			}));
			evt.target.value = null;
		}
	}, false)

	con.on('data', function (data) {
		var li = document.createElement('li');
		li.appendChild(document.createTextNode(data));
		msgList.appendChild(li);
	})
});

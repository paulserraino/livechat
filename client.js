var Engine = require('engine.io-stream');
var socket = Engine('/engine');
var hat = require('hat');

document.addEventListener("DOMContentLoaded", main, false);

function main() {

	var hash = window.location.hash;
	if (hash === "" || !hash) {
		hash = hat();
	}

	var msg = document.getElementById('msg'),
		msgList = document.getElementById('msgList'),
		video = document.getElementById('video'),
		videoList = document.getElementById('videoList'),
		canvas = document.getElementById('capture');
		

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia; 
	navigator.getUserMedia({video: true, audio: false/*true*/}, function (videoStream) {
		video.src = window.URL.createObjectURL(videoStream);

	}, function failed(){});


	video.addEventListener('timeupdate', function (e) {
		//hack: convert each frame to image & stream images
		var ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0);

		//Uint8ClampedArray data type
		socket.write(JSON.stringify({
			type: "video",
			data: ctx.getImageData(0, 0, 320, 240)
		}));

	}, false);


	msg.addEventListener("keyup", function (evt) {
		if (evt.keyCode === 13 && evt.target.value) {
			socket.write(JSON.stringify({
				type: "text",
				id: hash,
				message: evt.target.value
			}));
			evt.target.value = null;
		}
	}, false);

	socket.on('data', function (data) {
		var d = data;
		var li = document.createElement('li');

		if (typeof data === "string") d = JSON.parse(d);
		if (d.type === "text") {
			li.appendChild(document.createTextNode(d.message));
			msgList.appendChild(li);
			
		} else if (d.type === "video") {
			console.log('video data ', d)
		}
	});
}

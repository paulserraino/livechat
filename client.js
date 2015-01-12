var Engine = require('engine.io-stream');
var videoStream = Engine('/video');
var roomStream = Engine('/room');
var hat = require('hat');

document.addEventListener("DOMContentLoaded", main, false);

function main() {
	roomStream.write("user has joined");
		
	var hash = window.location.hash;
	if (hash === "" || !hash) {
		hash = hat();
	}

	var video = document.getElementById('video'),
		videoList = document.getElementById('videoList'),
		canvas = document.getElementById('capture'),
		ctx = canvas.getContext('2d');
		

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia; 
	navigator.getUserMedia({video: true, audio: false/*true*/}, function (videoStream) {
		video.src = window.URL.createObjectURL(videoStream);

	}, function failed(){});


	video.addEventListener('timeupdate', function (e) {
		//hack: convert each frame to image & stream images
		ctx.drawImage(video, 0, 0);

		videoStream.write(canvas.toDataURL("image/jpeg"));

	}, false);

	var cv = document.getElementById("hello");
	videoStream.on('data', function (data) {
		var img = new Image();
		img.src = data;

		ctx2 = cv.getContext('2d');
		ctx2.drawImage(img, 0, 0);
	});


}
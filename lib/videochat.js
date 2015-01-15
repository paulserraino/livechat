var utils = require('./utils');

function VideoChat(opts) {
	if (!(this instanceof VideoChat)) return new VideoChat(opts);

	this.video = document.getElementById('video');
	this.videoList = document.getElementById('videoList');
	this.canvas = document.getElementById('capture');
	this.ctx = this.canvas.getContext('2d');

	this.socket = opts.socket || null;
	this.socketTable = {};
};

VideoChat.prototype = {
	start: function () {
		this.rtcStream();
		this.streamVideoData();
		this.updateFeed();
	},
	rtcStream: function () {
		var _this = this;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia; 
		navigator.getUserMedia({video: true, audio: false}, function (videoStream) {
			_this.video.src = window.URL.createObjectURL(videoStream);

		}, function err(){
			console.log("failed to stream video! :(")
		});
	},
	streamVideoData: function () {
		var _this = this;
		video.addEventListener('timeupdate', function (e) {
			//hack: convert each frame to image & stream images
			_this.ctx.drawImage(video, 0, 0);
			_this.socket.write(_this.canvas.toDataURL("image/jpeg"));
		}, false);
	},
	updateFeed: function () {
		var testVid = document.getElementById("test-video");
		var ctx2 = testVid.getContext("2d");
		this.socket.on('data', function (data) {
			data = JSON.parse(data);
			this.socketTable = utils.extends(this.socketTable, data);
			
			for (var k in this.socketTable) {
				var img = new Image();
				img.src = this.socketTable[k];
				ctx2.drawImage(img, 0, 0);
			}
		}.bind(this));
	}
}

module.exports = VideoChat;

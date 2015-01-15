var utils = require('./utils');
var through = require('through2');

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
		this.startVideoFeed();
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
	startVideoFeed: function () {
		this.socket.pipe(through(function (buf, enc, cb) {
			var d = buf.toString();
			d = JSON.parse(d);

			//todo: parse each key in buffer
			console.log(Object.keys(d));
			cb();
		}))
		.on('data', function (vidData) {
			vidData = JSON.parse(vidData);

			var id = Object.keys(vidData)[0];
			if (!(id in this.socketTable)) {
				this.updateSocketTable(id, vidData[id]);
				this.updateVideoList();
				console.log(this.socketTable);
			}

			for (var k in this.socketTable) {
				if (id === k) {
					var img = new Image();
					img.src = vidData[id];
					this.socketTable[id].ctx.drawImage(img, 0, 0);
				}
			}

		}.bind(this));
	},
	updateSocketTable: function (id, socketData) {
		var obj = {};
		var canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d"),
			meta = { canvas: canvas, ctx: ctx, data: socketData };

		obj[id] = meta;
		this.socketTable = utils.extends(this.socketTable, obj);
	},
	updateVideoList: function () {
		this.videoList.innerHtml = "";
		for (var k in this.socketTable) {
			var li = document.createElement("li");
			li.appendChild(this.socketTable[k].canvas);
			this.videoList.appendChild(li);
		}
	}
}

module.exports = VideoChat;

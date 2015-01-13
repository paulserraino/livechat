var hat = require("hat");

function ChatRoom (opts) {
	if(!(this instanceof ChatRoom)) return new ChatRoom(opts);

	this.users = [];
	this.userUl = document.getElementById("userList");
	this.joinRoom = document.getElementById("join");
	this.socket = opts.socket || null;
	this.hash = opts.hash || hat();
}

ChatRoom.prototype = {
	start: function () {
		this.join();
		this.feed();
	},
	join: function () {
		this.joinRoom.addEventListener("submit", function (evt) {
			evt.preventDefault();
			this.socket.write(JSON.stringify({
				id: this.hash,
				username: evt.target.children[0].value
			}));
		}.bind(this), false);
	},
	feed: function () {
		this.socket.on('data', function (data) {
			console.log("room ", data);
			var li = document.createElement("li");
			this.userUl.appendChild(document.createTextNode(data));
			this.users.push(data);
		}.bind(this));
	},
	numberOfUsers: function () {
		return this.users.length;
	}
}

module.exports = ChatRoom;

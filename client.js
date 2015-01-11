var Engine = require('engine.io-stream');
var con = Engine('/engine');

document.addEventListener("DOMContentLoaded", function () {

	var msg = document.getElementById('msg');
	var msgList = document.getElementById('msgList');

	msg.addEventListener("keyup", function (evt) {
		if (evt.keyCode === 13 && evt.target.value) {
			con.write(evt.target.value)
			evt.target.value = null;
		}
	}, false)

	con.on('data', function (data) {
		var li = document.createElement('li');
		li.appendChild(document.createTextNode(data));
		msgList.appendChild(li);
	})
});

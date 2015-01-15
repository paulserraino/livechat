module.exports = {
	extends: function (obj) {
		if (typeof obj !== "object") return obj;
		var arr = Array.prototype.slice.call(arguments, 1);
		arr.forEach(function (arg) {
			for (var k in arg) {
				obj[k] = arg[k];
			}
		});
		
		return obj;
	}
};
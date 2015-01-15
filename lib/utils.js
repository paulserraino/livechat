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
	},
	size: function (obj) {
		var k, c = 0;
		for (k in obj) { c+= 1; }
		return c;
	}
};
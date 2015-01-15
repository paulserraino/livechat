module.exports = {
	extends: function (obj) {
		var arr = Array.prototype.slice.call(arguments, 1);
		if (Object.keys(obj).length === 0) {
			arr.forEach(function (arg) {
				for (var j in arg) {
					obj[j] = arg[j]
				}
			});
		} else {
			arr.forEach(function (arg) {
				for (var k in obj) {
					for (var j in arg) {
						obj[j] = arg[j];
					}
				}
			});
		}
		return obj;
	}
};
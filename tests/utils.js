var utils = require("../lib/utils")
var test = require('tape')

test("extends", function (t) {
	var obj = {a: 1, b: 2};
	obj = utils.extends(obj, {b: 3, c: 6})
	t.deepEqual(obj, {a:1, b:3, c: 6}, "should extend")
	t.end();
});

test("extends empty objects", function (t) {
	var obj = {};
	obj = utils.extends(obj, {c: 7});
	t.deepEqual(obj, {c: 7}, "should not be empty")
	t.end();
})

test("size", function (t) {
	var obj = {a: 1, b:3, c: 5};
	t.equal(utils.size(obj), 3, "sould equal 3");
	t.end();
})

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var path = require("path");
module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	return [
		"var refs = 0;",
		"var dispose;",
		"exports.use = exports.ref = function() {",
		"	if(!(refs++)) {",
		"		dispose = require(" + JSON.stringify("!" + path.join(__dirname, "addStyle.js")) + ")(require(" + JSON.stringify("!!" + remainingRequest) + "));",
		"	}",
		"	return exports",
		"};",
		"exports.unuse = exports.unref = function() {",
		"	if(!(--refs)) {",
		"		dispose();",
		"		dispose = null;",
		"	}",
		"};",
		"if(module.hot) {",
		"	refs = module.hot.data && module.hot.data.refs || 0;",
		"	if(refs) {",
		"		refs--;",
		"		exports.ref();",
		"	}",
		"	module.hot.accept();",
		"	module.hot.dispose(function(data) {",
		"		data.refs = refs;",
		"		if(dispose) {",
		"			dispose();",
		"		}",
		"	});",
		"}",
	].join("\n");
};

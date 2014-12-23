var React = require('react');
var Index = require('./../blocks/app/index');

function Document() {

};

Document.prototype.render = function(options) {
	var html = '<!DOCTYPE html>' + React.renderToString(<Index data={options.data} />);

	return html;
};

module.exports = Document;
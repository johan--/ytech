var React = require('react');
var Index = require('./app/index.jsx');

var data = JSON.parse(document.getElementById("initial-data").innerHTML);

React.render(
	<Index data={data} />,
	document
);
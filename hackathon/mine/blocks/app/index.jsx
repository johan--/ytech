var React = require('react');
var Weather = require('./weather.jsx');

module.exports = React.createClass({
	render: function() {
		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<link type="text/css" rel="stylesheet" href="/css/index.css" />
				</head>
				<body>
					<Weather data={this.props.data} />
					<script type="application/json" id="initial-data" dangerouslySetInnerHTML={{__html: JSON.stringify(this.props.data)}}></script>
					<script src="/js/weather/index.js"></script>
				</body>
			</html>
		)
	}
});
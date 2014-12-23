var React = require('react');
var Router = require('./../app/browser/router.js');
var WeatherTouch = require('./../app/bundles/weather-touch.jsx');
var Popup = require('./../app/blocks/popup/popup.jsx');

React.initializeTouchEvents(true);

module.exports = React.createClass({
	touchHandler: function (e) {
		this.props.dispatcher.triggerHandler({
			type: 'popup.close'
		});
	},

	render: function() {
		return (
			<html onTouchStart={this.touchHandler}>
				<head>
					<meta charSet="utf-8" />
        			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

					<link type="text/css" rel="stylesheet" href="/index.css" />
				</head>
				<body>
					<Router
						history={this.props.history}
						window={this.props.window}
						dispatcher={this.props.dispatcher}
						uri={this.props.data.uri}
						tabs={this.props.data.tabs}
						content={WeatherTouch} />

					<Popup dispatcher={this.props.dispatcher} />

					<script src="//yastatic.net/jquery/2.1.1/jquery.min.js"></script>
					<script type="application/json" id="initial-data" dangerouslySetInnerHTML={{__html: JSON.stringify(this.props.data)}}></script>
					<script src="//cdnjs.cloudflare.com/ajax/libs/react/0.12.1/react.min.js"></script>
					<script src="/js/vendor/history/history.js"></script>
					<script src="/bundle.js"></script>
				</body>
			</html>
		)
	}
});

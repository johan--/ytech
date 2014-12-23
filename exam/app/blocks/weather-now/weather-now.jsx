var React = require('react');

var Info = require('./../info/info.jsx');
var Forecast = require('./../forecast/forecast.jsx');

module.exports = React.createClass({
	addMods: function (classes, mods) {
		mods.forEach(function (item) {
			classes.push(classes[0] + '_' + item);
		}, this);
	},

	weatherNow: function (data) {
		var WeatherNow = require('./../weather-now/weather-now.jsx');

		return (
			<div className="weather-item__weather-now">
				<WeatherNow data={data} />
			</div>
		);
	},

	render: function () {
		return (
			<div className={'weather-now ' + this.props.data.weatherClass}>
				<div className="weather-now__top">
					<div className="weather-now__temp">
						{this.props.data.temp}
					</div>
					<div className="weather-now__info">
						<Info data={this.props.data.top.info} />
					</div>
				</div>
				<div className="weather-now__bottom">
					<div className="weather-now__forecast">
						<Forecast data={this.props.data.bottom.forecast} />
					</div>
				</div>
			</div>
		);
	}
});

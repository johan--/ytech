var React = require('react');

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

	forecast: function (data, mods) {
		var Forecast = require('./../forecast/forecast.jsx');

		return (
			<div className="weather-item__forecast">
				<Forecast data={data} mods={mods} />
			</div>
		);
	},

	render: function () {
		var items = this.props.data.map(function (item, index) {

			var titleClasses = ['weather-item__title'];

			this.addMods(titleClasses, item.title.mods);

			return (
				<div className="weather-item" key={index}>
					<h1 className={titleClasses.join(' ')}>{item.title.text}</h1>

					{item.weatherNow ? this.weatherNow(item.weatherNow) : undefined}

					{this.forecast(item.forecast, item.mods)}
				</div>
			);
		}, this);

		var classes = ['weather'];

		this.addMods(classes, this.props.mods);

		return (
			<div className={classes.join(' ')}>
				{items}
			</div>
		);
	}
});

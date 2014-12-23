var React = require('react');
var WeatherShotRows = require('./weather-short-rows/weather-short-rows.jsx');

module.exports = React.createClass({
	_currentMonth: null,

	formatData: function(data, blockName) {
		var items = [];

		data.slice(1).forEach(function(item, index) {
			var date = this.props.helpers.parseDate(item.date);
			var cell = {};

			this._currentMonth = date.month;

			cell[blockName] = this[blockName + 'Template'](item, index, date);

			items.push(cell);

			if (date.day === 'вс' && index !== data.lenght - 1) {
				items.push({gap: null});
			}
		}, this);

		return items;
	},


	dateTemplate: function(data, index, date) {
        var dayname = 'завтра';
        var datename = date.date;

        if (index > 0) dayname = date.day;

        if (index === 0 || this._currentMonth !== date.month) {
            datename += ' ' + date.month;
            this._currentMonth = date.month;
        }

		return {
			dayname: dayname,
			datename: datename
		};
	},

	dayTemplate: function(data) {
		var data = data.parts[4];

		return {
			weatherClass: this.props.helpers.getWeatherClass(data.temp),
			weather_icon: data.weather_icon,
			weather: data.weather,
			temp: data.temp
		};
	},

	nightTemplate: function(data) {
		var data = data.parts[5];

		return {
			weatherClass: this.props.helpers.getWeatherClass(data.temp),
			temp: data.temp
		};
	},

	render: function() {
		var classes = ['content__weather-short'];

		if (!this.props.isActive) classes.push('weather-short_hidden');

		return (
	        <div className={classes.join(' ')}>
	            <table className="weather-short">
	                <thead>
	                    <WeatherShotRows data={this.formatData(this.props.data, 'date')} />
	                </thead>
	                <tbody>
	                	<WeatherShotRows data={this.formatData(this.props.data, 'day')} />
	                	<WeatherShotRows data={this.formatData(this.props.data, 'night')} />
	                </tbody>
	            </table>
	        </div>
		)
	}
});
var React = require('react');
var TableDetailRows = require('./table-detail-rows/table-detail-rows.jsx');

module.exports = React.createClass({
	formatData: function(data, blockName) {
		var items = [];

		this.props.actualTimesOfDay.forEach(function(item, index) {
			var cell = {};
			var current = item;

			if (index === 0) current = 'now';

			cell[blockName] = this[blockName + 'Template'](data, current, index);

			items.push(cell);

			if (index === this.props.actualTimesOfDay.length - 1 && blockName === 'temp') {
				items.push({'info': this.infoTemplate(data, item, index)});
			}
		}, this);

		return items;
	},

	headTemplate: function(data, item, index) {
		var classes = '';

		if (index === 0) {
			classes = 'table-detail__th_now';
		};

		return {
			title: item,
			classes: classes
		};
	},

	tempTemplate: function(data, item, index) {
		var classes = ['vertical-align-bottom'];
		var temp = this.getPropByTimeOfDay(data, item, 'temp');

		if (index === 0) classes.push('table-detail__temp_now');

		classes.push(this.props.helpers.getWeatherClass(temp));

		return {
			classes: classes.join(' '),
			temp: this.props.helpers.weatherToStringWithDimension(temp)
		};
	},

	weatherTemplate: function(data, item, index) {
		var classes = [];
		var temp = this.getPropByTimeOfDay(data, item, 'temp');
		var weather_icon = this.getPropByTimeOfDay(data, item, 'weather_icon');
		var weather = '';
		var size = 30;

		if (index === 0) {
			classes.push('table-detail__w-info');
			weather = this.getPropByTimeOfDay(data, item, 'weather');
			size = 48;
		};

		classes.push(this.props.helpers.getWeatherClass(temp));

		return {
			classes: classes.join(' '),
			weather_icon: weather_icon,
			weather: weather,
			size: size
		};
	},

	infoTemplate: function(data) {
		var wind = data.fact.wind.toLowerCase() + ', ' +
			this.props.helpers.windSpeedWithDimension(data.fact.wind_speed) +
			' (' + this.props.helpers.windSpeedWithDimension(data.fact.wind_speed, true) + ')';

		return {
			pressure: this.props.helpers.pressureWithDimension(data.fact.pressure),
			wind: wind,
			humidity: this.props.helpers.humidityWithDimension(data.fact.humidity),
			sunrise: data.forecast[0].sunrise,
			sunset: data.forecast[0].sunset
		};
	},

	getPropByTimeOfDay: function(data, timeOfDay, propName) {
		var map = {
			now: data.fact[propName],
			morning: data.forecast[0].parts[0][propName],
			day: data.forecast[0].parts[1][propName],
			evening: data.forecast[0].parts[2][propName],
			night: data.forecast[0].parts[3][propName],
			yesterday: data.yesterday[propName]
		};

		return map[timeOfDay];
	},

	render: function() {
		var yesterdayTemp = this.getPropByTimeOfDay(this.props.data, 'yesterday', 'temp');

	    return (
    		<table className="weather-detail__table-detail">
	          <TableDetailRows data={this.formatData(this.props.data, 'head')}
	          	className="table-detail__th" />
	          <TableDetailRows data={this.formatData(this.props.data, 'temp')}
	          	className="table-detail__temp" />
	          <TableDetailRows data={this.formatData(this.props.data, 'weather')}
	          	className="table-detail__tr_top" />
	          <tr>
	            <td colSpan="5" className="table-detail__yesterday">
	            	вчера {this.props.helpers.weatherToStringWithDimension(yesterdayTemp)}
	            </td>
	          </tr>
	        </table>
		);
	}
});
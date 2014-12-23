var React = require('react');
var CityList = require('./../city-list/city-list.jsx');
var TableDetail = require('./../table-detail/table-detail.jsx');

module.exports = React.createClass({
	formatData: function(data, blockName) {
		var items = [];

		this.props.actualTimesOfDay.forEach(function(item, index) {
			var cell = {};

			if (index === 0) item = 'now';

			cell[blockName] = this[blockName + 'Template'](item, index, data);

			items.push(cell);
		}, this);

		return items;
	},

	headTemplate: function(item, index) {
		var classes = '';

		if (index === 0) {
			classes = 'table-detail__th_now';
		};

		return {
			title: item,
			classes: classes
		};
	},

	tempTemplate: function(item, index, data) {
		var classes = ['vertical-align-bottom'];
		var temp = this.getPropByTimeOfDay(data, item, 'temp');

		if (index === 0) classes.push('table-detail__temp_now');

		classes.push(this.props.helpers.getWeatherClass(temp));

		return {
			classes: classes.join(' '),
			temp: this.props.helpers.weatherToStringWithDimension(temp)
		};
	},

	weatherTemplate: function(item, index, data) {
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

	getPropByTimeOfDay: function(data, timeOfDay, propName) {
		var map = {
			now: data.fact[propName],
			morning: data.forecast[0].parts[0][propName],
			day: data.forecast[0].parts[1][propName],
			evening: data.forecast[0].parts[2][propName],
			night: data.forecast[0].parts[3][propName]
		};

		return map[timeOfDay];
	},

	render: function() {
	    return (
		    <div className="weather-detail">
		      <div className="weather-detail__select-city">
		        <h2 className="select-city__h2">{this.props.data.info.name}</h2>
		        
		        <CityList />

		        <TableDetail data={this.props.data}
		        	actualTimesOfDay={this.props.actualTimesOfDay}
		        	helpers={this.props.helpers} />

		      </div>
		      <div className="weather-detail__rotater"><img src="rotator.jpg" /></div>
		    </div>
		);
	}
});
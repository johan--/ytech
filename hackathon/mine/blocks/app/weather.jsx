var React = require('react');
var _ = require('lodash');

var Blocks = {
	header: require('./../header/header.jsx'),
	weatherDetail: require('./../weather-detail/weather-detail.jsx'),
	content: require('./../content/content.jsx'),
	resources: require('./../resources/resources.jsx'),
	footer: require('./../footer/footer.jsx')
};

var styles = {
	direct: {
		height: '153px',
		lineHeight: '153px',
		textAlign: 'center',
		background: '#f6f5f3',
		marginTop: '40px'
	}
}

module.exports = React.createClass({
	getInitialState: function() {
		return {
			data: this.props.data,
			actualTimesOfDay: this.helpers.getActualTimesOfDay()
		};
	},

    helpers: {
		getWeatherClass: function(temp) {
	        return 'weather' + (temp + temp % 2);
	    },

	    weatherToString: function(temp) {
	        return (temp > 0 ? '+' : '') + temp;
	    },

	    weatherToStringWithDimension: function(temp) {
	    	return this.weatherToString(temp) + ' °C';
	    },

	    pressureWithDimension: function(pressure) {
	    	return pressure + ' мм рт. ст.';
	    },

	    windSpeedWithDimension: function(windSpeed, kmPerHour) {
	    	return kmPerHour ? (windSpeed * 1e-3 * 3.6e3).toFixed(1) + ' км/ч' : windSpeed + ' м/с';
	    },

	    humidityWithDimension: function(humidity) {
	    	return humidity + '%';
	    },

		parseDate: function(date) {
			var date = new Date(date);

			return {
				date: date.getDate(),
				day: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][date.getDay()],
				month: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
				'августа', 'сентября', 'октярбря', 'ноября', 'декабря'][date.getMonth()]
			};
		},

		getActualTimesOfDay: function() {
			var timesOfDay = {
				morning: [6, 11],
				day: [12, 17],
				evening: [18, 23],
				night: [0, 5]
			};
			var hour = new Date().getHours();
			var result = [];

			_.forOwn(timesOfDay, function(range, key) {
				if (hour >= range[0] && hour <= range[1]) {
					result.push(key);
				} else if (result.length > 0) {
					result.push(key);
				}
			});

			return result;
		}
    },

	componentDidMount: function() {
		var self = this;

		// this.props.conn.emit('subscribe', 54);

		// this.props.conn.on('data', function(data) {
		// 	self.setState({data: data});
		// });

		var data = this.props.data;
		data.info.name = "Екб";

		setTimeout(function() {
			self.setState({data: data});
		}, 3000);
	},

	render: function() {
		return (
			<div className="App">
				<Blocks.header />
				<Blocks.weatherDetail
					data={this.props.data}
					actualTimesOfDay={this.state.actualTimesOfDay}
					helpers={this.helpers} />
				<Blocks.content data={this.props.data} type={'full'} helpers={this.helpers} />
				<section style={styles.direct}>Здесь будет находиться Директ.</section>
				<Blocks.resources />
				<div className="footer-spacer"></div>
				<Blocks.footer />
			</div>
		)
	}
});
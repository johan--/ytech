var React = require('react');

var Info = require('./../info/info.jsx');

module.exports = React.createClass({
	addMods: function (classes, mods) {
		mods.forEach(function (item) {
			classes.push(classes[0] + '_' + item);
		}, this);
	},

	info: function (data) {
		return (
			<div className="forecast__info">
				<Info data={data} />
			</div>
		);
	},

	now: function (data) {
		return (
			<div className="forecast-item">
				<div className="forecast__left forecast__left_now">
					<div className="forecast__icon">
						<img
							width={data.size}
							height={data.size}
							src={'http://ekb.shri14.ru/icons/' + data.weather_icon + '.svg'}
							alt={data.weather} />
					</div>
				</div>
				<div className="forecast__right">
					<div className="forecast__weather forecast__weather_now">
						{data.weather}
					</div>
					{data.info ? this.info(data.info) : undefined}
				</div>
			</div>
		)
	},

	temp: function (data) {
		if (data.temp_max) {
			return (
				<div className="forecast__temp">
					<span className="forecast__temp-value">{data.temp_min}</span>
					<span className="forecast__temp-value">{data.temp_max}</span>
				</div>
			);
		} else {
			return (
				<div className="forecast__temp">
					<span className="forecast__temp-value">{data.temp}</span>
				</div>
			);
		};
	},

	weather: function (data) {
		return (
			<div className="forecast__weather">
				{data}
			</div>
		);
	},

	times: function (data) {
		return data.map(function (item, index) {
			return (
				<div className={'forecast-item ' + item.weatherClass} key={index}>
					<div className="forecast__left">
						<div className="forecast__title">
							{item.title}
						</div>
					</div>
					<div className="forecast__right">
						<div className="forecast__top">
							<div className="forecast__icon">
								<img
									width={item.size}
									height={item.size}
									src={'http://ekb.shri14.ru/icons/' + item.weather_icon + '.svg'}
									alt={item.weather} />
							</div>
							{this.temp(item)}
						</div>
						<div className="forecast__bottom">
							{item.weather ? this.weather(item.weather) : undefined}
							{item.info ? this.info(item.info) : undefined}
						</div>
					</div>
				</div>
			);
		}, this);
	},

	render: function () {
		var data = this.props.data;

		var classes = ['forecast'];

		if (this.props.mods) {
			this.addMods(classes, this.props.mods);
		};

		return (
			<div className={classes.join(' ')}>
				{data.length ? this.times(data) : this.now(data)}
			</div>
		);
	}
});

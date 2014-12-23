var helpers = require('./../../../lib/helpers.js');

var methods = {
	short: function (data, methodName) {
		return [
			'Ветер: ' + helpers.windSpeedWithDimension(data.wind_speed),
			'Влажность: ' + helpers.humidityWithDimension(data.humidity),
			'Давление: ' + helpers.pressureWithDimension(data.pressure)
		];
	},

	fullLastUpdate: function (data, methodName) {
		return [
			data
		];
	},

	full: function (data, methodName) {		
		return [
			'Ветер: {' + data.wind_direction + '} ' + data.wind +
				', ' + helpers.windSpeedWithDimension(data.wind_speed),
			'Влажность: ' + helpers.humidityWithDimension(data.humidity),
			'Давление: ' + helpers.pressureWithDimension(data.pressure)
		];
	},

	fullNow: function (data, methodName) {
		var fact = data.fact;
		var now = data.forecast[0];

		return [
			'Ветер: {' + fact.wind_direction + '} ' + fact.wind +
				', ' + helpers.windSpeedWithDimension(fact.wind_speed),
			'Влажность: ' + helpers.humidityWithDimension(fact.humidity),
			'Давление: ' + helpers.pressureWithDimension(fact.pressure),
			'Восход: ' + now.sunrise + '\u00A0\u00A0\u00A0' + 'Закат: ' + now.sunset
		];
	}
};

module.exports = function (data, methodName) {
	if (methods[methodName]) {
		return methods[methodName].apply(null, arguments);
	};
};

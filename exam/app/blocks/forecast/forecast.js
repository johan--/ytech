var helpers = require('./../../../lib/helpers.js');
var times = require('./../../../lib/constants/times.js');
var info = require('./../info/info.js');

var methods = {
	short: function (data, methodName) {
		var blocks = [];

		for (var i = 0; i < data.length - 2; i++) {
			blocks.push({
				title: times[i].alias,
				size: 40,
				weather_icon: data[i].weather_icon,
				temp_min: data[i].temp_min ? helpers.weather(data[i].temp_min) : undefined,
				temp_max: data[i].temp_max ? helpers.weather(data[i].temp_max) : undefined,
				temp: helpers.weather(data[i].temp),
				weatherClass: helpers.weatherClass(data[i].temp)
			});
		};

		return blocks;
	},

	full: function (data, methodName) {
		var blocks = [];

		for (var i = 0; i < data.length - 2; i++) {
			blocks.push({
				title: times[i].alias,
				size: 40,
				weather_icon: data[i].weather_icon,
				weather: data[i].weather,
				temp_min: data[i].temp_min ? helpers.weather(data[i].temp_min) : undefined,
				temp_max: data[i].temp_max ? helpers.weather(data[i].temp_max) : undefined,
				temp: helpers.weather(data[i].temp),
				weatherClass: helpers.weatherClass(data[i].temp),
				info: info(data[i], methodName)
			});
		};

		return blocks;
	},

	shortNow: function (data, methodName) {
		return {
			size: 60,
			weather_icon: data.weather_icon,
			weather: data.weather
		};
	},

	fullNow: function (data, methodName) {
		return {
			size: 60,
			weather_icon: data.fact.weather_icon,
			weather: data.fact.weather,
			info: info(data, methodName)
		}
	},

	climate: function () {
		return {

		}
	}
};

module.exports = function (data, methodName) {
	if (methods[methodName]) {
		return methods[methodName].apply(null, arguments);
	};
};

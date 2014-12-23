var days = require('./constants/days.js');
var months = require('./constants/months.js');

helpers = {
	weatherClass: function(temp) {
        return 'weather' + (temp + temp % 2);
    },

    weather: function(temp) {
        return (temp > 0 ? '+' : '') + temp;
    },

    weatherWithDimension: function(temp) {
    	return this.weather(temp) + '°C';
    },

    pressureWithDimension: function(pressure) {
    	return pressure + ' мм рт. ст.';
    },

    windSpeedWithDimension: function(windSpeed, kmPerHour) {
    	return kmPerHour
            ? (windSpeed * 1e-3 * 3.6e3).toFixed(1) + ' км/ч'
            : windSpeed + ' м/с';
    },

    humidityWithDimension: function(humidity) {
    	return humidity + '%';
    },

	parseDate: function(date) {
		var date = new Date(date);

		return {
			date: date.getDate(),
			day: days[date.getDay()],
			month: months[date.getMonth()]
		};
	}
};

module.exports = helpers;

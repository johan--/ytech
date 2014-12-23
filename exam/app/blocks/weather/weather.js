var weatherNow = require('./../weather-now/weather-now.js');
var forecast = require('./../forecast/forecast.js');
var helpers = require('./../../../lib/helpers.js');

function getTitle (data, index) {
    var date = helpers.parseDate(data.date);
    var mods = [];

    var text = date.date + ' ' + date.month + ', ' + date.day.full;

    if (date.day.id === 0 || date.day.id === 6) {
        mods.push('holidays');
    };

    if (index === 0) {
        text = 'Сегодня, ' + date.date + ' ' + date.month;
    } else if (index === 1) {
        text = 'Завтра, ' + date.date + ' ' + date.month;
    };

    return {
        text: text,
        mods: mods
    };
};

var methods = {
    short: function (data, methodName) {
        var blocks = [];

        for (var i = 0; i < data.forecast.length; i++) {
            if (i > 0) {
                blocks.push({
                    title: getTitle(data.forecast[i], i),
                    forecast: forecast(data.forecast[i].parts, methodName)
                });
            } else {
                blocks.push({
                    title: getTitle(data.forecast[i], i),
                    weatherNow: weatherNow(data.fact, methodName),
                    forecast: forecast(data.forecast[i].parts, methodName),
                    mods: ['now']
                });
            };
        };

        return blocks;
    },

    full: function (data, methodName) {
        var blocks = [];

        for (var i = 0; i < data.forecast.length; i++) {
            if (i > 0) {
                blocks.push({
                    title: getTitle(data.forecast[i], i),
                    forecast: forecast(data.forecast[i].parts, methodName)
                });
            } else {
                blocks.push({
                    title: getTitle(data.forecast[i], i),
                    weatherNow: weatherNow(data, methodName),
                    forecast: forecast(data.forecast[i].parts, methodName),
                    mods: ['now']
                });
            }
        };

        return blocks;
    },

    climate: function () {
        return [];
    }
};

module.exports = function (data, methodName) {  
    if (methods[methodName]) {
        return methods[methodName].apply(null, arguments);
    };
};

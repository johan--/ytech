var helpers = require('./../../../lib/helpers.js');
var info = require('./../info/info.js');
var forecast = require('./../forecast/forecast.js');

var methods = {
    short: function (data, methodName) {
        return {
            temp: helpers.weatherWithDimension(data.temp),

            weatherClass: helpers.weatherClass(data.temp),

            top: {
                info: info(data, methodName)
            },

            bottom: {
                forecast: forecast(data, methodName + 'Now')
            }
        }
    },

    full: function (data, methodName) {
        return {
            temp: helpers.weatherWithDimension(data.fact.temp),

            weatherClass: helpers.weatherClass(data.fact.temp),
            
            top: {
                info: info('2 часа назад', 'fullLastUpdate')
            },

            bottom: {
                forecast: forecast(data, methodName + 'Now')
            }
        }
    }
};

module.exports = function (data, methodName) {
    if (methods[methodName]) {
        return methods[methodName].apply(null, arguments);
    };
};

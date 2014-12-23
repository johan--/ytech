var typelist = require('./../../../lib/constants/typelist.js');
var weather = require('./../weather/weather.js');

var tabs = function (data) {
    return typelist.map(function (item) {
        item['data'] = weather(data, item.name);

        return item;
    });
};

module.exports = tabs;

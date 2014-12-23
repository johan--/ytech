/**
 * see for details: http://ekb.shri14.ru/api
 */

var request = require('request');
var Q = require('q');
var xml2js = require('xml2js');

function API(options) {

};

API.prototype.get = function(options) {
	var dfd = Q.defer();

	request(options, function(err, res, body) {
		err ? dfd.reject(err) : dfd.resolve(body);
	});

	return dfd.promise;
};

API.prototype.parseXML = function(xml) {
	var dfd = Q.defer();

	xml2js.parseString(xml, function (err, res) {
	    err ? dfd.reject(err) : dfd.resolve(res);
	});

	return dfd.promise;
};

API.prototype.getCoords = function() {
	return this.get({url: 'http://export.yandex.ru/bar/reginfo.xml'})
		.then(this.parseXML.bind(this))
		.then(function(data) {
			var info = data.info.region[0].$;

			return info.lon + ',' + info.lat;
		});
};

API.prototype.getWeather = function(path) {
	return this.get({url: 'http://ekb.shri14.ru/api/' + path});
};

API.prototype.getGeocode = function(coords) {
	return this.getWeather('geocode?coords=' + coords);
};

API.prototype.getWeatherLocal = function(geoID) {
	return this.getWeather('localities/' + geoID);
};

API.prototype.getCities = function(geoID) {
	return this.getWeather('localities/' + geoID + '/cities');
};

API.prototype.getProvinces = function(geoID) {
	return this.getWeather('localities/' + geoID + '/provinces');
};

API.prototype.getWeatherFactual = function(ids) {
	return this.getWeather('factual?ids=' + ids.join(','));
};

module.exports = API;
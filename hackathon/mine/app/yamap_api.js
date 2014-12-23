/**
 * see for details: https://tech.yandex.ru/maps/doc/geocoder/desc/concepts/About-docpage/
 */

var request = require('request');
var _ = require('lodash');
var qString = require('querystring');
var Q = require('q');

function API(options) {
	this.url = 'http://geocode-maps.yandex.ru/1.x/?';

	this.defaults = {
		format: 'json',
		results: 1,
		lang: 'en_US',
		kind: 'locality',
		geocode: ''
	};
};

API.prototype.get = function(param) {
	var self = this;
	var dfd = Q.defer();
	var options = _.clone(this.defaults);
	var url = '';

	options.geocode = param;
	url = this.url + qString.stringify(options);

	request(url, function(err, res, body) {
		var body = JSON.parse(body);

		if (err) dfd.reject(err)
		else if (body.error) dfd.reject(new Error(body.error.status, body.error.message))
		else if (!self.isFound(body)) dfd.reject(new Error('No data.'))
		else if (!self.isLocality(body)) dfd.reject('');

		dfd.resolve(body);
	});

	return dfd.promise;
};

API.prototype.isFound = function(data) {
	var found = data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found;
	return new Boolean(parseInt(found, 10));
};

API.prototype.isLocality = function(data) {
	var kind = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.kind;
	if (kind === 'locality') {
		return true;
	} else {
		return false;
	};
};

API.prototype.parse = function(data) {
	return data.response.GeoObjectCollection.featureMember[0].GeoObject;
};

API.prototype.parseCoords = function(data) {
	console.log(this.parse(data));
	return this.parse(data).Point.pos.split(' ').join(',');
};

API.prototype.parseName = function(data) {
	return this.parse(data).name;
};

API.prototype.getCityName = function(param) {
	return this.get(param)
		.then(this.parseName.bind(this));
};

API.prototype.getCityCoords = function(param) {
	return this.get(param)
		.then(this.parseCoords.bind(this));
};

module.exports = API;
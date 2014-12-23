var WeatherAPI = require('./weather_api');
var YamapAPI = require('./yamap_api');
var Document = require('./document');
var res = require('./../test/response');

/**
 * Класс App.
 * Реализует взаимодействие 2х API в контексте конкретной задачи
 */

/** Конструктор */
function App(options) {
	this.weatherAPI = new WeatherAPI();
	this.yamapAPI = new YamapAPI();
	this.document = new Document();

	this.geocode = {};
};

/**
 * Позволяет определить текущий город.
 */
App.prototype.getCurrentCity = function() {
	/**
	 * Дальше просто читаем название методов и понимаем что происходит.
	 *
	 * Получить координаты с помощью weatherAPI
	 */
 	return this.weatherAPI.getCoords()
 		/** Затем получить geocode с помощью weatherAPI */
 		.then(this.weatherAPI.getGeocode.bind(this.weatherAPI))
 		/** Затем */
 		.then(function(geocode) {
 			/** Распарсить json формат в обычный объект и сохранить в поле geocode. */
 			this.geocode = JSON.parse(geocode);
 			/** Вернуть имя города */
 			return this.geocode.name;
 		}.bind(this))
 		/**
 		 * Из операции выше возвращается имя на русском.
 		 * Его, конечно, можно транслитерировать. Т.е. Москва -> Moskva
 		 * Но я хочу красивое английское (Moscow), поэтому...
 		 *
 		 * Затем достаём красивое английское название с помощью yamapAPI
 		 */
 		.then(this.yamapAPI.getCityName.bind(this.yamapAPI))
 		/** Затем сохраняем имя в поле */
 		.then(function(name) {
 			this.geocode['nameEng'] = name;
 			return name;
 		}.bind(this));

 		/**
 		 * Эта вся цепочка возвращается этим методом, чтобы её можно было продолжить
 		 * или завершить, в зависимости от задачи.
 		 */
};

/**
 * Позволяет получить погоду по конкретному названию города.
 * 
 * Название города (city) - обязательный параметр, так что надо сделать
 * самый первый промис, где это проверяется.
 * А заодно можно и сделать проверку на правильность данных,
 * т.к. название города может содержать только латинский алфавит и дефис.
 */

App.prototype.getWeather = function(city) {
	/**
	 * Вычислить координаты города по названию с помощью yamapAPI
	 */
	return this.yamapAPI.getCityCoords(city)
		/**
		 * Затем достать geocode с помощью weatherAPI
		 */
		.then(this.weatherAPI.getGeocode.bind(this.weatherAPI))
		/** Затем */
		.then(function(geocode) {
			/** Конвертируем в объект js и возвращаем интересующее нас поле */
			return JSON.parse(geocode).geoid;
		})
		/**
		 * Операции выше можно пропустить, если город пользователя уже был определён
		 * и названия совпадают.
		 *
		 * затем достать погоду для конкретного города с помощью weatherAPI
		 */
		.then(this.weatherAPI.getWeatherLocal.bind(this.weatherAPI));
};

App.prototype.render = function() {
	return this.document.render({
		data: res
	});
};

module.exports = App;
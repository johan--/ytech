var express = require('express');
var router = express.Router();
var App = require('./../app/app');

/** Какое-то приложение. */
var app = new App();

/** Ручка 1. */
router.get('/', function(req, res, next) {
	/** Дай сюда текущее название города. */
	app.getCurrentCity()
		/** Когда название будет получено... */
		.then(function(city) {
			/** Перенаправить на 2ю ручку. */
			res.redirect('/' + city.toLowerCase());
		})
		/**
		 * Обработчик ошибок.
		 * Позже посмотрим, что всё написано с помощью q,
		 * и этот catch позволит отловить ошибки на всех стадиях.
		 */
		.catch(function(err) {
			err === '' ? next() : next(err);
		})
		.done();
});

/** Ручка 2. */
router.get('/:geoid', function(req, res, next) {
	/**
	 * Дай сюда погоду для конкретного города.
	 *
	 * Всё, что написано в адресной строке после '/'
	 * попадёт в req.params.geoid.
	 */
	// app.getWeather(req.params.geoid)
	// 	/** Когда погода будет получена, отправить её клиенту. */
	// 	.then(function(data) {
	// 		res.send(data);
	// 	})
	// 	/**
	// 	 * Обработчик ошибок.
	// 	 */
	// 	.catch(function(err) {
	// 		err === '' ? next() : next(err);
	// 	})
	// 	.done();
	res.send(app.render());
});

module.exports = router;

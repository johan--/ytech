var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<footer className="footer">
				<div className="footer__wrapper">
					<div className="footer__col_1">
						<div className="footer__block"><a className="link footer__link" href="#">Пользовательское соглашение</a></div>
						<div className="footer__block"><a className="link footer__link" href="#">Мобильная версия</a></div>
					</div>
					<div className="footer__col_2">
						<div className="footer__block">Прогноз погоды: Екатеринбург и еще 12268 городов в 229 странах</div>
						<div className="footer__block">Данные предоставлены <a className="link footer__link" href="#">FORECA</a></div>
					</div>
					<div className="footer__col_3">
						<div className="footer__block"><a className="link footer__link" href="#">Статистика</a></div>
						<div className="footer__block"><a className="link footer__link" href="#">Обратная связь</a></div>
						<div className="footer__block"><a className="link footer__link" href="#">Реклама</a></div>
					</div>
					<div className="footer__col_4">
						<div className="footer__block">&copy; 2000-2014 &laquo;<a className="link footer__link" href="#">Яндекс</a>&raquo;</div>
					</div>
				</div>
			</footer>
		)
	}
});
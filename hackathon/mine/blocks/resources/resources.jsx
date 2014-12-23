var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<section className="resources">
				<div className="resources__col">
					<h1 className="resources__title">Погода на карте</h1>
					<ul className="resources__list">
						<li><a className="link resources__link" href="#">Центр России</a></li>
						<li><a className="link resources__link" href="#">Росссия</a></li>
						<li><a className="link resources__link" href="#">Европа</a></li>
					</ul>
				</div>
				<div className="resources__col">
					<h1 className="resources__title">Другие прогнозы</h1>
					<ul className="resources__list">
						<li><a className="link resources__link" href="#">Гисметео</a></li>
						<li><a className="link resources__link" href="#">Гидрометцентр России</a></li>
						<li><a className="link resources__link" href="#">Weather.com</a></li>
					</ul>
				</div>
				<div className="resources__col">
					<h1 className="resources__title">Погода с собой</h1>
					<ul className="resources__list">
						<li><a className="link resources__link" href="#">Информер</a></li>
						<li><a className="link resources__link" href="#">Настольный виджет</a></li>
						<li><a className="link resources__link" href="#">Погода в вашем браузере</a></li>
					</ul>
				</div>
				<div className="resources__col">
					<h1 className="resources__title">Другой вид</h1>
					<ul className="resources__list">
						<li><a className="link resources__link" href="#">Виджет для Яндекса</a></li>
						<li><a className="link resources__link" href="#">В миниатюре</a></li>
					</ul>
				</div>
			</section>
		)
	}
});
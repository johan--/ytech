var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<header className="header">
				<div className="header__logo">
					<div className="logo">
						<a className="link logo-link" href="//yandex.ru">
							<img
								className="image logo__image"
								src="/images/header/logo.svg"
								width="63"
								height="32"
								alt="Яндекс" />
						</a>
					</div>
				</div>
				<div className="header__title">
					<div className="title">
						<a className="link title-link" href="/">
							<span className="title-link__arrow_big">
								<span className="title-link__arrow_small">
									Погода
								</span>
							</span>
						</a>
					</div>
				</div>
			</header>
		)
	}
});
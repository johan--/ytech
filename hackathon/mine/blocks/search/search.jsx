var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="search">
				<div className="search__search-info">
				  <div className="search-info">
				    <h1 className="search-info__h1">Погода</h1>
				    <div className="search-info__arrow"></div>
				  </div>
				</div>
				<form action="" className="search__form">
				  <input type="text" className="search__input" />
				  <button className="search__button">Найти</button>
				</form>
			</div>
		);
	}
});
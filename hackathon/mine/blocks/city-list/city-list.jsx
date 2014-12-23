var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			isActive: false
		}
	},

	clickHandler: function(e) {
		this.state.isActive ? this.setState({isActive: false}) : this.setState({isActive: true});
	},

	render: function() {
		var classes = ['city-list__ul'];

		if (this.state.isActive) classes.push('city-list__ul_active');

		return (
			<div className="city-list">

	          <p className="city-list__p" onClick={this.clickHandler}>
	          	Другой город<img src="active-arrow.png" />
	          </p>

	          <ul className={classes.join(' ')}>
	            <li className="city-list__ul_li_begin">Последние города</li>
	            <li className="city-list__ul_li_active">Москва</li>
	            <li>Санкт-Петербург</li>
	            <li>Екатеринбург</li>
	            <li className="city-list__ul_li_end">Все города</li>
	          </ul>
	        </div>
		);
	}
});
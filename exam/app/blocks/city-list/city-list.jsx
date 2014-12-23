var React = require('react');

React.initializeTouchEvents(true);

module.exports = React.createClass({
	getInitialState: function () {
		return {
			cityList: [
				{
					name: 'Moskva',
					alias: 'Москва'
				},
				{
					name: 'Ekaterinburg',
					alias: 'Екатеринбург'
				},
				{
					name: 'Tyumen',
					alias: 'Тюмень'
				}
			]
		};
	},

	linksTouchHandler: function (e) {
		e.preventDefault();
	},

	linksClickHandler: function (e) {
		e.preventDefault();
	},

	touchHandler: function (e) {
		e.stopPropagation();
	},

	render: function () {
		var lis = this.state.cityList.map(function (item, index) {
			var classes = ['city-list__li'];

			if (index === 0) classes.push('city-list__li_first');
			if (index % 2 === 0) {
				classes.push('city-list__li_odd');
			} else {
				classes.push('city-list__li_even');
			};
			if (index === this.state.cityList.length - 1) {
				classes.push('city-list__li_last');
			}

			return (
				<li className={classes.join(' ')} key={index}>
					<a
						className="city-list__link"
						href={'/' + item.name.toLowerCase()}
						onTouchStart={this.linksTouchHandler}
						onClick={this.linksClickHandler} >
						{item.alias}
					</a>
				</li>
			);
		}, this);

		return (
			<ul className="city-list" onTouchStart={this.touchHandler} className="city-list">
				{lis}
			</ul>
		)
	}
});

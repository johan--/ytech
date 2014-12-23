var React = require('react');

React.initializeTouchEvents(true);

module.exports = React.createClass({
	touchHandler: function (e) {
		var root = this.getDOMNode();
		var target = e.target;
  
		while (target !== root) {
			if (target.dataset.name) {
				this.props.touchHandler(target.dataset.name);
				break;
			};

			target = target.parentNode;
		};
	},

	clickHandler: function (e) {
		e.preventDefault();
	},

	render: function () {
		var tabs = this.props.tabs.map(function (tab, index) {
			var classes = ['tabs__item'];

    		if (index === 0) classes.push('tabs__item_left')
    		else if (index === this.props.tabs.length - 1) classes.push('tabs__item_right');

    		if (tab.name === this.props.activeTab) classes.push('tabs__item_active');

	    	return (
				<div className={classes.join(' ')} data-name={tab.name} key={index} >
					<a
						className="link tabs__link"
						onClick={this.clickHandler}
						href={this.props.currentUri + '/' + tab.name} >
						<span className="tabs__link-text">{tab.alias}</span>
					</a>
				</div>
	    	);
	    }, this);

		return (
			<div className="tabs" onTouchStart={this.touchHandler} >
				{tabs}
			</div>
		);
	}
});

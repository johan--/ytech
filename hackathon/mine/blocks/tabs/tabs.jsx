var React = require('react');

module.exports = React.createClass({
	clickHandler: function(e) {
		var tabName = e.target.dataset.name;
		
		if (tabName) {
			this.props.clickHandler(tabName);
		}
	},

	render: function() {
		var tabs = this.props.tabs.map(function (tab, index) {
			var classes = ['tabs__item'];

    		if (index === 0) classes.push('tabs__item_left')
    		else if (index === this.props.tabs.length - 1) classes.push('tabs__item_right');

    		if (tab.name === this.props.activeTab) classes.push('tabs__item_active');

	    	return (
		        <li className={classes.join(' ')} data-name={tab.name} key={index}>{tab.alias}</li>
	    	);
	    }, this);

		return (
			<div className="content__tabs">
			    <ul className="tabs" onClick={this.clickHandler}>
			        {tabs}
			    </ul>
			</div>
		)
	}
});
var React = require('react');
var Search = require('./../search/search.jsx');
var Tabs = require('./../tabs/tabs.jsx');

var Weather = require('./../weather/weather.jsx');

module.exports = React.createClass({
	isActive: function (value) {
		return value === this.props.activeTab;
	},

	touchHandler: function (newActiveTabName) {
		if (this.isActive(newActiveTabName)) return;
		
		this.props.routerChangeType(newActiveTabName);
	},

	render: function () {
		var content = this.props.tabs.map(function(tab, index) {
			var mods = [tab.name];

			if (!this.isActive(tab.name)) mods.push('hidden');

			return <Weather
				key={index}
				mods={mods}
				data={tab.data} />;
		}, this);

		return (
			<section className="content">
				<div className="content__search">
					<Search dispatcher={this.props.dispatcher} />
				</div>

				<div className="content__tabs">
					<Tabs
						tabs={this.props.tabs}
						currentUri={this.props.currentUri}
						activeTab={this.props.activeTab}
						touchHandler={this.touchHandler} />
				</div>

				{content}
			</section>
		)
	}
});

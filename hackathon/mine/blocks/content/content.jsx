var React = require('react');
var Tabs = require('./../tabs/tabs.jsx');
var WeatherShort = require('./../weather-short/weather-short.jsx');
var WeatherFull = require('./../weather-full/weather-full.jsx');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			data: this.props.data,
			tabs: [
				{
					name: 'short',
					alias: 'кратко',
					content: WeatherShort,
					data: this.props.data.forecast
				},
				{
					name: 'full',
					alias: 'подробно',
					content: WeatherFull,
					data: this.props.data.forecast
				},
				{
					name: 'graph',
					alias: 'наглядно',
					content: null,
					data: this.props.data,
				}
			],
			activeTab: this.props.type
		};
	},

	isActive: function(value) {
		return value === this.state.activeTab;
	},

	clickHandler: function(newActiveTabName) {
		if (this.isActive(newActiveTabName)) return;
		
		this.setState({activeTab: newActiveTabName});
	}, 

	render: function() {
		var content = this.state.tabs.map(function(tab, index) {
			if (tab.content) {
				return <tab.content
					key={index}
					isActive={this.isActive(tab.name)}
					data={tab.data}
					helpers={this.props.helpers} />;
			}
		}, this);

		return (
			<section className="content">
				<Tabs
					data={this.props.data}
					tabs={this.state.tabs}
					activeTab={this.state.activeTab}
					clickHandler={this.clickHandler} />

				{content}
			</section>
		)
	}
});
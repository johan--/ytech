var React = require('react');
var Header = require('./../blocks/header/header.jsx');
var Content = require('./../blocks/content/content.jsx');

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<Header />
				<Content
					routerChangeType={this.props.routerChangeType}
					dispatcher={this.props.dispatcher}
					currentUri={this.props.currentUri}
					activeTab={this.props.activeTab}
					tabs={this.props.tabs} />
			</div>
		)
	}
});

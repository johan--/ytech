var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			content: undefined,
			isActive: false,
			top: 0
		};
	},

	componentDidMount: function () {
		var self = this;

		this.props.dispatcher.on('popup.open', function (data) {
			if (data.content) {
				self.setState({
					isActive: true,
					content: data.content,
					top: data.top
				});
			};
		});

		this.props.dispatcher.on('popup.close', function () {
			self.setState({
				content: undefined,
				isActive: false,
				top: 0
			})
		})
	},

	render: function () {
		var classes = ['popup'];

		if (this.state.isActive) classes.push('popup_active');

		return (
			<div className={classes.join(' ')} style={{top: this.state.top}}>
				{this.state.content ? <this.state.content /> : ''}
			</div>
		)
	}
});

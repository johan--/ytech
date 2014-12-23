var React = require('react');

module.exports = React.createClass({
	hasImage: function (str) {
		if (str.indexOf('{') === -1) {
			return false;
		} else {
			return true;
		};
	},

	image: function (icon) {
		var rotate = {
			'n': 0,
			's': 180,
			'w': 270,
			'e': 90,
			'nw': 315,
			'ne': 45,
			'sw': 225,
			'se': 135
		};

		return (
			<img
				className={'image image_rotate_' + rotate[icon] + ' image_opacity_60'}
				width="11"
				height="11"
				src="/images/info/arrow.svg" />
		);
	},

	withImage: function (str, index) {
		var start = str.slice(0, str.indexOf('{'));
		var icon = str.slice(str.indexOf('{') + 1, str.indexOf('}'));
		var end = str.slice(str.indexOf('}') + 1, str.length);

		return (
			<div className="info__item" key={index}>
				{start}
				{this.image(icon)}
				{end}
			</div>
		);
	},

	render: function () {
		if (!this.props.data) return <div className="info"></div>;

		var items = this.props.data.map(function (item, index) {
			if (this.hasImage(item)) {
				return this.withImage(item, index);
			}

			return (
				<div className="info__item" key={index}>{item}</div>
			);
		}, this);

		return (
			<div className="info">
				{items}
			</div>
		);
	}
});

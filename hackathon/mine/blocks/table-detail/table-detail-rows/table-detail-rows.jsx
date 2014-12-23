var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
	blocks: {
		head: function(data, key) {
			return (
				<th className={data.classes} key={key}>{data.title}</th>
			);
		},

		temp: function(data, key) {
			return (
				<td className={data.classes} key={key}>{data.temp}</td>
			);
		},

		weather: function(data, key) {
			return (
				<td className={data.classes} key={key}>
					<img src={'http://ekb.shri14.ru/icons/' + data.weather_icon + '.svg'}
						width={data.size}
						height={data.size} />
					{data.weather ? data.weather : ''}
				</td>
			);
		},

		info: function(data, key) {
			return (
				<td rowSpan="2" className="table-detail__more-info vertical-align-top" key={key}>
	              Давление: {data.pressure}<br />
	              Ветер: {data.wind}<br />
	              Влажность: {data.humidity}<br />
	              Восход: {data.sunrise} Заход: {data.sunset}<br />
	              <p className="table-detail__reg">Данные зарегистрированы недавно&nbsp;<a href="#"><img src="_.png" /></a></p>
	            </td>
			);
		}
	},

	render: function() {
        var cells = [];

        this.props.data.forEach(function(item, index) {
            var blockName = _.keys(item)[0];

            cells.push(this.blocks[blockName](item[blockName], index));
        }, this);
        
        return <tr className={this.props.className}>{cells}</tr>;
	}
});
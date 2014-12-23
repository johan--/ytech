var React = require('react');
var WeatherFullRows = require('./../weather-full-rows/weather-full-rows.jsx');
var _ = require('lodash');

module.exports = React.createClass({

    render: function() {
        var rows = this.props.data.map(function (item, index) {
        	if (_.isFunction(item)) return item(index);

            return <WeatherFullRows data={item} key={index} />;
        }, this);

        return <tbody>{rows}</tbody>
    }
});

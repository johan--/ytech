var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
    blocks: {
        date: function(data, key) {
            return (
                <td className="weather-short__item" key={key}>
                    <p className="weather-short__dayname">{data.dayname}</p>
                    <p className="weather-short__date">{data.datename}</p>
                </td>
            );
        },

        day: function(data, key) {
            return (
                <td className={'weather-short__dayweather ' + data.weatherClass} key={key}>
                    <img
                        className="weather-short__icon"
                        width="30"
                        height="30"
                        src={'http://ekb.shri14.ru/icons/' + data.weather_icon + '.svg'} />
                    <p className="weather-short__descr">{data.weather}</p>
                    <p className="weather-short__temperature">{data.temp}</p>
                </td>
            );
        },

        night: function(data, key) {
            return (
                <td className={'weather-short__nightweather ' + data.weatherClass} key={key}>
                    <p className="weather-short__night-temperature">{data.temp}</p>
                </td>
            );
        },

        gap: function(data, key) {
            return (<td className="weather-short__gap" key={key}></td>);
        }
    },

    render: function() {
        var cells = [];

        this.props.data.forEach(function(item, index) {
            var blockName = _.keys(item)[0];

            cells.push(this.blocks[blockName](item[blockName], index));
        }, this);
        
        return <tr>{cells}</tr>;
    }
});

var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
    blocks: {
        fullDay: function(data, key) {
            return <td className="weather-full__date-cell" rowSpan="4" key={key}>
                <span className="weather-full__day-name">{data.day}</span>
                <span className="weather-full__date">
                    <span className="weather-full__date-number">{data.date}</span>
                    <span className="weather-full__date-month">{data.month}</span>
                </span>
            </td>
        },

        timeOfDay: function(data, key) {
            return <td className={'weather-full__time-of-day-cell ' + data.weatherClass} key={key}>
                <span className="weather-full__time-of-day">{data.title}</span>
                {data.temp_min ? data.temp_min + '…' + data.temp_max : data.temp}
            </td>;
        },

        icon: function(data, key) {
            return <td className={'weather-full__icon ' + data.weatherClass} key={key}>
                <img src={'http://yandex.st/weather/1.2.83/i/icons/30x30/' + data.weather_icon + '.png'} />
            </td>;
        },

        descr: function(data, key) {
            return <td className={'weather-full__descr ' + data.weatherClass} key={key}>
                {data.weather}
            </td>;
        },

        pressure: function(data, key) {
            return <td className={'weather-full__pressure ' + data.weatherClass} key={key}>
                {data.pressure}
            </td>;
        },

        humidity: function(data, key) {
            return <td className={'weather-full__humidity  ' + data.weatherClass} key={key}>
                {data.humidity + '%'}
            </td>;
        },

        windIcon: function(data, key) {
            return <td className={'weather-full__wind-icon  ' + data.weatherClass} key={key}>
                <img src={'http://yandex.st/weather/1.2.83/i/wind/' + data.wind_direction + '.gif'} />
            </td>;
        },

        windSpeed: function(data, key) {
            return <td className={'weather-full__wind-speed  ' + data.weatherClass} key={key}>
                {data.wind_speed}
            </td>;
        },

        sun: function(data, key) {
            return <td rowSpan="4" className="weather-full__sun" key={key}>
                <span className="weather-full__sun-title">
                    {data.title}
                </span>
                {data.time}
            </td>;
        },

        moonIcon: function(data, key) {
            return <td rowSpan="4" className="weather-full__moon-icon" key={key}>
                <img src={'http://ekb.shri14.ru/icons/icon_moon_' + data.moon_code + '.svg'}
                    width="30"
                    height="30" />
            </td>;
        },

        magneticField: function(data, key) {
            return <td rowSpan="4" className="weather-full__magnetic-field" key={key}>
                <span className="weather-full__magnetic-field-title">
                    {data.message ? 'магнитное поле' : ''}
                </span>
                {data.message}
            </td>;
        }
    },

    render: function() {
        var cells = [];

        this.props.data.forEach(function(item, index) {
            var blockName = _.keys(item)[0];

            cells.push(this.blocks[blockName](item[blockName], index));
        }, this);
        
        return <tr className="weather-full__row">{cells}</tr>;
    }
});

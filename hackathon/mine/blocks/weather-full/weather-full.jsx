var React = require('react');
var WeatherFullBody = require('./weather-full-body/weather-full-body.jsx');

module.exports = React.createClass({
    formatData: function(data) {
        var items = [];

        data.slice(1).forEach(function(item, index) {
            for (var i = 0; i < item.parts.length - 2; i++) {
                if (i === 0) {
                    items.push(this.rowDataTemplateExt(item, i));
                } else {
                    items.push(this.rowDataTemplate(item.parts[i]));
                }
            }

            if (index !== this.props.data.length - 1) {
                items.push(this.gap);
            }
        }, this);

        return items;
    },

    rowDataTemplateExt: function(data, index) {
        return new Array().concat(
            [
                {
                    fullDay: this.props.helpers.parseDate(data.date)
                }
            ],

            this.rowDataTemplate(data.parts[index]),

            [
                {
                    sun: {
                        title: 'восход',
                        time: data.sunrise
                    }
                },

                {
                    sun: {
                        title: 'закат',
                        time: data.sunset
                    }
                },

                {
                    moonIcon: {
                        moon_code: data.moon_code
                    }
                  
                },

                {
                    magneticField: {
                        message: data.biomet ? data.biomet.message : ''
                    }
                }
            ]
        );
    },

    rowDataTemplate: function(data) {
        var weatherClass = this.props.helpers.getWeatherClass(data.temp);

        return [
            {
                timeOfDay: {
                    weatherClass: weatherClass,
                    title: data.type,
                    temp_max: data.temp_max,
                    temp_min: data.temp_min,
                    temp: data.temp
                }
            },

            {
                icon: {
                    weatherClass: weatherClass,
                    weather_icon: data.weather_icon
                }
            },

            {
                descr: {
                    weatherClass: weatherClass,
                    weather: data.weather
                }
            },

            {
                pressure: {
                    weatherClass: weatherClass,
                    pressure: data.pressure
                }
            },

            {
                humidity: {
                    weatherClass: weatherClass,
                    humidity: data.humidity
                }
            },

            {
                windIcon: {
                    weatherClass: weatherClass,
                    wind_direction: data.wind_direction
                } 
            },

            {
                windSpeed: {
                    weatherClass: weatherClass,
                    wind_speed: data.wind_speed
                }
            }
        ];
    },

    gap: function(key) {
        return  <tr className="weather-full__row-gap" key={key}>
            <td colSpan="16"></td>
        </tr>
    },

    render: function() {
        var classes = ['contenr__weather-full'];

        if (!this.props.isActive) classes.push('weather-full_hidden');

        return (
            <div className={classes.join(' ')}>
                <table className="weather-full">
                    <thead>
                        <tr>
                            <th colSpan="4"></th>
                            <th className="weather-full__table-title">давление,<br />мм рт. ст.</th>
                            <th className="weather-full__table-title" colSpan="2">влажность</th>
                            <th className="weather-full__table-title">ветер,<br />м/с</th>
                            <th colSpan="4"></th>
                        </tr>
                    </thead>
                    
                    <WeatherFullBody data={this.formatData(this.props.data)} helpers={this.props.helpers} />
                </table>
            </div>
        )
    }
});
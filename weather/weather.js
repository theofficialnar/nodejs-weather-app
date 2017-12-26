const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url : `https://api.darksky.net/forecast/0b74a898293475de2d0d3e47b6dc8951/${lat},${lng}?units=si`,
        json : true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature : body.currently.temperature,
                apparentTemperature : body.currently.apparentTemperature
             });
        } else {
            callback('Unable to connect to Dark Sky Servers.');
        };
    });
};

module.exports = {
    getWeather
};